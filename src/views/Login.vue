<template>
  <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
    <v-container class="pt-10" style="width:300px">
      <v-form ref="form" v-model="valid">
        <div class="d-flex text-h4 justify-center">登录</div>
        <div class="pt-10">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        </div>

        <div v-if="isSendCode">
          <div class="text-caption align-center">
            <v-icon small color="green">mdi-check-circle-outline</v-icon>已发送验证码，请检查邮箱
          </div>
          <div>
            <v-text-field v-model="code" :rules="codeRules" label="验证码" required></v-text-field>
          </div>
        </div>

        <div class="d-flex justify-center">
          <v-btn
            width="100"
            outlined
            color="primary"
            @click.prevent="onLogin"
          >{{isSendCode?'继续':'登录'}}</v-btn>
        </div>
        <div v-if="!isSendCode" class="d-flex justify-center pt-5">
          还没有注册？
          <router-link to="/signup">立即注册</router-link>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import userModel from '@/model/user'
import Utils from '@/utils/util'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: '',
  data () {
    return {
      isSendCode: false,
      valid: true,
      email: '123@qq.com',
      code: '123',
      loading: false,
      throttleLogin: null, // 节流登录
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      codeRules: [v => !!v || 'code is required'],
    }
  },
  components: {},
  methods: {
    async login () {
      try {
        this.loading = true
        const token = await userModel.login(this.email, this.code)
        console.log('token', token)
        await this.getInformation()
        this.loading = false
        this.$router.push('/')
        this.$message.success('登录成功')
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    onLogin () {
      if (!this.isSendCode) {
        if (this.$refs.form.validate()) this.isSendCode = true
      } else {
        if (this.$refs.form.validate()) {
          this.throttleLogin()
        }
      }
    },
    async getInformation () {
      try {
        // 尝试获取当前用户信息
        // const user = await userModel.getPermissions()
        const user = await userModel.getInformation()
        this.setUserAndState(user)
        // this.setUserPermissions(user.permissions)
      } catch (e) {
        console.log(e)
      }
    },
    ...mapActions(['setUserAndState']),
  },

  created () {
    // 节流登录
    this.throttleLogin = Utils.throttle(this.login, 2000)
  },
}
</script>

<style>
</style>
