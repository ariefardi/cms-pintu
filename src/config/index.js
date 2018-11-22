const firebase = require('firebase')
const token = localStorage.getItem("token")
const config = {
  storageBucket: "pintu-landing-pages.appspot.com",
  projectId: "pintu-landing-pages",
};
firebase.initializeApp(config);

const storage = firebase.storage()
const DB = firebase.firestore()
DB.settings({
  timestampsInSnapshots: true
});
const link_storage = "https://console.firebase.google.com/u/1/project/pintu-landing-pages/storage/pintu-landing-pages.appspot.com/files/blogs_assets/"
const swal = require('sweetalert')
export {storage, DB, token, swal, link_storage}
