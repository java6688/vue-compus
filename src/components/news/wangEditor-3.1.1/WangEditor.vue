<template>
  <div class="clearfix">
    <div id="editor"></div>
    <Button class="btn" type="primary" @click="handleEditor">发个动态</Button>
  </div>
</template>

<script>
import wangEditor from 'wangeditor'
export default{
  data() {
    return {
      newsData: {
        user:'',
        content: ''
      }
    }
  },
  methods: {
    initEditor() {
      var editorBox = document.getElementById('editor')
      var editor = new wangEditor(editorBox)
      var vm = this
      editor.customConfig.onchange = function (html) {
        // html 即变化之后的内容
        vm.newsData.content = html
        // console.log(html)
      }
      editor.create()
      // console.log(editor.txt.html())
    },
    async handleEditor() {
      const res = await this.$http.post('/publishNews', this.newsData)
      if (res.status === 200) {
        this.$Message.success('发布成功！')
        this.$emit('newsInfo', this.newsData)
      } else {
        this.$Message.error('发布失败！请查看是否已经登录！')
      }
    }
  },
  mounted() {
    this.newsData.user = localStorage.getItem('userId')
    this.initEditor()
  }
}
</script>

<style scoped>
  .btn{
    margin-top: 6px;
    float: right;
  }
</style>
