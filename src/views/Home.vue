<template>
  <div id="home" style="padding-top:50px">
    <div style="max-width:760px;padding: 0 20px;margin: 0 auto;">
      <h1>这是一个自由写作的平台</h1>
      <div style="padding-top:20px">
        <p>从写作你的第一封Newsletter开始。免费发布作品，不收取任何费用。建立你自己的粉丝圈，真正实现从写作中赚钱。</p>
      </div>

      <router-link to="/edit">
        <v-btn x-large color="primary">开始写作</v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  components: {},
}
</script>
