<template>
  <div class="userinfo">
    <div class="avatarWrap">
      <Upload
        action="http://liuguanghai.cn/upload"
        v-model="userInfo.avatarUrl"
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
      >
        <img :src="avatarUrl?avatarUrl:defaultAvatar" alt="" class="avatar">
        <!-- <Avatar class="avatar" style="background-color: #87d068" /> -->
      </Upload>
    </div>
    <Form :model="userInfo" :label-width="80" :disabled="formIsEdit">
      <FormItem label="用户名">
        <Input v-model="userInfo.username" disabled style="width: 500px" />
          <!-- <Input v-model="userInfo.nickname"></Input> -->
      </FormItem>
      <FormItem label="昵称">
        <Input v-model="userInfo.nickname" maxlength="10" show-word-limit style="width: 500px" />
          <!-- <Input v-model="userInfo.nickname"></Input> -->
      </FormItem>
      <FormItem label="真实姓名">
          <!-- <Input v-model="userInfo.realName"></Input> -->
          <Input v-model="userInfo.realName" prefix="ios-contact" style="width: 500px" />
      </FormItem>
      <FormItem label="手机号码">
          <Input v-model="userInfo.phone" style="width: 500px" />
      </FormItem>
      <FormItem label="性别">
        <RadioGroup v-model="userInfo.gender">
            <Radio label="男">
                <span>男</span>
            </Radio>
            <Radio label="女">
                <span>女</span>
            </Radio>
            <Radio label="保密">
                <span>保密</span>
            </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="学校">
          <Input v-model="userInfo.location" clearable style="width: 500px" />
      </FormItem>
      <FormItem label="毕业年份">
          <!-- <Input v-model="userInfo.graduationDate" type="date"></Input> -->
          <Input v-model="userInfo.graduationDate" type="date" icon="ios-clock-outline"
            style="width: 500px"
           />
      </FormItem>
      <FormItem label="个人简介">
          <!-- <Input v-model="userInfo.description" type="textarea"></Input> -->
          <Input v-model="userInfo.description"
            maxlength="100"
            show-word-limit
            type="textarea"
            :rows="3"
            style="width: 500px;"
          />
      </FormItem>
      <!-- <FormItem>
          <Button type="primary">修改</Button>
          <Button style="margin-left: 8px">保存</Button>
      </FormItem> -->
    </Form>
    <div class="formBtn">
      <Button type="primary" @click.native="editUserInfoBtn">修改</Button>
      <Button style="margin-left: 8px" @click.native="saveUserInfoBtn">保存</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      // 控制表单是否可编辑状态
      formIsEdit: true,
      avatarUrl: '',
      defaultAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596303462534&di=77780457c88d6f77e8d2431c0b3ed309&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F56%2F69%2F575747cfd0cfe1a.jpg'
    }
  },
  methods: {
    async getUserInfo() {
      this.userInfo.username = localStorage.getItem('username')
      const res = await this.$http.get('/user', {
        params: {
          username: this.userInfo.username
        }
      })
      console.log(res)
      this.userInfo = res.data
      this.avatarUrl = res.data.avatarUrl
    },
    // 上传头像
    // 图片上传成功
    async handleSuccess (res, file, fileList) {
      this.avatarUrl = `http://liuguanghai.cn/${res.imgUrl}`
      this.userInfo.avatarUrl = `http://liuguanghai.cn/${res.imgUrl}`
      const avatarRes = await this.$http.post('/uploadAvatar', {
        username: localStorage.getItem('username'),
        avatarUrl: this.avatarUrl
      })
      if (avatarRes.status === 200) {
        // 换好头像更新本地历史记录
        localStorage.setItem('avatarUrl', this.avatarUrl)
        this.$emit('updateAvatar', this.avatarUrl)
        this.$Message.success('更新头像成功！')
      } else {
        this.$Message.error('更新头像失败！')
      }
      console.log(avatarRes)
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
    editUserInfoBtn() {
      this.formIsEdit = false
    },
    async saveUserInfoBtn() {
      const res = await this.$http.post('/user', this.userInfo)
      if (res.status === 200) {
        this.$Message.success(res.data.msg)
      } else {
        this.$Message.error(res.data.msg)
      }
      console.log(res)
      this.formIsEdit = true
    }
  },
  // created() {
  //   this.getUserInfo()
  // }
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
  .avatarWrap{
    // background-color: #1ABC9C;
    // text-align: center;
    margin-bottom: 20px;
    margin-left: 280px;
    .avatar{
      display: inline-block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      font-size: 60px;
      cursor: pointer;
      // background-color: #1ABC9C;
      // background-image: url(http://liuguanghai.cn/upload/2020-07-28/upload-1595944747844.jpg);
      // background-size: cover;
      // background-repeat: no-repeat;
    }
  }
  .formBtn{
    width: 90%;
    text-align: center;
  }
</style>
