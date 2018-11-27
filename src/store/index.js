import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
import router from '../router/index'
import {DB, token} from "../config";


Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store({
  state: {
    blogs: [],
    customDialogModel: false
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
    }
  },
  actions: {
    fetchingBlogs({commit}) {
      let self = this
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
              console.log(tempAuthor)
            console.log("before temp", temp)
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
          console.log("Document written with ID: ", docRef.id);
          swal("Berhasil menambahkan postingan")
          router.push('/blog')
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
          console.log("Document successfully written!");
          commit('deleteBlogs', payload)
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    updatingBlogs({commit}, payload) {

    }
  }
})
