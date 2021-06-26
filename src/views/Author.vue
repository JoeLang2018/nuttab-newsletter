<template>
  <v-container class="d-flex flex-column align-center pt-10">
    <v-row>
      <v-avatar size="100">
        <img :src="authorData.avatarUrl" alt="author" />
        <!-- <img :src="getUrl" alt="author" /> -->
      </v-avatar>
    </v-row>
    <v-row class="pt-10 pl-5 pr-5">
      <h1>{{ authorData.channelName }}</h1>
    </v-row>
    <v-row class="pt-5 pl-5 pr-5">
      <h4>{{ authorData.profile }}</h4>
    </v-row>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row class="pt-10">
        <v-text-field
          :rules="[rules.email]"
          v-model="email"
          class="input"
          label="请输入邮箱"
          single-line
          outlined
        />

        <v-btn
          :disabled="!valid"
          depressed
          class="btn ma-0"
          color="primary"
          style="height: 56px; width: 100px"
          @click="submit"
        >订阅</v-btn>
      </v-row>
    </v-form>

    <v-row class="pt-5">
      <router-link :to="'/archive/' + this.$route.params.name">往期文章 ></router-link>
    </v-row>
  </v-container>
</template>
 
<script>
import authorModel from '@/model/author'
export default {
  name: '',
  data () {
    return {
      valid: true,
      isCover: true,
      email: '',
      rules: {
        required: value => !!value || '不能为空',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '无效的邮箱'
        },
      },
      authorData: {
        username: '',
        profile: '',
        channelName: '',
        avatarUrl: '',
      },
    }
  },
  computed: {},
  mounted () {
    // console.log(this.$store.state.user)
    if (this.$store.state.user) {
      this.$store.dispatch('changeHeader', true)
    } else {
      this.$store.dispatch('changeHeader', false)
    }
  },
  async created () {
    // console.log(this.$route.params.name)
    const res = await authorModel.getAuthor(this.$route.params.name)
    console.log('res', res)
    this.authorData = res.data.data
    // this.authorData.avatarUrl = require('@/assets/' + this.authorData.avatarUrl)
  },
  methods: {
    submit () {
      this.$refs.form.validate()
      this.$message({
        message: '订阅成功',
        type: 'success',
      })
      this.$refs.form.reset()
    },
  },
  // components: { SubscribeCard },
}
</script>

<style lang="scss" scoped>
.input {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.btn {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
</style>
