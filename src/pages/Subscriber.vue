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
        <div @click="exportCsv" class="button" id="test">Download File</div>
      </template>
      <template slot="top-left" slot-scope="props">
        <q-checkbox @input="selectAll" v-model="check" />
      </template>

      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="action" :props="props" >
          <div class="row items-center justify-between no-wrap">
            <q-checkbox v-model="props.row.status" @input="checkList(props.row)" />
          </div>
        </q-td>
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
  import $ from 'jquery'
  export default {
    mounted () {
     this.getSubs()
      // this.exportCsv()
    },
    data () {
      return {
        check: false,
        subs: [],
        pagination: {
          sortBy: null, // String, column "name" property value
          descending: false,
          page: 1,
          rowsPerPage: 100 // current rows per page being displayed
        },
        columns: [
          { name: 'action', label: 'Action', field: 'action',
            align: 'left', sortable: true },
          { name: 'email', label: 'Email', field: 'email',
            align: 'left', sortable: true },
          { name: 'date', label: 'Subscribe Date', field: 'date',
            align: 'left', sortable: true },
        ],
        selected: [],
        selection: 'multiple',
      }
    },
    methods: {
      selectAll () {
        for(var i=0;i<this.subs.length;i++) {
          if (this.check===true) {
            this.subs[i].status = true
            this.selected.push(this.subs[i])
          }
          else {
            this.subs[i].status = false
            this.selected = []
          }
        }
      },
      checkList (row) {
        console.log('check', row )
      },
      exportCsv () {
        let self = this
        // $('#test').click(function(event) {
        //   event.preventDefault()
          console.log('ini apa')
          let temp = self.selected
          var csv = 'Email\n';
          let sub = []
          // console.log(temp)
          for (var i=0;i<temp.length;i++) {
            sub.push([temp[i].email])
          }
          sub.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
          });
          // alert("test excel")
          let hiddenElement = document.createElement('a');
          hiddenElement.setAttribute("type", "hidden"); // make it hidden if needed
          //hiddenElement.target = '_blank';
          hiddenElement.download = 'subs.csv';
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
          document.body.appendChild(hiddenElement);
          hiddenElement.click();
          document.body.removeChild(hiddenElement);
        // });
      },
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
              obj.status = false
              temp.push(obj)
            });
            self.subs = temp

          })
          .catch(err=> {
            console.log(err)
          })
      }
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

<style>
  div.button {
    background: #fff;
    border: 1px solid;
    display: block;
    float: left;
    height: 30px;
    line-height: 30px;
    margin: 0 0 0 15px;
    padding: 0 10px;
    white-space: nowrap;
  }

  div.button:hover {
    background-color: #f0f0f0;
    background-position: 10px 10px;
    background-repeat: no-repeat;
    cursor: pointer;
  }
</style>
