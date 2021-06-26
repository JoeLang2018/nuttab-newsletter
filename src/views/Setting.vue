<template>
  <div class="d-flex justify-center pt-10 pb-10">
    <v-form ref="form" v-model="valid" lazy-validation style="width:500px;">
      <div class="d-flex justify-center pb-5">
        <div class="avatar" title="点击修改头像">
          <img :src="form.avatarUrl || defaultAvatar" alt="头像" />
          <label class="mask">
            <i class="iconfont icon-icon-test" style="font-size: 20px;"></i>
            <input ref="avatarInput" type="file" accept="image/*" @change="fileChange" />
          </label>
        </div>
      </div>
      <!-- 修改头像 -->
      <el-dialog
        title="裁剪"
        :visible.sync="cropVisible"
        width="300px"
        :append-to-body="true"
        :close-on-click-modal="false"
        custom-class="croppa-dialog"
        center
      >
        <div style="text-align: center;">
          <div class="avatar-croppa-container">
            <croppa
              ref="croppa"
              :width="cropRule.width"
              :height="cropRule.height"
              :placeholder="'loading'"
              :zoom-speed="30"
              :disable-drag-and-drop="false"
              :show-remove-button="false"
              :prevent-white-space="true"
              :disable-click-to-choose="false"
              :disable-scroll-to-zoom="false"
              :show-loading="true"
              :quality="quality"
              :initial-image="cropImg"
            ></croppa>
          </div>
          <div style="margin-top: 1em;">通过鼠标滚轮调节头像大小</div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cropVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="handleCrop" size="small">确 定</el-button>
        </div>
      </el-dialog>
      <!-- <v-text-field value="Mickey" v-model="username" :rules="channelRules" label="用户名" outlined></v-text-field> -->
      <v-text-field v-model="form.channelName" :rules="channelRules" label="频道名称" outlined></v-text-field>
      <v-text-field v-model="form.profile" :rules="profileRules" label="该Newsletter关于什么？" outlined></v-text-field>
      <v-row>
        <v-col cols="4">
          <v-text-field v-model="form.domain" :rules="domainRules" label="你的主页地址" outlined></v-text-field>
        </v-col>
        <v-col cols="8" class="d-flex align-center">.nuttab.com</v-col>
      </v-row>

      <v-btn x-large :disabled="!valid" color="success" width="500px" @click="onSubmit">提交</v-btn>
    </v-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import userModel from '@/model/user'
import fileModel from '@/model/file'
import defaultAvatar from '@/assets/user.png'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

Vue.use(Croppa)
const width = 150
const height = 150

export default {
  name: '',
  data () {
    return {
      cropRule: {
        width,
        height,
      },
      imgRule: {
        minWidth: width,
        minHeight: height,
      },
      cropVisible: false,
      cropImg: '',
      croppa: {},
      imgInfo: null,
      quality: 1,
      valid: false,
      defaultAvatar,
      form: {
        channelName: this.$store.state.user
          ? this.$store.state.user.data.channelName
          : '',
        profile: this.$store.state.user
          ? this.$store.state.user.data.profile
          : '',
        domain: this.$store.state.user
          ? this.$store.state.user.data.domain
          : '',
      },
      channelRules: [v => !!v || '频道名称不能为空'],
      profileRules: [v => !!v || '简介不能为空'],
      domainRules: [v => !!v || '子域名不能为空'],
    }
  },
  mounted () {
    // console.log(this.user)
  },
  computed: {
    ...mapGetters(['user']),
    // channelName () {
    //   return this.username + "'s Newsletter"
    // },
  },
  methods: {
    async onSubmit () {
      if (this.$refs.form.validate()) {
        await userModel.updateInformation(this.form)
        await this.getInformation()
        this.$message.success('更新成功')
        this.$router.push('/author/shiyu')
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
    fileChange (evt) {
      if (evt.target.files.length !== 1) {
        return
      }
      const imgFile = evt.target.files[0]
      // 验证文件大小是否符合要求, 不大于 5M
      if (imgFile.size > 1024 * 1024 * 5) {
        this.$message.error('文件过大超过5M')
        // 清空输入框
        this.clearFileInput(this.$refs.avatarInput)
        return
      }

      // 验证图像是否符合要求
      const imgSrc = window.URL.createObjectURL(imgFile)
      const image = new Image()
      image.src = imgSrc
      image.onload = () => {
        const w = image.width
        const h = image.height
        if (w < 50) {
          this.$message.error('图像宽度过小, 请选择大于50px的图像')
          // 清空输入框
          this.clearFileInput(this.$refs.avatarInput)
          return
        }
        if (h < 50) {
          this.$message.error('图像高度过小, 请选择大于50px的图像')
          // 清空输入框
          this.clearFileInput(this.$refs.avatarInput)
          return
        }
        // 验证通过, 打开裁剪框
        this.cropImg = imgSrc
        this.cropVisible = true
        if (this.$refs.croppa) {
          this.$refs.croppa.refresh()
        }
      }
      image.onerror = () => {
        this.$message.error('获取本地图片出现错误, 请重试')
        // 清空输入框
        this.clearFileInput(this.$refs.avatarInput)
      }
    },
    async handleCrop () {
      // 获取裁剪数据
      const blob = await this.$refs.croppa.promisedBlob('image/jpeg', 0.8)
      // 构造为文件对象
      const file = new File([blob], 'avatar.jpg', {
        type: 'image/jpeg',
      })
      console.log('file', file)
      const res = await fileModel.upload(file)
      this.cropVisible = false
      this.form.avatarUrl = res.data.data.url
      console.log(res)
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  .mask {
    opacity: 0;
    transition: all 0.2s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;

    input {
      display: none;
    }
  }

  &:hover {
    .mask {
      opacity: 1;
    }
  }
}
</style>
