<template>
  <div style="height: 100%">
    <el-container>
      <el-header class="color-white">
        <div class="el-header-left">
          <img src="../assets/images/xj_logo.jpg" alt="" />
          <h3
            class="f-w-n letter-2 fontsize-18"
            v-show="isCollapse ? false : true"
          >
            房屋管理平台
          </h3>
          <i
            :class="[
              isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold',
              'fontsize-22',
            ]"
            @click="Collapse"
          ></i>
        </div>
        <div class="block el-header-right">
          <el-avatar size="small" :src="circleUrl" class="m-r-10"></el-avatar>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link color-white">
              {{ user_name }}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-key" command="password">
                <span>修改密码</span>
              </el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-switch-button"
                Command="exit"
                divided
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <el-menu
            :collapse="isCollapse"
            :collapse-transition="false"
            unique-opened
            default-active="/home"
            background-color="#eee"
            class="el-menu-vertical-demo"
            router
          >
            <template v-for="item in data">
              <el-submenu
                v-if="item.children && item.children.length > 0"
                :key="item.url"
                :index="item.url.split('?')[0]"
              >
                <template slot="title">
                  <i :class="[item.iconClass]"></i>
                  <span>{{ item.name }}</span>
                </template>
                <template>
                  <el-menu-item
                    v-for="child in item.children"
                    :key="child.id"
                    :index="child.url.split('?')[0]"
                  >
                    <i :class="[child.iconClass]"></i>
                    <span slot="title">{{ child.name }}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item
                v-else
                :key="item.url"
                :index="item.url.split('?')[0]"
              >
                <i :class="[item.iconClass]"></i>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-dialog title="修改密码" width="470px" :visible.sync="passworddialog">
        <el-dialog width="425px" :visible.sync="innerVisible" append-to-body>
          <p style="display: flex; align-item: center; margin: 0">
            <i
              class="el-icon-warning m-r-10 fontsize-24"
              style="color: #e6a23c"
            ></i>
            <span>确认修改</span>
          </p>
          <span slot="footer">
            <el-button size="small" @click.native="innerVisible = false"
              >取消</el-button
            >
            <el-button type="primary" size="small" @click="Editpassword"
              >确定</el-button
            >
          </span>
        </el-dialog>
        <el-form
          :model="password"
          status-icon
          :rules="rules"
          ref="password"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldpass">
            <el-input
              type="password"
              v-model="password.oldpass"
              autocomplete="off"
              show-password
              clearable
              placeholder="请输入原密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass">
            <el-input
              type="password"
              v-model="password.newpass"
              autocomplete="off"
              show-password
              clearable
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="password.checkPass"
              autocomplete="off"
              show-password
              clearable
              placeholder="再次请确认密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer password">
          <el-button
            type="warning"
            class="fontsize-16"
            size="small"
            @click="resetForm('password')"
            >重 置</el-button
          >
          <el-button
            type="primary"
            class="fontsize-16"
            size="small"
            @click="submitForm('password')"
            >提 交</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        title="退出登录"
        width="470px"
        :visible.sync="exitdialog"
        v-loading="loading"
      >
        <div class="tip">
          <i class="el-icon-warning fontsize-24" style="color: #e6a23c"></i>
          <span class="fontsize-16">您确定退出当前系统吗？</span>
        </div>
        <span slot="footer" class="dialog-footer exit">
          <el-button size="small" @click="exitdialog = false">取 消</el-button>
          <el-button type="primary" @click="exit" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>
<script>
import axios from "axios";
import AccountPeriodSetting from "../components/AccountPeriodSetting";
import CommunityMaintenance from "../components/CommunityMaintenance";
import home from "../components/Home";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length >= 6 && value.length <= 20) {
          /[a-z0-9A-Z]{5,19}$/g.test(value)
            ? this.$refs.password.validateField("checkPass")
            : callback(new Error("长度在6到20个字母和数字组合"));
        } else {
          callback(new Error("长度在6到20个字母和数字组合"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.password.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //加载动画
      loading: false,
      //用户名
      user_name: "",
      isCollapse: false,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      data: [],
      passworddialog: false,
      exitdialog: false,
      innerVisible: false,
      //修改密码
      password: {
        oldpass: "",
        newpass: "",
        checkPass: "",
      },
      rules: {
        newpass: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    console.log(sessionStorage.token);
    this.user_name = JSON.parse(sessionStorage.data).user_name;
    this.data = JSON.parse(sessionStorage.data).menus;
    // console.log(this.data);
  },
  methods: {
    //用户信息切换
    handleCommand(Command) {
      Command == "password"
        ? (this.passworddialog = true)
        : (this.exitdialog = true);
    },
    //切换菜单
    Collapse() {
      this.isCollapse = !this.isCollapse;
    },
    //修改密码提交
    submitForm(password) {
      this.$refs[password].validate((valid) => {
        if (valid) {
          console.log("submit!!");
          this.innerVisible = true;
        } else {
          console.log("error submit!!");
          this.$message.error("请先按要求填写信息");
          return false;
        }
      });
    },
    //修改密码确认
    async Editpassword() {
      const result = await axios.post(
        "http://119.3.104.39:2302/api/user_info/EditPassword",
        {
          userName: this.user_name,
          oldPwd: this.password.oldpass,
          password: this.password.checkPass,
        }
      );
      console.log(result);
      if (result.status == 200 && result.data.Result == 1) {
        this.$message({
          message: result.data.ResultDesc,
          type: "success",
        });
        this.innerVisible = false;
        this.passworddialog = false;

        this.password.oldpass = "";
        this.password.newpass = "";
        this.password.checkPass = "";
      } else {
        this.innerVisible = false;
        this.$message({
          message: result.data.ResultDesc,
          type: "error",
        });
      }
    },
    //修改密码表单重置
    resetForm(password) {
      this.$refs[password].resetFields();
    },
    //退出登录
    exit() {
      this.loading = true;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("data");

      setTimeout(() => {
        this.$router.push("/login");
        this.loading = false;
        this.$message({
          message: "退出成功！",
          type: "success",
        });
      }, 500);
    },
  },
};
</script>
<style lang="scss" scoped>
.tip {
  width: 210px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-menu {
  top: 48px !important;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-container {
  height: 100%;
}
.el-dialog__wrapper {
  .el-dialog {
    &__body {
      .el-form {
        &-item:last-child {
          margin-bottom: 0 !important;
        }
      }
    }
    .password {
      padding: 0 20px;
    }
    .exit {
      padding: 0;
    }
  }
}
.el-form-item__content {
  .el-button {
    padding: 8px 10px !important;
  }
}
.el-header {
  display: flex;
  justify-content: space-between;
  color: white !important;
  background-color: #0e7de6 !important;
  &-right {
    display: flex;
    align-items: center;
  }
  &-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .letter-2 {
      margin-right: 20px;
    }
    img {
      width: 45px;
      border-left: 2px solid #fff;
      border-right: 2px solid #fff;
      margin-right: 8px;
    }
  }
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: rgb(238, 238, 238);
  color: #333;
  line-height: 200px;
  i {
    font-size: 18px !important;
    margin-right: 10px;
  }

  .el-menu-item:hover {
    background: #f3ffff !important;
  }
  .el-menu-item.is-active{
    background: #f3ffff !important;;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}
</style>