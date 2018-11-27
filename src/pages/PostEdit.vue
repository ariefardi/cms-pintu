<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/" label="Home"/>
      <q-breadcrumbs-el to="/blog" label="Blog"/>
      <q-breadcrumbs-el label="Edit Post" />
    </q-breadcrumbs>
    <q-card inline style="width: 100%;"  >
      <q-card-title>
        Edit Blog Post
      </q-card-title>
      <q-card-separator />
      <q-card-main>

        <q-field
          icon="edit"
        >
          <q-input v-model="title_english" float-label="Title English" />
        </q-field>
        <q-field
          icon="edit"
        >
          <q-input v-model="title_indo" float-label="Title Indonesia" />
        </q-field>

        <q-field style="margin-top: 2rem" >
          <label style="font-weight: 500; font-size: 28px" for="content_english">Editor English </label>
          <textarea  name="editor_english" id="content_english"  cols="30" rows="10"></textarea>
        </q-field>
        <q-field style="margin-top: 2rem">
          <label style="font-weight: 500; font-size: 28px" for="content_indo">Editor Indonesia </label>
          <textarea name="editor_indo" id="content_indo" cols="30" rows="10"></textarea>
        </q-field>

        <q-field v-if="!imageTop">
          <input @change="onchangeUpload" type="file">
          <q-btn @click="uploadImage" :loading="loading"
                 :percentage="percentage" size="lg" color="red" flat round icon="cloud_upload" >
            <q-tooltip>Upload</q-tooltip>
          </q-btn>
        </q-field>
        <q-field>
          <div style="width: 500px; max-width: 90vw;" >
            <q-scroll-area style="width: 400px; max-width: 85vw; height: 300px; max-height: 70vh;" class="bg-grey-3 round-borders shadow-2">
              <div style="margin-bottom: 25px; padding: 15px;" v-for="(image, index) in images" :key="index">
                <img class="image-upload" :src="image" alt="">
                <q-btn @click="deleteImage(image, index)"> Delete </q-btn>
              </div>
            </q-scroll-area>

            <br>

            <div style="height: 100px" />
          </div>
        </q-field>

      </q-card-main>
      <q-card-actions class="action-align">
        <q-btn @click="editBlogs"  flat label="Edit Post" />
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script>
  import {storage, token, swal, link_storage, DB} from '../config'
  import {mapActions} from 'vuex'

  export default {
    created () {
    },
    mounted () {
      this.getOne()
    },

    data () {
      return {
        checkArray: [],
        albumTitle: "",
        title_english : '',
        title_indo: '',
        content_english: '',
        content_indo: 'Hello',
        image: '',
        imageName: '',
        imageTop: '',
        images: [],
        loading: false,
        percentage: 0,

      }
    },
    methods: {
      ...mapActions([
        'addingBlogs'
      ]),
      editBlogs () {
        this.content_english = CKEDITOR.instances.content_english.getData()
        this.content_indo = CKEDITOR.instances.content_indo.getData()
        let albumTitle = localStorage.getItem('albumTitle')
        let images = link_storage+albumTitle
        if (this.images.length===0) {
          this.imageTop = null
          this.imageName = null
        }
        let obj = {
          title_english: this.title_english,
          title_indo: this.title_indo,
          content_english: this.content_english,
          content_indo: this.content_indo,
          imageName: this.imageName,
          imageTop: this.imageTop,
        }
        this.updateNewBlogs(obj)
      },
      updateNewBlogs (payload) {
        let id = this.$route.params.id
        DB.collection('blogs').doc(id)
          .update({
            content_english: payload.content_english,
            content_indo: payload.content_indo,
            title_english: payload.title_english,
            title_indo: payload.title_indo,
            imageName: payload.imageName,
            images: payload.imageTop
          })
          .then(()=> {
            console.log("Berhasil update");
            this.alertSwal("Berhasil Edit postingan")
          })
          .catch(err=> {
            console.log(err)
          })
      },
      alertSwal (value) {
        swal(value)
          .then(()=> {
            this.$router.push('/blog')
          })
          .catch(err=> {
            swal('Some error happen!!')
            console.log(err)
          })

      },
      onchangeUpload (e) {
        this.image = e.target.files[0]
      },
      uploadImage () {
        if (!this.title_english)  {
          swal('Title can\'t be empty!!')
        }
        else {
          this.loading = true
          const interval = setInterval(() => {
            this.percentage += Math.floor(Math.random() * 8 + 10)
            if (this.percentage >= 100) {
              clearInterval(interval)
              this.loading = false
            }
          }, 700)
          console.log(this.image)
          storage.ref('blogs_assets/'+`${this.title_english}/`+this.image.name).put(this.image)
            .then(()=> {
              storage.ref('blogs_assets/'+`${this.title_english}/`+this.image.name).getDownloadURL()
                .then((url)=> {
                  localStorage.setItem('albumTitle', this.title_english)
                  this.imageName = this.image.name
                  this.imageTop = url
                  this.images.push(url)
                })
            })
        }
      },
      deleteImage (image, index) {
        let self = this
        let id = this.$route.params.id
        console.log(this.imageName)
        storage.ref('blogs_assets/'+`${this.title_english}/`+this.imageName).delete()
          .then(()=> {
            console.log('berhasil delete')
            self.imageTop = null
            this.images.splice(index,1)
            self.deleteFirestoreImage(id)
          })
          .catch(err=> {
            console.log(err)
          })
      },
      deleteFirestoreImage (id) {
        DB.collection('blogs').doc(id)
          .update({
            images: null
          })
          .then(()=> {
            console.log("berhasil Delete image")
          })
          .catch(err=> {
            console.log('some error happen', err)
          })
      },
      getOne () {
        let id = this.$route.params.id
        let self = this
        DB.collection('blogs').doc(id)
          .get()
          .then(snap=> {
            let temp = snap.data()
            var config = {};
            config.placeholder = 'some value';
            CKEDITOR.replace("editor_english" , config );
            CKEDITOR.replace("editor_indo" , config );
            CKEDITOR.instances.content_english.setData(temp.content_english)
            CKEDITOR.instances.content_indo.setData(temp.content_indo)
            this.content_indo = temp.content_indo
            this.content_english = temp.content_english
            this.title_english = temp.title_english
            this.title_indo = temp.title_indo
            if (temp.images) {
              this.images.push(temp.images)
              this.imageName = temp.imageName
              this.imageTop = temp.images
            }
            console.log('ini tmep',temp)
          })
          .catch(err=> {
            console.log(err)
          })
      }
    },
  }
</script>

<style>
  .action-align {
    text-align: right !important;
    justify-content: flex-end !important;
  }
  .image-upload {
    width: 100%;
    height: auto;
  }

</style>
