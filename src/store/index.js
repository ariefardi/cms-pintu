import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
import router from '../router/index'
import {DB} from "../config";
import { Notify } from 'quasar'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store({
  state: {
    blogs: [],
    customDialogModel: false,
    admins: []
  },
  mutations: {
    setBlogs(state, payload) {
      state.blogs = payload
    },
    deleteBlogs(state, payload) {
      state.blogs[payload.__index] = payload
    },
    setCustomDialog(state, payload) {
      state.customDialogModel = payload
    },
    deletePerm(state, payload) {
      state.blogs.splice(payload, 1)
    },





    setAdmins(state, payload) {
      state.admins = payload
    },
    setDeleteAdmin(state, payload) {
      state.admins.splice(payload, 1)
    },

  },
  actions: {
    fetchingAdmins ({commit}) {
      let self = this
      DB.collection("admin")
        .get()
        .then((querySnap)=> {
          let temp = []
          querySnap.forEach(function (doc) {
            let obj = doc.data()
            obj.id = doc.id
            temp.push(obj)
          })
          commit('setAdmins', temp)
        })
        .catch(err=> {
          console.log('err')
        })
    },
    deleteAdmin ({commit}, payload) {
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete)=> {
          if (willDelete) {
            DB.collection('admin').doc(payload.id)
              .delete()
              .then(()=> {
                Notify.create({
                  message: 'Your admin user is gone from our universe!',
                  timeout: 3000, // in milliseconds; 0 means no timeout

                  // "type" adds a color and icon,
                  // so you don't need to specify them.
                  // Available values: 'positive', 'negative', 'warning', 'info'
                  type: 'negative',

                  color: 'negative',
                  position: 'top-right', // 'top', 'left', 'bottom-left' etc
                })
                commit('setDeleteAdmin', payload.__index)
              })
              .catch(err=> {
                Notify.create({
                  message: 'Fail to delete user admin!!',
                  timeout: 3000, // in milliseconds; 0 means no timeout

                  // "type" adds a color and icon,
                  // so you don't need to specify them.
                  // Available values: 'positive', 'negative', 'warning', 'info'
                  type: 'negative',

                  color: 'negative',
                  position: 'top-right', // 'top', 'left', 'bottom-left' etc
                })
              })
          }
        })
    },












    fetchingBlogs({commit}) {
      DB.collection("blogs")
        .get()
        .then(function(querySnapshot) {
          let temp = []
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            let obj = doc.data()
            obj.id = doc.id
              let tempAuthor = obj.author.split('/')
              tempAuthor = tempAuthor[2]
              DB.collection('admin').doc(tempAuthor).get()
                .then((authorRef)=> {
                  obj.author = authorRef.data().username
                })
            temp.push(obj)
          });
          commit('setBlogs', temp )
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },

    addingBlogs({commit}, payload) {
      let token = localStorage.getItem('token')
      DB.collection('blogs')
        .add({
        author: `/admin/${token}`,
        content_english: payload.content_english,
        content_indo: payload.content_indo,
        title_english: payload.title_english,
        title_indo: payload.title_indo,
        images: payload.imageTop,
          imageName: payload.imageName,
        create_date: new Date(),
        publish_date: new Date(),
        published: false,
      })
        .then(function(docRef) {
          swal("Berhasil menambahkan postingan")
            .then(()=> {
              router.push('/')
            })
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
          swal("Error menambahkan postingan, silahkan hubungin admin terkait!")
        });
    }
    ,
    deletingBlogs({commit}, payload) {
      DB.collection('blogs').doc(payload.id)
        .update({
          published: payload.published
        })
        .then(function() {
          commit('deleteBlogs', payload)
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    deletingPermanent({commit}, payload) {
      swal({
        title: "Are you sure?",
        text: "Once delete, your file will permanently gone from universe!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete)=> {
          if(willDelete) {
            DB.collection('blogs').doc(payload.id).delete()
              .then(()=> {
                Notify.create({
                  message: 'Your file is gone from our universe!',
                  timeout: 3000, // in milliseconds; 0 means no timeout

                  // "type" adds a color and icon,
                  // so you don't need to specify them.
                  // Available values: 'positive', 'negative', 'warning', 'info'
                  type: 'negative',

                  color: 'negative',
                  position: 'top-right', // 'top', 'left', 'bottom-left' etc
                })
                commit('deletePerm', payload.__index)
              })
          }
        })
    }
  }
})
