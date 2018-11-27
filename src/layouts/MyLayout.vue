<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Pintu.co.id
          <div slot="subtitle">Running on CMS v1.0.0</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Dashboard</q-list-header>
        <q-item to="/" >
          <q-item-side icon="home" />
          <q-item-main label="Home" sublabel="Home Page" />
        </q-item>
        <q-item to="/blog">
          <q-item-side  />
          <q-item-main label="Post" sublabel="Blog" />
        </q-item>
        <q-item to="/subscriber">
          <q-item-side icon="people"  />
          <q-item-main label="Subscriber" sublabel="List Subscriber" />
        </q-item>


        <q-list-header>Account</q-list-header>
        <q-item @click.native="logout">
          <q-item-side icon="power_settings_new" />
          <q-item-main label="Logout"></q-item-main>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    logout () {
      console.log('logout')
      localStorage.clear()
      this.$router.push('/auth')
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (!token) {
      this.$router.push('/auth')
    }
  }
}
</script>

<style>
</style>
