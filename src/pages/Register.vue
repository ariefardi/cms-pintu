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
        <q-btn @click="login" flat label="Login" style="margin-left:50vh" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
  // import axios from 'axios'
  // import {mapState} from 'vuex'
  // import swal from 'sweetalert'
  // import {api} from '../config'
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
      login () {
        console.log('login')
        console.log(this.loginStatus, ' login status')
        // axios.post(api+'admins/login',{
        //   username : this.username,
        //   password: this.password
        // })
        //   .then(({data})=> {
        //     if(data.usernameFound) {
        //       console.log(data)
        //       swal(`Selamat Datang ${data.usernameFound[0].username}`)
        //       this.$store.commit('setLoginStatus', true)
        //       this.$router.push('/')
        //       localStorage.setItem('token', data.token)
        //     }
        //     else {
        //       console.log('Username/Password Salah')
        //       swal('Username/Password Salah')
        //     }
        //   })
        //   .catch(err=> {
        //     console.log(err)
        //   })
      }
    },
    created () {
      let token = localStorage.getItem('token')
      if (token ) {
        this.$router.push('/')
      }
    }
  }
</script>
