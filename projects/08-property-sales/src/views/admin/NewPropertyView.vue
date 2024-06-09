<script setup>
  import 'leaflet/dist/leaflet.css'
  
  import { useForm, useField } from 'vee-validate'
  import { collection, addDoc } from 'firebase/firestore'
  import { useFirestore } from 'vuefire'
  import { useRouter } from 'vue-router'
  import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
  
  import useImage from '@/composables/useImage'
  import useLocationMap from '@/composables/useLocationMap'
  import { validationSchema, imageSchema } from '@/validation/propertySchema'

  const items = [1, 2, 3, 4, 5]
  const router = useRouter()
  const db = useFirestore()
  const { url, uploadImage, image } = useImage()
  const { zoom, center, pin } = useLocationMap()

  const { handleSubmit } = useForm({
    validationSchema: {
      ...validationSchema,
      ...imageSchema
    }
  })

  const title = useField('title')
  const picture = useField('picture')
  const price = useField('price')
  const rooms = useField('rooms')
  const wc = useField('wc')
  const parkings = useField('parkings')
  const description = useField('description')
  const swimmingPool = useField('swimmingPool', null, {
    initialValue: false
  })

  const submit = handleSubmit(async (values) => {
    const { ...property } = values

    const docRef = await addDoc(collection(db, 'properties'), {
      ...property,
      image: url.value,
      location: center.value
    })

    if (docRef.id) {
      router.push({ name: 'admin-properties' })
    }
  })
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Nueva propiedad
    </v-card-title>
    
    <v-card-subtitle class="text-h5 py-5">
      Crea una nueva propiedad llenando el siguiente formulario
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        class="mb-5"
        label="Titulo de propiedad"
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
      />

      <v-file-input
        accept="image/jpeg"
        label="Fotografía"
        prepend-icon="mdi-camera"
        class="mb-5"
        v-model="picture.value.value"
        :error-messages="picture.errorMessage.value"
        @change="uploadImage"
      />

      <div v-if="image" class="my-5">
        <p class="font-weight-bold">Imagen propiedad:</p>
        <img class="w-50" :src="image" alt="image" />
      </div>

      <v-text-field
        class="mb-5"
        label="Precio"
        v-model="price.value.value"
        :error-messages="price.errorMessage.value"
      />

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            label="Habitaciones"
            class="mb-5"
            :items="items"
            v-model="rooms.value.value"
            :error-messages="rooms.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Sanitarios"
            class="mb-5"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Lugares estacionamiento"
            class="mb-5"
            :items="items"
            v-model="parkings.value.value"
            :error-messages="parkings.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-checkbox
        label="Alberca"
        v-model="swimmingPool.value.value"
        :error-messages="swimmingPool.errorMessage.value"
      />

      <v-textarea
        class="mb-5"
        label="Descripción"
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
      />

      <h2 class="font-weight-bold text-center my-5">
        Ubicación
      </h2>
      
      <div class="pb-10">
        <div style="height: 600px">
          <l-map v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center" draggable @moveend="pin" />
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </l-map>
        </div>
      </div>

      <v-btn color="pink-accent-3" block @click="submit">
        Agregar propiedad
      </v-btn>
    </v-form>
  </v-card>
</template>
