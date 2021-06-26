<template>
  <v-app-bar app flat>
    <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleDrawer" />

    <v-container class="mx-auto py-0">
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            :src="require('@/assets/logo.png')"
            class="mr-5"
            contain
            height="60"
            width="60"
            max-width="60"
            @click="$vuetify.goTo(0)"
          />
        </router-link>

        <div class="d-flex justify-space-between" style="flex:1">
          <div>
            <router-link to="/">
              <v-btn color="primary" text>主页</v-btn>
            </router-link>
          </div>

          <div class="d-flex">
            <router-link to="/about">
              <v-btn text color="primary">关于</v-btn>
            </router-link>

            <!-- <v-btn class="hidden-sm-and-down" text @click="$router.push('intro')"> -->
            <router-link to="/intro">
              <v-btn text color="primary">成为创作者</v-btn>
            </router-link>

            <div v-if="!user">
              <router-link to="/signup">
                <v-btn text outlined color="primary">注册</v-btn>
              </router-link>
              <router-link to="/login">
                <v-btn text color="primary">登录</v-btn>
              </router-link>
            </div>
            <div v-else class="d-flex">
              <router-link to="/edit">
                <v-btn color="primary">开始写作</v-btn>
              </router-link>
              <div class="pl-5">
                <v-menu bottom offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-avatar size="40" v-bind="attrs" v-on="on">
                      <img :src="require('@/assets/shiyu.jpg')" alt="author" />
                    </v-avatar>
                    <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on"></v-btn> -->
                  </template>

                  <v-list>
                    <v-list-item>
                      <router-link to="/author/shiyu">
                        <v-btn text>我的主页</v-btn>
                      </router-link>
                    </v-list-item>
                    <v-list-item>
                      <router-link to="/dashboard">
                        <v-btn text>数据中心</v-btn>
                      </router-link>
                    </v-list-item>
                    <v-list-item>
                      <router-link to="/setting">
                        <v-btn text>账户设置</v-btn>
                      </router-link>
                    </v-list-item>
                    <v-list-item>
                      <v-btn text @click="onLogout">退出登录</v-btn>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </div>
          </div>
        </div>

        <!-- <v-spacer /> -->

        <!-- <v-text-field
          class="mt-5 mb-5"
          append-icon="mdi-magnify"
          flat
          hide-details
          solo-inverted
          style="max-width: 150px"
        />-->
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CoreAppBar',
  data () {
    return {
      items: [
        { title: '个人资料' },
        { title: '账户设置' },
        { title: '退出登录' },
      ],
    }
  },
  computed: {
    // ...mapGetters(['links']),
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(['user']),
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions(['loginOut', 'setUserAndState']),
    ...mapMutations(['toggleDrawer']),
    init () {
      const { user } = this.$store.state
      this.username = user ? user.username : '未登录'
      // this.nickname = user && user.nickname ? user.nickname : '佚名'
    },
    onLogout () {
      this.loginOut()
      this.$router.push('/')
    },
    // onClick (e, item) {
    //   e.stopPropagation()

    //   if (item.to || !item.href) return

    //   this.$vuetify.goTo(item.href.endsWith('!') ? 0 : item.href)
    // },
  },
}
</script>
