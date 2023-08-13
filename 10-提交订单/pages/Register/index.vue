<script>
import {defineComponent} from 'vue'
import {codeReg, phoneReg, pwdReg} from "@/utils/reg";

export default defineComponent({
  name: "Register",
  data(){
    return{
      phone:'',
      code:'',
      password:'',
      repassword:'',
      isAllow:false
    }
  },
  methods:{
    // 15678909876
    async getSendCodeAsync(phone){
      if(phoneReg.test(phone)){
        this.code = await this.$store.dispatch('user/sendCodeAsync',phone)
      }else{
        this.$message.error('请输入正确格式的手机号')
      }
    },
    async getRegisterAsync(phone,password,code,repassword,isAllow){
      if(!phoneReg.test(phone)){
        return this.$message.error('请输入正确格式的手机号')
      }
      if(!codeReg.test(code)){
        return this.$message.error('验证码不正确')
      }
      if(!pwdReg.test(password)){
        return this.$message.error('请输入正确格式密码：6到21个字符的单词字符（字母、数字或下划线）')
      }
      if(repassword !== password){
        return this.$message.error('两次密码不一致')
      }
      if( !isAllow ){
        return this.$message.error('还未同意协议')
      }
      const res = await this.$store.dispatch('user/registerAsync',{phone,password,code})
      if(res.code === 200){
        this.$router.push('/login')
      }else{
        this.$message.error('注册失败,' + res.message)
      }
    }
  }
})
</script>

<template>
  <!-- 注册内容 -->
  <div class="register">
    <h3>注册新用户
      <span class="go">我有账号，去 <router-link to="/login" >登录</router-link>
					</span>
    </h3>
    <div class="content">
      <label>手机号:</label>
      <input v-model="phone" type="text" placeholder="请输入你的手机号">
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="content">
      <label>验证码:</label>
      <input v-model="code" type="text" placeholder="请输入验证码">
      <button @click="getSendCodeAsync(phone)" class="getcode">获取验证码</button>
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="content">
      <label>登录密码:</label>
      <input v-model="password" type="text" placeholder="请输入你的登录密码">
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="content">
      <label>确认密码:</label>
      <input v-model="repassword" type="text" placeholder="请输入确认密码">
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="controls">
      <input v-model="isAllow" name="m1" type="checkbox">
      <span>同意协议并注册《尚品汇用户协议》</span>
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="btn">
      <button @click="getRegisterAsync(phone,password,code,repassword,isAllow)">完成注册</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  div:nth-of-type(1) {
    margin-top: 40px;
  }

  .content {
    padding-left: 390px;
    margin-bottom: 18px;
    position: relative;

    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }
    .getcode{
      height: 36px;
      margin-left: 10px;
      padding: 5px;
    }
    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }

    img {
      vertical-align: sub;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: middle;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;

    button {
      border:none;
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}

.copyright {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  line-height: 24px;

  ul {
    li {
      display: inline-block;
      border-right: 1px solid #e4e4e4;
      padding: 0 20px;
      margin: 15px 0;
    }
  }
}
</style>