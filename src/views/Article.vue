<template>
  <v-container class="pt-8 pb-8" style="width: 720px">
    <v-row>
      <h1>{{ articleData.title }}</h1>
    </v-row>
    <v-row>
      <v-col class="pl-0 d-flex align-center" cols="1">
        <v-avatar size="40px">
          <img alt="Avatar" :src="articleData.avatarUrl" />
        </v-avatar>
      </v-col>
      <v-col class="pl-0 d-flex flex-column justify-center" cols="3">
        <div class="font-weight-light">{{ articleData.author }}</div>
        <div class="font-weight-thin">{{ articleData.date }}</div>
      </v-col>
    </v-row>
    <v-row>
      <div v-html="articleData.content"></div>
    </v-row>
  </v-container>
</template>

<script>
import articleModel from '@/model/article'
export default {
  name: '',
  props: {
    // articleData: {
    //   type: Object,
    //   required: true,
    // },
  },
  data () {
    return {
      articleData: {},
    }
  },
  components: {},
  async created () {
    const res = await articleModel.getArticleById(this.$route.params.id)
    console.log('res', res.data)
    this.articleData = res.data.data
    this.articleData.avatarUrl = require(`@/assets/${this.articleData.avatarUrl}`)
  },
}
</script>

<style>
</style>
