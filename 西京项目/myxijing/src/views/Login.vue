<template>
  <div class="login" v-loading="loading">
    <div class="login-form">
      <h3 class="color-login m-b-20 letter-4 text-center fontsize-22 f-w-n">
        房屋管理平台
      </h3>
      <el-form
        :rules="rules"
        :model="loginConfig"
        ref="loginConfig"
        class="demo-ruleForm"
      >
        <el-form-item prop="login_account">
          <el-input
            v-model="loginConfig.login_account"
            placeholder="请输入用户账号"
            prefix-icon="iconfont saimingtechlogin_user color-login"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item prop="login_password">
          <el-input
            type="password"
            v-model="loginConfig.login_password"
            placeholder="请输入密码"
            prefix-icon="iconfont saimingtechlogin_lock color-login"
            show-password
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item class="yzmmodle" prop="login_code">
          <el-input
            class="code"
            v-model="loginConfig.login_code"
            placeholder="请输入验证码"
            prefix-icon="iconfont saimingtechlogin_test color-login"
            clearable
            @keyup.native.enter="submitForm('loginConfig')"
          ></el-input>
          <div class="coderight" @click="refreshCode">
            <SIdentify :identifyCode="identifyCode"></SIdentify>
          </div>
        </el-form-item>
        <el-button
          class="loginBtn"
          type="primary"
          @click="submitForm('loginConfig')"
          >登录</el-button
        >
      </el-form>
    </div>
    <footer class="footer color-white">
      <span>Copyright(C)2010-2011</span>
      <span>津ICP备12003508</span>
      <span>公安备12003508-15</span>
    </footer>
  </div>
</template>
<script>
import axios from "axios";
import SIdentify from "../components/identify.vue"; //
// import { mapActions } from "vuex";
import Base64 from "../assets/js/base64";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    const checkcode = (rule, value, callback) => {
      if (value.toUpperCase() != this.identifyCode.toUpperCase()) {
        callback(new Error("验证码错误"));
      }
      callback();
    };
    return {
      //加载动画
      loading: false,
      //验证码
      identifyCode: "",
      //abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
      identifyCodes: [],
      //登录信息
      loginConfig: {
        login_account: "",
        login_password: "",
        login_code: "",
      },
      rules: {
        login_account: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请检查手机号码格式是否正确",
            trigger: "blur",
          },
        ],
        login_password: [{ validator: validatePass, trigger: "blur" }],
        login_code: [{ required: true, validator: checkcode, trigger: "blur" }],
      },
    };
  },
  //验证码组件
  components: {
    SIdentify: SIdentify,
  },
  mounted() {
    this.yzm();
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    //验证码abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
    yzm() {
      const str =
        "abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      this.identifyCodes = str.split("");
    },
    //随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    //随机验证码4为
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    //随机验证码函数
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },
    //登录
    submitForm(loginConfig) {
      this.loading = true;
      // console.log(result);
      this.$refs[loginConfig].validate(async (valid) => {
        if (valid) {
          const result = await axios.post("user_login/Login", {
            login_account: this.loginConfig.login_account,
            login_password: this.loginConfig.login_password,
          });
          console.log(result);
          sessionStorage.menus = JSON.stringify(result.data.ResultList[0].menus);
          if (result.data.Result == 1 && result.status == 200) {
            sessionStorage.token = result.data.ResultList[0].Token;
            // JSON.parse
            sessionStorage.data = JSON.stringify(result.data.ResultList[0]);
            // this.$store.dispatch("setLogin", result);
            setTimeout(() => {
              this.$router.push("/home");
              this.$message({
                message: "登陆成功！",
                type: "success",
              });
              this.loading = false;
            }, 500);
          } else {
            setTimeout(() => {
              this.loading = false;
              this.loginConfig.login_code = "";
              this.refreshCode();
              this.$message.error(result.data.ResultDesc);
            }, 500);
          }
        } else {
          this.loading = false;
          this.loginConfig.login_code = "";
          this.refreshCode();
          console.log("error submit!!");
        }
        // setTimeout(() => {
        //   this.loading = false;
        // }, 1000);
      });
    },
  },
};
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  min-width: 1280px;
  background-image: url("../assets/images/login_bg@2x.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .login-form {
    background-color: #fff;

    padding: 60px;
    position: fixed;
    right: 100px;
    top: 20%;
    // 验证码样式
    .yzmmodle {
      position: relative;
      .code {
        width: 160px;
      }
      .coderight {
        display: inline-block;
        position: absolute;
        right: 0;
      }
    }
    // 验证码样式

    .loginBtn {
      width: 100%;
    }

    .el-form-item {
      width: 300px;
      margin-bottom: 40px;
      .el-input {
        margin-bottom: 5px;
        .el-input__inner {
          border: none;
          border-radius: 0;
          border-bottom: 1px solid black;
        }
      }
    }
  }
  .footer {
    width: 1280px;

    display: flex;
    justify-content: space-around;

    position: absolute;
    left: 50%;
    bottom: 15px;
    transform: translateX(-50%);
  }
}
</style>