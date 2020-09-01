<template>
  <div class="layout">
    <Header :show="activeName"></Header>
    <div class="container">
      <Card class="uploadCard">
        <h2>发布商品</h2>
        <Form ref="goodsData" :model="goodsData" :rules="ruleValidate" :label-width="80">
          <FormItem label="商品标题" prop="title">
              <Input v-model="goodsData.title"
                show-word-limit
                maxlength="100"
               placeholder="请输入商品标题"></Input>
          </FormItem>
          <FormItem label="商品简介" prop="description">
              <Input v-model="goodsData.description" type="textarea"
               :autosize="{minRows: 2,maxRows: 5}"
               show-word-limit
               maxlength="300"
               placeholder="请输入商品简介"></Input>
          </FormItem>
          <FormItem label="价格" prop="price">
              <Input type="number" v-model="goodsData.price" placeholder="请输入商品价格"></Input>
          </FormItem>
          <FormItem label="分类" prop="category">
            <Cascader :data="data" v-model="goodsData.category" placeholder="选择分类很重要!"></Cascader>
          </FormItem>
          <FormItem label="学校" prop="location">
             <Select v-model="goodsData.location" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
          <FormItem label="手机" prop="phone">
            <Input v-model="goodsData.phone" placeholder="请输入联系手机号"></Input>
          </FormItem>
          <FormItem label="QQ" prop="qq">
            <Input v-model="goodsData.qq" placeholder="QQ和微信建议至少填写一个,以便联系"></Input>
          </FormItem>
          <FormItem label="微信" prop="wx">
            <Input v-model="goodsData.wx" placeholder="QQ和微信建议至少填写一个,以便联系"></Input>
          </FormItem>
          <FormItem>
            <div class="demo-upload-list" v-for="(item, i) in uploadList" :key="i">
              <template v-if="item.status === 'finished'">
                  <img :src="item.url">
                  <div class="demo-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                      <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                  </div>
              </template>
              <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
                v-model="goodsData.goodsImgs"
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                :on-progress="handleProgress"
                multiple
                type="drag"
                action="http://localhost/upload"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="图片预览" v-model="visible">
                <img :src="imgName" v-if="visible" style="width: 100%">
            </Modal>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="handleSubmit('goodsData')">提交</Button>
              <Button @click="handleReset('goodsData')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
import Header from '../components/header/Header.vue'
export default {
  name: 'UploadGoods',
  components: {
    Header
  },
  data () {
    return {
      // 控制导航栏激活状态
      activeName: '3',
      goodsData: {
        seller: '',
        // 保存商品图片
        goodsImgs: [],
        title: '',
        description: '',
        price: '',
        // 级联选择器
        category: [],
        // 单选选择器
        location: '',
        // 保存所有联系方式
        phone: '',
        qq: '',
        wx: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
          { type: 'string', max: 100, message: '标题不能大于100个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入商品描述', trigger: 'blur' },
          { type: 'string', max: 300, message: '商品描述不能大于300个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请选择学校', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' }
        ]
      },
      // 级联选择器
      value1: [],
      data: [],
      // 单选选择器
      cityList: [
        {
          value: '桂林理工大学',
          label: '桂林理工大学'
        }
      ],
      model1: '',
      // 图片上传
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: []
    }
  },
  methods: {
    // 提交商品信息
    handleSubmit (name) {
      // console.log(this.goodsData.seller)
      if (!localStorage.getItem('username')) {
        this.$Message.error('请先登录再上传物品!')
        return
      }
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post('/uploadGoods', this.goodsData)
          if (res.status === 200) {
            this.$Message.success('提交成功!')
            this.$refs[name].resetFields()
          } else {
            this.$Message.error('提交失败!')
          }
        } else {
          this.$Message.error('信息填写有误!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      console.log(this.$refs.upload.fileList)
      // 清空后不会立即图片列表
      this.$refs.upload.clearFiles()
      console.log(this.$refs.upload.fileList)
    },
    // 图片上传
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    // 删除上传列表图片
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      // 删除照片时，从数组中移去当前照片
      this.goodsData.goodsImgs.splice(this.goodsData.goodsImgs.indexOf(file.name), 1)
      // console.log(this.goodsData.goodsImgs)
    },
    // 图片上传成功
    handleSuccess (res, file, fileList) {
      file.url = `http://localhost/${res.imgUrl}`
      file.name = file.url
      this.goodsData.goodsImgs.push(file.url)
    },
    // 上传错误
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    // 图片上传大小限制
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    // 图片上传前发生
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传5张图片.'
        })
      }
      return check
    },
    // 文件上传进行时
    handleProgress(event, file, fileList) {
      console.log('文件上传中')
    },
    async getCategory() {
      const res = await this.$http.get('/category')
      console.log(res)
      if (res.status === 200) {
        this.data = res.data
      } else {
        this.$Message.error('获取不到分类数据！')
      }
    }
  },
  mounted () {
    this.goodsData.seller = localStorage.getItem('userId')
    this.uploadList = this.$refs.upload.fileList
    this.getCategory()
    if (!localStorage.getItem('username')) {
      this.$Message.warning('请先登录再发布商品！')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
  // 卡片样式
.uploadCard{
  width:800px;
  margin: 20px auto;
}
// 最大宽度小于1000px(移动端)
@media screen and (max-width: 1000px) {
  .uploadCard{
    width:800px;
    margin: 20px 95px;
  }
}
.container{
  width: 1200px;
  margin: 0 auto;
}
// .header{
//   text-align: center;
//   line-height: 100px;
//   background: gray;
// }
h2{
  text-align: center;
  margin-bottom: 10px;
}
// 图片上传
.demo-upload-list{
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 4px;
}
.demo-upload-list img{
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover{
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
  display: block;
}
.demo-upload-list-cover i{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
