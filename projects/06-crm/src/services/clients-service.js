import api from '../lib/axios'

export default {
  getClients() {
    return api.get('/clients')
  },
  addClient(data) {
    return api.post('/clients', data)
  },
  getClient(id) {
    return api.get('/clients/' + id)
  },
  updateClient(id, data) {
    return api.patch('/clients/' + id, data)
  },
  changeState(id, data) {
    return api.patch('/clients/' + id, data)
  },
  deleteClient(id) {
    return api.delete('/clients/' + id)
  },
}
