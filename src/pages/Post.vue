<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/" label="Home"/>
      <q-breadcrumbs-el  label="Blog"/>
    </q-breadcrumbs>
    <TableBlog />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn to="/blog-add"  color="primary" size="xl" round > <q-icon name="add" /> </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
  import TableBlog from '../components/TableBlog'
  export default {
    components : {
      TableBlog
    },
  }
</script>
