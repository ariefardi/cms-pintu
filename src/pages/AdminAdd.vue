<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/" label="Home"/>
      <q-breadcrumbs-el to="/admin" label="Admin"/>
      <q-breadcrumbs-el label="Add Admin"/>
    </q-breadcrumbs>
    <q-card inline style="width: 100%;"  >
      <q-card-title>
        Add Admin
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-field
          icon="account_circle"
          helper="input your username"
        >
          <q-input v-model="username" float-label="Username" />
        </q-field>
        <q-field
          icon="lock"
          helper="input your password"
        >
          <q-input type="password" v-model="password" float-label="Password" />
        </q-field>
      </q-card-main>
      <q-card-actions align="end">
        <q-btn @click="register" flat label="Add Admin" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
  import {DB} from '../config'
  export default {
    data () {
      return {
        username : '',
        password: ''
      }
    },
    computed: {
      // ...mapState([
      //   'loginStatus'
      // ])
    },
    methods: {
      register () {
        let self = this
        DB.collection("admin")
          .add({
            username: this.username,
            password: this.password,
            role: "admin",
            created_at: new Date()
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            self.$router.push('/admin')
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      }
    },
    created () {

    }
  }
</script>

