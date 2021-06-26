<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64">
          <img :src="require('@/assets/shiyu.jpg')" alt="author" />
        </v-avatar>

        <div class="ml-3">{{user.data.username}}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item-group v-model="selectedItem" color="primary" @change="changeTab">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>订阅用户</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-note-text</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>我的文章</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>草稿箱</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- <div v-if="selectedItem==1" class="px-8 py-8">
      <v-data-table
        :headers="articleHeaders"
        :items="articles"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
    </div>-->

    <!-- <div v-else-if="selectedItem==2" class="px-8 py-8">
      <v-data-table :headers="draftHeaders" :items="drafts" class="elevation-1">
        <template v-slot:item.actions="{ item }">
          <v-btn>按我</v-btn>
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:item.title="{ item }">
          <v-chip color="red" dark>{{ item.title }}</v-chip>
        </template>
      </v-data-table>
    </div>-->
    <subscriber-list v-if="selectedItem==0" :listData="users"></subscriber-list>
    <article-list v-else-if="selectedItem==1" :listData="articles"></article-list>
    <draft-list v-else-if="selectedItem==2" :listData="drafts"></draft-list>
    <!-- <div >
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="n in 6">
                  <v-list-item :key="n">
                    <v-list-item-avatar color="grey darken-1"></v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Message {{ n }}</v-list-item-title>

                      <v-list-item-subtitle>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider v-if="n !== 6" :key="`divider-${n}`" inset></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>-->
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import authorModel from '@/model/author'
import articleModel from '@/model/article'
export default {
  components: {
    'subscriber-list': () => import('./SubscriberList'),
    'article-list': () => import('./ArticleList'),
    'draft-list': () => import('./DraftList'),
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      title: '',
      date: '',
    },
    defaultItem: {
      title: '',
      date: '',
    },

    selectedItem: 0,
    cards: ['Today', 'Yesterday'],
    drawer: null,

    draftHeaders: [
      {
        text: '标题',
        align: 'start',
        sortable: false,
        value: 'title',
      },
      { text: '日期', value: 'date' },
      { text: '操作', value: 'actions', sortable: false },
    ],
    users: [],
    drafts: [],
    articles: [],
  }),
  mounted () {
    if (this.$route.query.id) {
      this.selectedItem = parseInt(this.$route.query.id)
    }
  },
  async created () {
    console.log(this.user.data)
    let res = await authorModel.getSubscribers(this.user.data.domain)
    this.users = res.data.data

    res = await articleModel.getArticles(this.user.data.domain)

    this.articles = res.data.data

    res = await articleModel.getDrafts(this.user.data.domain)
    this.drafts = res.data.data
    // console.log('users', res.data.data)
  },
  methods: {
    async changeTab (e) {
      //   console.log(e)
      //   if (e === 1 && this.articles.length <= 0) {
      //     const res = await articleModel.getArticles(this.user.data.id)
      //     this.articles = res.data.data
      //   } else if (e === 2 && this.drafts.length <= 0) {
      //     const res = await articleModel.getDrafts(this.user.data.id)
      //     this.drafts = res.data.data
      //   }
    },
  },
  computed: {
    ...mapGetters(['user']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    getHeaders () {
      if (this.selectedItem === 0) return this.userHeaders
      else if (this.selectedItem === 1) return this.articleHeaders
      else if (this.selectedItem === 2) return this.draftHeaders
    },
  },
}
</script>