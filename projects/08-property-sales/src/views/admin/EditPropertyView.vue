<script setup>
  import 'leaflet/dist/leaflet.css'

  import { watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useFirestore, useDocument } from 'vuefire'
  import { doc, updateDoc } from 'firebase/firestore'
  import { useField, useForm } from 'vee-validate'
  import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
  
  import useImage from '@/composables/useImage'
  import useLocationMap from '@/composables/useLocationMap'
  import { validationSchema } from '@/validation/propertySchema'

  const items = [1, 2, 3, 4, 5]
  const { url, uploadImage, image } = useImage()
  const { zoom, center, pin } = useLocationMap()
  const { handleSubmit } = useForm({ validationSchema })

  const title = useField('title')
  const picture = useField('picture')
  const price = useField('price')
  const rooms = useField('rooms')
  const wc = useField('wc')
  const parkings = useField('parkings')
  const description = useField('description')
  const swimmingPool = useField('swimmingPool')

  const route = useRoute()
  const router = useRouter()

  const db = useFirestore()
  const docRef = doc(db, 'properties', route.params.id)
  const property = useDocument(docRef)

  watch(property, (property) => {
    title.value.value = property.title
    price.value.value = property.price
    rooms.value.value = property.rooms
    wc.value.value = property.wc
    parkings.value.value = property.parkings
    description.value.value = property.description
    swimmingPool.value.value = property.swimmingPool
    center.value = property.location
  })

  const submit = handleSubmit(async (values) => {
    const { picture, ...property } = values

    if (image.value) {
      const data = { ...property, image: url.value, location: center.value }
      await updateDoc(docRef, data)
    } else {
      const data = { ...property, location: center.value }
      await updateDoc(docRef, data)
    }

    router.push({ name: 'admin-properties' })
  })
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="mt-5">
      <h1 class="text-h4 font-weight-bold">Editar Propiedad</h1>
    </v-card-title>

    <v-card-subtitle>
      <p class="text-h5">Edita los detalles de la propiedad</p>
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
        label="Titulo"
        class="mb-5"
      />

      <v-file-input
        v-model="picture.value.value"
        :error-messages="picture.errorMessage.value"
        accept="image/jpeg"
        prepend-icon="mdi-camera"
        label="Fotografía"
        class="mb-5"
        @change="uploadImage"
      />

      <div class="my-5">
        <p class="font-weight-bold">Imagen Actual:</p>
        <img v-if="image" :src="image" class="w-50" />
        <img v-else :src="property?.image" class="w-50" />
      </div>

      <v-text-field
        v-model="price.value.value"
        :error-messages="price.errorMessage.value"
        label="Precio"
        class="mb-5"
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
            label="WC"
            class="mb-5"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Lugares Estacionamiento"
            class="mb-5"
            :items="items"
            v-model="parkings.value.value"
            :error-messages="parkings.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-checkbox v-model="swimmingPool.value.value" label="Alberca" />

      <v-textarea
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
        label="Descripción"
        class="mb-5"
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
        Guardar Cambios
      </v-btn>
    </v-form>
  </v-card>
</template>
