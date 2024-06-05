<script setup>
  defineProps({
    quote: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <div class="container-result">
    <h2>Cotización:</h2>

    <div class="result">
      <img
        :src="'https://cryptocompare.com/' + quote.IMAGEURL"
        alt="imagen crypto"
      />
      
      <div>
        <p>
          El precio es de: <span>{{ quote.PRICE }}</span>
        </p>

        <p>
          Precio más alto del día: <span>{{ quote.HIGHDAY }}</span>
        </p>

        <p>
          Precio más bajo del día: <span>{{ quote.LOWDAY }}</span>
        </p>

        <p>
          Variación últimas 24 hrs: <span>{{ quote.CHANGEPCT24HOUR }}%</span>
        </p>

        <p>
          Última actualización: <span>{{ quote.LASTUPDATE }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
