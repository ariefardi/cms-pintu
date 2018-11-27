<template>
  <div>
    <q-btn color="primary" @click="customDialog=!customDialog" label="How to add image" />
      <q-dialog
        v-model="customDialog"
        stack-buttons
        prevent-close
        @cancel="onCancel"
        @ok="onOk"
        @show="onShow"
        @hide="onHide"
      >
        <span slot="title">How to add Image?</span>

        <!-- This or use "message" prop on <q-dialog> -->
        <p slot="message">1. Upload image first. Image would be uploaded to firebase storage </p>
        <p slot="message">2. Image will be shown up in bottom Box  </p>
        <p slot="message">3. In this point image will be showing up at top of the post  </p>

      </q-dialog>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        name: "",
        customDialog: false,

      }
    },
    methods: {
      onOk () {
        console.log('ok')
      },
      onCancel () {
        console.log('cancel')
      },
      onShow () {
        console.log('show')
      },
      onHide () {
        console.log('hide')
      },
    }
  }
</script>
