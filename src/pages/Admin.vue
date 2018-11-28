<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/" label="Home"/>
      <q-breadcrumbs-el  label="Admin"/>
    </q-breadcrumbs>
    <TableAdmin />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn to="/admin-add" color="primary" size="xl" round > <q-icon name="add" /> </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
  import TableAdmin from '../components/TableAdmin'
  export default {
    components: {
      TableAdmin
    },
    data () {
      return {

      }
    }
  }
</script>
