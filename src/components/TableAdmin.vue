<template>
  <q-table
    :columns="columns"
    :data="admins"
    row-key="name"
    color="secondary"
    title="List Admin"
    :pagination.sync="pagination"
  >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="username" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.username}} </div>
        </div>
      </q-td>
      <q-td key="created_at"  :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.created_at | getDate}} </div>
        </div>
      </q-td>
      <q-td key="actions"  :props="props" >
          <q-btn @click="toEdit(props.row)" flat round color="primary"> <q-icon name="edit" />  </q-btn>
          <q-btn @click="toDelete(props.row)" flat round color="red"> <q-icon name="delete" />  </q-btn>
      </q-td>
    </q-tr>

  </q-table>
</template>


<script>
import {mapState, mapActions} from 'vuex'
import moment from 'moment'
  export default {
    computed: {
      ...mapState([
        'admins'
      ])
    },
    data () {
      return {
        columns: [
          { name: 'username', label: 'Username', field: 'username',
            align: 'left', sortable: true },
          { name: 'created_at', label: 'Create At', field: 'created_at',
            align: 'left', sortable: true },
          { name: 'actions', label: 'Actions', field: 'actions',
            align: 'left'},
        ],
        pagination: {
          sortBy: null, // String, column "name" property value
          descending: false,
          page: 1,
          rowsPerPage: 100 // current rows per page being displayed
        },
      }
    },
    methods: {
      ...mapActions([
        "deleteAdmin"
      ]),
      toDelete (row) {
        this.deleteAdmin(row)
      },
      toEdit (row) {
        this.$router.push('/admin-edit/'+row.id)
        // this.$q.notify({
        //   message: "soon update coming!!",
        //   position: 'top-right'
        // })
      }
    },
    mounted () {
      this.$store.dispatch('fetchingAdmins')
    },
    filters : {
      getDate (value) {
        let date = moment(value.seconds*1000).format("MMMM Do YYYY");
        let time = moment(value.seconds*1000).format("h:mm:ss a")
        return `${date} - ${time}`
      }
    }
  }
</script>
