<template>
  <q-table
    :columns="columns"
    :data="blogs"
    row-key="name"
    color="secondary"
    title="Blog Post"
    :pagination.sync="pagination"
  >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="title_english" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.title_english}} </div>
        </div>
      </q-td>
      <q-td key="title_indonesia"  :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.title_indo}} </div>
        </div>
      </q-td>
      <q-td key="author"  :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.author}} </div>
        </div>
      </q-td>
      <q-td key="create_date"  :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.create_date | getDate}} </div>
        </div>
      </q-td>
      <q-td key="published_date"  :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.publish_date | getDate}} </div>
        </div>
      </q-td>
      <q-td key="published"  :props="props" >
        <div class="row items-center justify-between no-wrap">
          <q-toggle @input="buttonTrigger(props.row)" v-model="props.row.published" checked-icon />
        </div>
      </q-td>
      <q-td key="edit"  :props="props" >
        <div class="row items-center justify-between no-wrap">
          <q-btn @click="toEdit(props.row)" flat round color="primary"  > <q-icon name="edit" /> </q-btn>
          <q-btn @click="deleteRow(props.row)" flat round color="red"  > <q-icon name="delete" /> </q-btn>
        </div>
      </q-td>
    </q-tr>

  </q-table>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import moment from 'moment'
  export default {
    data () {
      return {
        checked: [],
        pagination: {
          sortBy: null, // String, column "name" property value
          descending: false,
          page: 1,
          rowsPerPage: 100 // current rows per page being displayed
        },
        columns: [
          { name: 'title_english', label: 'Title English', field: 'title_english',
            align: 'left', sortable: true },
          { name: 'title_indonesia', label: 'Title Indonesia', field: 'title_indonesia',
            align: 'left', sortable: true },
          { name: 'author', label: 'Author', field: 'author',
            align: 'left', sortable: true },
          { name: 'create_date', label: 'Create At', field: 'create_date',
            align: 'left', sortable: true },
          { name: 'published_date', label: 'Published Date', field: 'published_date',
            align: 'left', sortable: true },
          { name: 'published', label: 'Published', field: 'published',
            align: 'left' },
          { name: 'edit', label: 'Edit', field: 'edit',
            align: 'left' },
        ],
        model: ''
      }
    },
    computed: {
      ...mapState([
        'blogs'
      ])
    },
    methods: {
      ...mapActions([
        'deletingBlogs', 'deletingPermanent'
      ]),
      buttonTrigger(row) {
        this.deletingBlogs(row)

      },
      toEdit(row) {
        this.$router.push('blog-edit/'+row.id)
      },
      deleteRow(row) {
        console.log(row)
        this.deletingPermanent(row)
      },

    },
    mounted () {
      this.$store.dispatch('fetchingBlogs')
    },
    filters : {
      getDate (value) {
        let date = moment(value.seconds*1000).format("MMMM Do YYYY ");
        let time = moment(value.seconds*1000).format("h:mm:ss a")
        return `${date} - ${time}`
      }
    }
  }
</script>
