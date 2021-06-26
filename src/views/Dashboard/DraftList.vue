<template>
  <div class="px-8 py-8">
    <v-data-table :headers="headers" :items="listData" :items-per-page="10" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <router-link :to="{path:'/edit',query:{id:item.id}}">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        </router-link>

        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import articleModel from '@/model/article'
export default {
  name: '',
  props: {
    listData: {
      type: Array,
    },
  },
  data () {
    return {
      headers: [
        {
          text: '标题',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: '日期', value: 'date' },
        { text: '操作', value: 'actions', sortable: false },
      ],
    }
  },
  components: {},
  methods: {
    getColor (category) {
      console.log('cate')
      if (category === '免费') return 'gray'
      else if (category === '月付') return 'orange'
      else if (category === '季付') return 'green'
      else if (category === '年付') return 'primary'
    },
    editItem (item) {
      this.editedIndex = this.listData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      // console.log(indexOf(item))
      this.editedIndex = this.listData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      // this.listData.splice(this.editedIndex, 1)
      await articleModel.deleteDraft(this.editedItem.id)
      this.$message.success('删除成功')
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
}
</script>

<style>
</style>
