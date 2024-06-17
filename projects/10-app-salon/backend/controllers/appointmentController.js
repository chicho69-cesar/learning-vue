import { endOfDay, formatISO, isValid, parse, startOfDay } from 'date-fns'
import { sendEmailCancelAppointment, sendEmailNewAppointment, sendEmailUpdateAppointment } from '../emails/appointmentEmailService.js'
import Appointment from '../models/Appointment.js'
import { formatDate, handleNotFoundError, validateObjectId } from '../utils/index.js'

const createAppointment = async (req, res) => {
  const appointment = req.body
  appointment.user = req.user._id.toString()

  try {
    const newAppointment = new Appointment(appointment)
    console.log(newAppointment)
    const result = await newAppointment.save()

    await sendEmailNewAppointment({ date: formatDate(result.date), time: result.time })

    res.json({
      msg: 'Tu reserva se ha realizado correctamente'
    })
  } catch (error) {
    console.log(error)
  }
}

const getAppointmentsByDate = async (req, res) => {
  const { date } = req.query
  
  const newDate = parse(date, 'dd/MM/yyyy', new Date())

  if (!isValid(newDate)) {
    const error = new Error('Fecha no válida')

    return res.status(400).json({
      msg: error.message
    })
  }

  const isoDate = formatISO(newDate)

  const appointments = await Appointment.find({
    date: {
      $gte: startOfDay(new Date(isoDate)),
      $lte: endOfDay(new Date(isoDate))
    }
  }).select('time')

  res.json(appointments)
}

const getAppointmentById = async (req, res) => {
  const { id } = req.params
  
  if (validateObjectId(id, res)) return
  
  const appointment = await Appointment.findById(id).populate('services')
  
  if (!appointment) {
    return handleNotFoundError('La cita no existe', res)
  }

  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error('No tienes los permisos')
    return res.status(403).json({ msg: error.message })
  }

  res.json(appointment)
}

const updateAppointment = async (req, res) => {
  const { id } = req.params

  if (validateObjectId(id, res)) return

  const appointment = await Appointment.findById(id).populate('services')
  
  if (!appointment) {
    return handleNotFoundError('La cita no existe', res)
  }

  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error('No tienes los permisos')
    return res.status(403).json({ msg: error.message })
  }

  const { date, time, totalAmount, services } = req.body

  appointment.date = date
  appointment.time = time
  appointment.totalAmount = totalAmount
  appointment.services = services

  try {
    const result = await appointment.save()

    await sendEmailUpdateAppointment({ date: formatDate(result.date), time: result.time })
    
    res.json({
      msg: 'Cita actualizada correctamente'
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteAppointment = async (req, res) => {
  const { id } = req.params

  if (validateObjectId(id, res)) return

  const appointment = await Appointment.findById(id).populate('services')
  
  if (!appointment) {
    return handleNotFoundError('La cita no existe', res)
  }

  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error('No tienes los permisos')
    return res.status(403).json({ msg: error.message })
  }

  try {
    const result = await appointment.deleteOne()
    await sendEmailCancelAppointment({ date: formatDate(result.date), time: result.time })

    res.json({ msg: 'Cita cancelada correctamente' })
  } catch (error) {
    console.log(error)
  }
}

export {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointmentsByDate,
  updateAppointment
}
