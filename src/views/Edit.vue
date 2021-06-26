<template>
  <div>
    <v-dialog v-model="publishDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">发布Newsletter</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div class="d-flex flex-column" style="font-size:14px">
              <div>将Newsletter发送给</div>
              <div>
                <v-radio-group v-model="chooseTarget">
                  <v-radio label="所有订阅者" value="0"></v-radio>
                  <v-radio label="付费订阅者" value="1"></v-radio>
                </v-radio-group>
              </div>
              <div class="pt-5">是否发送邮件</div>
              <div>
                <v-switch v-model="isSendEmail" :label="isSendEmail?'发送邮件':'只发布在网站上'"></v-switch>
              </div>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="publishDialog = false">关闭</v-btn>
          <v-btn color="blue darken-1" text @click="onSubmit">发布</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-app-bar app flat>
      <v-container class="pl-0 pr-0" style="width:900px">
        <div class="d-flex justify-space-between" style>
          <!-- <router-link to="/"> -->
          <!-- <v-btn class="hidden-sm-and-down" text>
              
          </v-btn>-->
          <v-icon @click="$router.back(-1)">mdi-arrow-collapse-left</v-icon>
          <!-- </router-link> -->
          <router-link :to="{ path: '/dashboard', query: { id: 2 }}">
            <v-btn class="hidden-sm-and-down" text>草稿箱</v-btn>
          </router-link>
        </div>
      </v-container>
    </v-app-bar>
    <v-container class="pt-10" style="width:900px">
      <v-row style>
        <textarea
          v-model="form.title"
          class="input-title"
          placeholder="输入标题…"
          maxlength="200"
          @input="onEditorChange"
        ></textarea>
        <textarea
          v-model="form.summary"
          class="input-summary"
          placeholder="输入梗概…"
          maxlength="200"
          @input="onEditorChange"
        ></textarea>
      </v-row>

      <v-row>
        <!-- <snow-editor></snow-editor> -->
        <quill-editor
          v-model="form.content"
          ref="myQuillEditor"
          :options="editorOption"
          @focus="onEditorFocus($event)"
          @blur="onEditorBlur($event)"
          @change="onEditorChange($event)"
          class="editor"
          placeholder="输入副标题…"
        ></quill-editor>
      </v-row>
      <div
        class="d-flex justify-center align-center"
        style="position:fixed;bottom:0;left:0;width:100vw;height:85px;border-top:solid 1px #dfebf6"
      >
        <div class="d-flex justify-space-between" style="width:900px">
          <div>
            <v-btn @click="showPreview=true" color width="120">预览</v-btn>
          </div>
          <div>
            <v-btn
              color
              width="120"
              @click="onSaveDraft"
              :disabled="isSaved"
            >{{isSaved?'已保存':'保存为草稿'}}</v-btn>
            <v-btn class="ml-8" color="success" width="120" @click="onPublish">发布</v-btn>
          </div>
        </div>
      </div>
      <!-- <v-btn color="primary" @click="submit"> 提交 </v-btn> -->
      <form action method="post" enctype="multipart/form-data" id="uploadFormMulti">
        <input
          style="display: none"
          :id="uniqueId"
          type="file"
          name="file"
          multiple
          accept="image/jpg, image/jpeg, image/png, image/gif"
          @change="uploadImg('uploadFormMulti')"
        />
      </form>
    </v-container>

    <v-dialog v-model="showPreview" scrollable max-width="720px">
      <v-card>
        <v-card-title>预览</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 900px;">
          <div class="py-10 px-5">
            <h1>{{form.title}}</h1>
            <p>
              <br />
            </p>
            <h2>{{form.summary}}</h2>
            <p>
              <br />
            </p>
            <div v-html="form.content"></div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="showPreview = false">关闭</v-btn>
          <!-- <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import quillConfig from '../utils/quill-config.js'

import SnowEditor from '@/components/SnowEditor'
import articleModel from '@/model/article'
import fileModel from '@/model/file'

