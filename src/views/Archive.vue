<template>
  <v-container class="mb-8">
    <v-hover v-slot="{ hover }" v-for="item in articleList" :key="item.title">
      <v-card :elevation="hover ? 8 : 0" outlined max-width="800" class="mt-8">
        <router-link :to="{
            path: '/article/' + item.id,
          }">
          <div class="d-flex flex-column px-3 py-0">
            <!-- <v-col
              v-if="!$vuetify.breakpoint.mobile"
              cols="3"
              class="d-flex align-self-center justify-center"
            >
              <v-avatar rounded size="130">
                <img :src="item.cover ? item.cover : defaultCover" alt="cover" />
              </v-avatar>
            </v-col>-->
            <!-- <v-col cols="$vuetify.breakpoint.mobile ? '9' : '12'"> -->
            <v-card-text>
              <h2>{{ item.title }}</h2>
            </v-card-text>
            <v-card-subtitle>
              <div>{{ item.summary }}</div>
            </v-card-subtitle>
            <!-- <v-card-text
                >
            </v-card-text>-->
            <v-card-actions class="pl-4 pr-4">
              <div class="text-caption">{{ item.author }} {{ item.date }}</div>
              <div class="text-caption pl-10">
                <v-icon small>mdi-eye</v-icon>
                {{item.view}}
              </div>
              <v-spacer></v-spacer>

              <!-- <v-btn icon @click.stop.prevent="onLike">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <div class="text-caption">10</div>

              <v-btn icon @click.stop.prevent="onComment">
                <v-icon>mdi-comment-text-outline</v-icon>
              </v-btn>
              <div class="text-caption">2</div>

              <v-btn icon @click.stop.prevent="onForward">
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
              <div class="text-caption">5</div>-->
            </v-card-actions>
            <!-- </v-col> -->
          </div>
        </router-link>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
import articleModel from '@/model/article'
export default {
  name: '',
  data () {
    return {
      defaultCover: require('@/assets/shiyu.jpg'),
      articleList: [],
    }
  },

  async created () {
    const res = await articleModel.getArticles(this.$route.params.name)
    // console.log('bp', this.$vuetify.breakpoint.mobile)
    this.articleList = res.data.data
  },
  components: {},
  methods: {
    onLike () {
      this.$message({
        message: '点赞成功',
        type: 'success',
      })
    },
    onComment () {
      this.$message({
        message: '评论',
        type: 'success',
      })
    },
    onForward () {
      this.$message({
        message: '转发',
        type: 'success',
      })
    },
  },
}
</script>

<style>
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
/* .card:hover {
  opacity: 0.6;
  box-shadow: 5px 5px 5px #888888;
} */
</style>
