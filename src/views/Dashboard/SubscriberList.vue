<template>
  <div class="px-8 py-8">
    <v-data-table :headers="headers" :items="listData" :items-per-page="10" class="elevation-1">
      <template v-slot:item.category="{ item }">
        <v-chip :color="getColor(item.category)" dark>{{ item.category }}</v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
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
          text: '用户邮箱',
          align: 'start',
          sortable: false,
          value: 'email',
        },
        { text: '类别', value: 'category' },
        { text: '订阅日期', value: 'date' },
      ],
    }
  },
  components: {},
  methods: {
    getColor (category) {
      if (category === '免费') return 'gray'
      else if (category === '月付') return 'orange'
      else if (category === '季付') return 'green'
      else if (category === '年付') return 'primary'
    },
  },
}
</script>

<style>
</style>
