<template>
  <q-page class="flex flex-center">
    <img style="width: 30%" alt="Quasar logo" :src="pintu_logo" >
  </q-page>
</template>

<style>
</style>

<script>
  import Pintu_logo from '../assets/pintu_logo.svg'
export default {
  name: 'PageIndex',
  data () {
    return {
      pintu_logo: Pintu_logo
    }
  }
}
</script>
