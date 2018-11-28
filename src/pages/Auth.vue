<template>
  <div class="justify-center row items-center" >
    <q-card inline style="width: 500px;margin-top:30vh"  >
      <q-card-title>
        LOGIN
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
  import axios from 'axios'
  // import {mapState} from 'vuex'
  import {swal} from '../config'
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
        let self = this
        // this.$router.push('/')
        let url = 'https://us-central1-pintu-landing-pages.cloudfunctions.net/login'
        axios.post(url,{
          username: this.username,
          password: this.password
        })
          .then(({data})=> {
              if (data.data) {
                console.log(data)
                localStorage.setItem('token', data.token)
                this.$router.push("/")
                self.$q.notify({
                  message: "Welcome " + data.data.username,
                  timeout: 3000,
                  type: 'positive',
                  color: 'positive',
                })
              }
              else {
                console.log('err')
                swal('Username / Password salah')
              }
          })
          .catch(err=> {
            console.log(err)
          })
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