export default {
  name: 'edit',
  data () {
    return {
      isSaved: false,
      tipContent: '',
      timeout: 1500,
      showPreview: false,
      chooseTarget: '0',
      isSendEmail: true,
      publishDialog: false,
      uniqueId: 'uniqueId',

      form: {
        author: this.$store.state.user.data.domain,
        content: '', // 富文本编辑器默认内容
        title: '',
        summary: '',
        target: 0,
        platform: 0,
      },

      editorOption: quillConfig,
    }
  },
  components: { quillEditor, SnowEditor },
  computed: {
    // 获取到quill的实例
    editor () {
      return this.$refs.myQuillEditor.quill
    },
  },
  beforeRouteLeave (to, from, next) {
    if (!this.isSaved) {
      this.$confirm('未保存的内容可能会丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          next()
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消',
          // })
        })
    } else {
      next()
    }

    // console.log(to, from)
  },
  async mounted () {
    if (this.$route.query.id) {
      const res = await articleModel.getArticleById(this.$route.query.id)
      console.log(res)
      this.form = res.data.data
    }

    var _this = this
    var imgHandler = async function (image) {
      if (image) {
        var fileInput = document.getElementById(_this.uniqueId) // 隐藏的file文本ID
        fileInput.click() // 加一个触发事件
      }
    }
    _this.editor.getModule('toolbar').addHandler('image', imgHandler)
  },
  async created () {},
  methods: {
    onPublish () {
      if (!this.form.title) {
        this.$message.error('请输入标题')
      } else if (!this.form.content) {
        this.$message.error('请输入内容')
      } else {
        this.publishDialog = true
      }
    },
    async onSubmit () {
      this.publishDialog = false
      this.form.target = parseInt(this.chooseTarget)
      this.form.platform = this.isSendEmail ? 0 : 1
      console.log(this.form)
      await articleModel.postArticle(this.form)
      this.$message({
        message: '发布成功',
        type: 'success',
      })
      this.isSaved = true
      this.$router.push('/archive/' + this.$store.state.user.data.domain)
    },
    async onSaveDraft () {
      if (!this.form.title && !this.form.summary && !this.form.content) {
        this.$message.error('没有任何内容')
      } else {
        await articleModel.saveDraft(this.form)
        this.isSaved = true
        this.$message.success('保存成功')
      }
    },
    // 准备富文本编辑器
    onEditorReady () {},
    // 富文本编辑器 失去焦点事件
    onEditorBlur () {},
    // 富文本编辑器 获得焦点事件
    onEditorFocus () {},
    // 富文本编辑器 内容改变事件
    onEditorChange () {
      this.isSaved = false
    },
    onTitleChange () {
      console.log('changed')
    },
    async uploadImg () {
      var _this = this
      // 构造formData对象
      var formData = new FormData()
      formData.append('file', document.getElementById(_this.uniqueId).files[0])

      const res = await fileModel.uploadImg(formData)
      // 返回上传文件的地址
      const url = res
      console.log('url', url)

      try {
        // 调用上传文件接口
        const res = await fileModel.uploadImg(formData)
        // 返回上传文件的地址
        const url = res.data.imgUrl

        // console.log('url', url)

        if (url != null && url.length > 0) {
          const Range = _this.editor.getSelection()
          // url = url.indexOf('http') != -1 ? url : 'http:' + url

          // 上传文件成功之后在富文本中回显(显示)
          _this.editor.insertEmbed(
            Range != null ? Range.index : 0,
            'image',
            url,
          )
        } else {
          // _this.$message.warning('图片上传失败')
          alert('图片上传失败')
        }
        // 成功之后,将文件的文本框的value置空
        document.getElementById(_this.uniqueId).value = ''
      } catch ({ message: msg }) {
        document.getElementById(_this.uniqueId).value = ''
        // _this.$message.warning(msg)
        alert(msg)
      }
    },
  },
}
</script>

<style lang="scss">
body {
  height: 100%;
  overflow-y: hidden;
}
.editor-scroll {
  flex: 1;
  overflow-y: auto;
  // height: 500px;
}
.footer {
  z-index: 0;

  // margin-top: -1px;
  height: 85px;
  overflow: hidden;
  width: 100%;
  border-top: solid 1px #dfebf6;
  padding: 20px 50px;
  align-items: center;
}
.input-title {
  border: solid 0px;
  outline: none;

  font-kerning: auto;
  display: block;
  border: 0;
  border-color: transparent;
  width: 100%;
  resize: none;
  background: var(--web_bg_color, white);
  color: var(--print_on_web_bg_color, #1a1a1a);
  margin: 4px 0 0;
  padding: 0 0 4px;
  font-weight: 700;
  font-size: 2em;
  line-height: 1.1em;
  // height: 60px;
}
.input-summary {
  border: solid 0px;
  outline: none;

  font-kerning: auto;
  display: block;
  // border: 0;
  border-color: transparent;
  width: 100%;
  resize: none;
  background: var(--web_bg_color, white);

  line-height: 1.16em;
  font-weight: 400;
  font-size: 19px;
  color: var(
    --print_secondary,
    var(--print_secondary_on_web_bg_color, var(--print_secondary, #757575))
  );
  margin: 0;
  padding: 0;
  // height: 44px;
}
.editor {
  line-height: normal !important;

  height: 45vh;
  border: solid 0px;
}

.ql-editor {
  font-size: 16px;
}
.toolbar {
  position: sticky;
  top: 164px; //这个top值，指的是 离顶部多少距离吸顶
  left: 0px;
}
.ql-container.ql-snow {
  border: solid 0px;
}

.ql-toolbar.ql-snow {
  border: 0px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="normal"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="normal"]::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
