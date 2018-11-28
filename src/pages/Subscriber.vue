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
      <template slot="top-right" slot-scope="props">
        <q-btn flat color="primary" > Blast Email </q-btn>
      </template>

      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="email" :props="props" >
          <div class="row items-center justify-between no-wrap">
            <div> {{props.row.email}} </div>
          </div>
        </q-td>
        <q-td key="date" :props="props" >
          <div class="row items-center justify-between no-wrap">
            <div> {{props.row.subscribe_date | getDate}} </div>
          </div>
        </q-td>
      </q-tr>
    </q-table>
  </q-page>
</template>


<script>
  import {DB} from "../config";
  import moment from 'moment'
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
          { name: 'date', label: 'Subscribe Date', field: 'date',
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
    },
    filters : {
      getDate (value) {
        let date = moment(value.seconds*1000).format("MMMM Do YYYY");
        return date
      }
    }
  }
</script>
