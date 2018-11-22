<template>
  <div class="justify-center row items-center" >
    <q-card inline style="width: 500px;margin-top:30vh"  >
      <q-card-title>
        Register
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
      <q-card-actions>
        <q-btn @click="register" flat label="Register" style="margin-left:50vh" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
  // import axios from 'axios'
  // import {mapState} from 'vuex'
  // import swal from 'sweetalert'
  // import {api} from '../config'
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
        console.log('login')
        console.log(' login status')
        DB.collection("admin")
          .add({
            username: this.username,
            password: this.password
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      }
    },
    created () {
      let token = localStorage.getItem('token')
      if (token) {
        this.$router.push('/')
      }
    }
  }
</script>
