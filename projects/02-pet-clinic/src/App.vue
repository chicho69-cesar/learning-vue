<script setup>
  import { ref, reactive, onMounted, watch } from "vue"
  import { uid } from "uid"

  import Header from "./components/Header.vue"
  import Form from "./components/Form.vue"
  import Patient from "./components/Patient.vue"

  const patients = ref([])

  const patient = reactive({
    id: null,
    name: "",
    property: "",
    email: "",
    date: "",
    symptoms: "",
  })

  watch(
    patients,
    () => {
      saveToLocalStorage()
    },
    { deep: true }
  )

  const saveToLocalStorage = () => {
    localStorage.setItem("patients", JSON.stringify(patients.value))
  }

  onMounted(() => {
    const patientsStorage = localStorage.getItem("patients")

    if (patientsStorage) {
      patients.value = JSON.parse(patientsStorage)
    }
  })

  const savePatient = () => {
    if (patient.id) {
      const { id } = patient
      const i = patients.value.findIndex((p) => p.id === id)
      
      patients.value[i] = { ...patient }
    } else {
      patients.value.push({ ...patient, id: uid() })
    }

    Object.assign(patient, {
      name: "",
      property: "",
      email: "",
      date: "",
      symptoms: "",
      id: null,
    })
  }

  const updatePatient = (id) => {
    const patientToEdit = patients.value.filter((p) => p.id === id)[0]
    Object.assign(patient, patientToEdit)
  }

  const deletePatient = (id) => {
    patients.value = patients.value.filter((p) => p.id !== id)
  }
</script>

<template>
  <div class="container mx-auto mt-20">
    <Header />

    <div class="mt-12 md:flex">
      <Form
        v-model:name="patient.name"
        v-model:property="patient.property"
        v-model:email="patient.email"
        v-model:date="patient.date"
        v-model:symptoms="patient.symptoms"
        @save-patient="savePatient"
        :id="patient.id"
      />

      <div class="md:w-1/2">
        <h2 class="font-black text-2xl text-center">Administra tus pacientes</h2>
        
        <p class="text-lg mt-5 text-center">
          Información de <span class="text-violet-600 font-bold">Pacientes</span>
        </p>

        <div class="">
          <div v-if="patients.length > 0">
            <Patient
              v-for="patient in patients"
              :key="patient.id"
              :patient="patient"
              @update-patient="updatePatient"
              @delete-patient="deletePatient"
            />
          </div>

          <div v-else>
            <p class="mt-10 text-2xl text-center pb-10">
              No hay <span class="text-violet-600 font-bold">Pacientes</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
