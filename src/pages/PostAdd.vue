<template>
  <q-page padding >
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/" label="Home"/>
      <q-breadcrumbs-el to="/blog" label="Blog"/>
      <q-breadcrumbs-el label="Add Blog"/>
    </q-breadcrumbs>
    <q-card inline style="width: 100%;"  >
      <q-card-title>
        Add New Blog Post
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

        <q-field>
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
                <img class="image-upload" :src="image.url" alt="">
                  <q-btn @click="deleteImage(image, index)"> Delete </q-btn>
              </div>
            </q-scroll-area>

            <br>

            <div style="height: 100px" />
          </div>
        </q-field>

      </q-card-main>
      <q-card-actions class="action-align">
        <q-btn @click="addBlog"  flat label="Add New Post" />
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script>
  import {storage, token, swal, link_storage} from '../config'
  import {mapActions} from 'vuex'
  export default {
    mounted () {

      var config = {};
      config.placeholder = 'some value';
      CKEDITOR.replace("editor_english" , config );
      CKEDITOR.replace("editor_indo" , config );
    },

    data () {
      return {
        checkArray: [],
        albumTitle: "",
        title_english : '',
        title_indo: '',
        content_english: '',
        content_indo: '',
        image: '',
        images: [],
        loading: false,
        percentage: 0,

      }
    },
    methods: {
      ...mapActions([
        'addingBlogs'
      ]),
      addBlog () {
        this.content_english = CKEDITOR.instances.content_english.getData()
        this.content_indo = CKEDITOR.instances.content_indo.getData()
        let albumTitle = localStorage.getItem('albumTitle')
        let images = link_storage+albumTitle
        let obj = {
          title_english: this.title_english,
          title_indo: this.title_indo,
          content_english: this.content_english,
          content_indo: this.content_indo,
          images,
          token
        }
        this.addingBlogs(obj)
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
                  let obj = {
                    url,
                    name: this.image.name
                  }
                  this.images.push(obj)
                })
            })
        }
      },
      deleteImage (image, index) {
        let albumTitle = localStorage.getItem('albumTitle')
        storage.ref('blogs_assets/'+`${albumTitle}/`+image.name).delete()
          .then(()=> {
            console.log('berhasil delete')
            this.images.splice(index,1)
          })
          .catch(err=> {
            console.log(err)
          })
      },
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
