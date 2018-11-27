<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/" label="Home"/>
      <q-breadcrumbs-el  label="Subscriber"/>
    </q-breadcrumbs>
    <q-table
      :columns="columns"
      :data="subs"
      row-key="name"
      color="secondary"
      title="Subscribers"
      :pagination.sync="pagination"
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="email" :props="props" >
          <div class="row items-center justify-between no-wrap">
            <div> {{props.row.email}} </div>
          </div>
        </q-td>
        <q-td key="action" :props="props" >
          <div class="row items-center justify-between no-wrap">
            <q-btn>
              Blast Email
            </q-btn>
          </div>
        </q-td>
      </q-tr>
    </q-table>
  </q-page>
</template>


<script>
  import {DB} from "../config";

  export default {
    mounted () {
     this.getSubs()
    },
    data () {
      return {
        subs: [],
        pagination: {
          sortBy: null, // String, column "name" property value
          descending: false,
          page: 1,
          rowsPerPage: 100 // current rows per page being displayed
        },
        columns: [
          { name: 'email', label: 'Email', field: 'email',
            align: 'left', sortable: true },
          { name: 'action', label: 'Action', field: 'action',
            align: 'left', sortable: true },
        ],
      }
    },
    methods: {
      getSubs () {
        let self = this
        DB.collection('subscribers')
          .get()
          .then(function(querySnapshot) {
            let temp = []
            querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              let obj = doc.data()
              obj.id = doc.id
              temp.push(obj)
            });
            self.subs = temp
            console.log(self.subs)

          })
          .catch(err=> {
            console.log(err)
          })
      }
    }
  }
</script>
