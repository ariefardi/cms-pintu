const firebase = require('firebase')
const config = {
  storageBucket: "pintu-web.appspot.com",
  projectId: "pintu-web",
};
firebase.initializeApp(config);

const storage = firebase.storage()
const DB = firebase.firestore()
DB.settings({
  timestampsInSnapshots: true
});
const link_storage = "https://console.firebase.google.com/u/1/project/pintu-web/storage/pintu-web.appspot.com/files/blogs_assets/"
const swal = require('sweetalert')
export {storage, DB, swal, link_storage}
