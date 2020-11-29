<template>
  <div>
    <span class="powerlist-title">角色管理</span>
    <div class="powerlist-bj">
      <div class="powerlist-bj-header m-b-20">
        <span>角色名称</span>
        <el-input
          placeholder="请输入角色名称"
          clearable
          class="search m-l-15 m-r-15"
          v-model="keywords"
          @change="clear"
        ></el-input>
        <el-button @click="Query">查询</el-button>
        <el-button type="primary" @click="newadd">新增</el-button>
        <el-button type="danger" @click="Delete">批量删除</el-button>
      </div>
      <!-- 新增 -->
      <el-drawer
        title="新增"
        :visible.sync="newdrawer"
        size="800px"
        :destroy-on-close="true"
      >
        <el-form
          :model="newaddruleForm"
          :rules="newaddrules"
          ref="newaddruleForm"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="role_name">
            <el-input
              v-model="newaddruleForm.role_name"
              placeholder="请输入角色名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="role_remark">
            <el-input
              v-model="newaddruleForm.role_remark"
              placeholder="请输入角色名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 330px">
            <el-button type="primary" @click="submitForm('newaddruleForm')"
              >保 存</el-button
            >
            <el-button @click="newdrawer = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <!-- 权限 -->
      <el-drawer
        title="设置权限"
        :visible.sync="Permissiondrawer"
        size="700px"
        :destroy-on-close="true"
      >
        <el-form
          :model="SettingruleForm"
          ref="PermissionruleForm"
          :rules="Permissionrules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色权限" prop="menuLists">
            <el-tree
              class="border-black"
              :data="PermissionSettingData"
              show-checkbox
              node-key="name"
              :default-expand-all="true"
              :default-checked-keys="checkedLists"
              :props="defaultProps"
              @check-change="ChangePermission"
            >
            </el-tree>
          </el-form-item>
          <el-form-item style="margin-left: 330px">
            <el-button
              type="primary"
              @click="PermissionsubmitForm('PermissionruleForm')"
              >保 存</el-button
            >
            <el-button @click="Permissiondrawer = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <el-table
        v-loading="loading"
        :data="data"
        height="530"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          class="text-center"
          label="序号"
          width="60"
          prop="index"
        ></el-table-column>
        <el-table-column label="角色名称" prop="role_name"></el-table-column>
        <el-table-column label="角色描述" prop="role_remark"></el-table-column>
        <el-table-column label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="PermissionSetting(scope.row)"
              >权限设置</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="system-pagination">
        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            prev-text="上一页"
            next-text="下一页"
            layout="prev,pager,next,jumper,total,sizes"
            :total="total"
            :page-sizes="[10, 20, 30, 50, 100]"
            :page-size="pagesize"
          >
            <el-button class="m-t-15" type="text">上一页</el-button>
            <el-button class="m-t-15" type="text">下一页</el-button>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import getTime from "../assets/js/time.js";
export default {
  data() {
    return {
      //加载动画
      loading: false,
      //新增角色抽屉
      newdrawer: false,
      //设置权限抽屉
      Permissiondrawer: false,
      //关键字
      keywords: "",
      //提交数据类型
      type: 0, //0编辑修改1新增提交
      //批量删除数据
      Deletes: [],
      //权限数据
      checkedLists: [],
      //表格数据
      tableData: [],
      //表格数据
      data: [],
      // 每页数量
      pagesize: 10,
      //当前页
      current: 1,
      //总条数
      total: 0,
      //表单角色数据
      newaddruleForm: {
        role_id: "",
        role_name: "",
        role_org_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        role_remark: "",
      },
      //权限列表数据
      PermissionSettingData: [],
      //表单权限数据
      SettingruleForm: {
        rlpn_rl_id: "",
        menuLists: [],
      },
      defaultProps: {
        children: "children",
        label: "name",
      },
      //新增角色规则
      newaddrules: {
        role_name: [
          {
            required: true,
            message: "请输入正确的角色名称",
            trigger: "blur",
          },
        ],
        role_remark: [
          {
            required: true,
            message: "请输入正确的角色描述",
            trigger: "blur",
          },
        ],
      },
      //权限设置规则
      Permissionrules: {
        menuLists: [
          {
            required: true,
            message: "请至少选中一个角色菜单",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.role_info_Query();
  },
  mounted() {
    this.PermissionSettingData = JSON.parse(sessionStorage.menus);
  },
  methods: {
    //权限设置数据修改
    ChangePermission(obj, status) {
      if (status) {
        this.SettingruleForm.menuLists.push(obj.id);
      } else {
        const result = this.SettingruleForm.menuLists.findIndex((i) => {
          return i === obj.id;
        });
        this.SettingruleForm.menuLists.splice(result, 1);
      }
      console.log(this.SettingruleForm.menuLists);
    },
    //查询最新数据
    async role_info_Query() {
      this.loading = true;
      const result = await axios.post(
        "http://119.3.45.32:2303/api/role_info/Query",
        {
          pageIndex: this.current,
          pageSize: this.pagesize,
          ilist: [
            {
              title: "string",
              content: "string",
            },
          ],
        }
      );
      console.log(result);
      if (result.status == 200 && result.data.Result == 1) {
        //表格数据
        this.tableData = result.data.ResultList;
        this.tableData.forEach((item, index) => {
          item.index = (this.current - 1) * this.pagesize + index + 1;
        });
        this.total = result.data.TotalRecords;
        this.data = this.tableData;
        this.loading = false;
      }
    },
    //查询按钮
    async Query() {
      if (this.keywords == "") {
        this.role_info_Query();
      } else {
        this.loading = true;
        this.data = [];
        const result = await axios.post(
          "http://119.3.45.32:2303/api/role_info/Query",
          {
            pageIndex: 0,
            pageSize: 0,
            ilist: [
              {
                title: "string",
                content: "string",
              },
            ],
          }
        );
        this.current = 1;
        this.pagesize = 10;
        this.tableData = result.data.ResultList;
        this.data = this.tableData.filter((item) => {
          return item.role_name.includes(this.keywords);
        });
        this.data.forEach((item, index) => {
          item.index = (this.current - 1) * this.pagesize + index + 1;
        });
        this.total = this.data.length;
        // setTimeout(() => {
        this.loading = false;
        // }, 1000);
      }
      // this.loading = false
    },
    //清空input框
    clear(val) {
      console.log(val == "");
      val == "" ? this.role_info_Query() : "";
    },
    //新增按钮
    newadd() {
      this.newdrawer = true;
      this.type = 1;
    },
    //表单提交按钮
    submitForm(newaddruleForm) {
      this.$refs[newaddruleForm].validate(async (valid) => {
        if (valid) {
          //新增角色
          if (this.type == 1) {
            var result = await axios.post(
              "http://119.3.45.32:2303/api/role_info/Add",
              this.newaddruleForm
            );
          }
          //修改角色
          if (this.type == 0) {
            var result = await axios.post(
              "http://119.3.45.32:2303/api/role_info/Edit",
              this.newaddruleForm
            );
          }
          if (result.status == 200 && result.data.Result == 1) {
            switch (this.type) {
              case 1:
                this.$message({
                  message: "新增成功",
                  type: "success",
                });
                break;
              case 0:
                this.$message({
                  message: result.data.ResultDesc,
                  type: "success",
                });
            }
            this.role_info_Query();
            this.newdrawer = false;
          } else {
            this.$message({
              message: result.data.ResultDesc,
              type: "error",
            });
          }
        } else {
          this.$message.error("请先按要求填写信息！");
          return false;
        }
      });
    },
    //批量角色删除
    async Delete() {
      if (this.Deletes.length == 0) {
        this.$message.error("请先勾选要删除的角色");
      } else {
        this.$confirm("您确定要进行删除操作吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success",
        }).then(() => {
          this.Deletes.forEach(async (item) => {
            await axios.post("http://119.3.45.32:2303/api/role_info/DelList", {
              role_id: item.role_id,
            });
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          setTimeout(() => {
            this.role_info_Query();
          }, 200);
        });
      }
    },
    //表格批量删除选中
    handleSelectionChange(deletes) {
      this.Deletes = deletes;
      console.log(this.Deletes);
    },
    //编辑按钮
    handleEdit(row) {
      this.newdrawer = true;
      this.newaddruleForm = {
        role_id: row.role_id,
        role_name: row.role_name,
        role_org_id: row.role_org_id,
        role_remark: row.role_remark,
      };
      this.type = 0;
    },
    //权限设置
    async PermissionSetting(row) {
      this.checkedLists = [];
      this.Permissiondrawer = true;
      const result = await axios.post(
        "http://119.3.45.32:2303/api/role_info/QueryDetail",
        {
          pageIndex: this.current,
          pageSize: this.pagesize,
          ilist: [
            {
              title: "string",
              content: "string",
            },
          ],
        }
      );
      console.log(result);
      if (result.status == 200 && result.data.Result == 1) {
        const juese = result.data.ResultList.find((item) => {
          return item.role_id == row.role_id;
        });
        // console.log(juese);
        this.SettingruleForm.rlpn_rl_id = juese.role_id;
        if (juese.sCodes !== null) {
          this.checkedLists = juese.sCodes.split(",");
        }
      }
    },
    //权限表单提交
    PermissionsubmitForm(PermissionruleForm) {
      this.$refs[PermissionruleForm].validate(async (valid) => {
        if (valid) {
          const result = await axios.post(
            "http://119.3.45.32:2303/api/role_info/Rolemenu_relationAdd",
            this.SettingruleForm
          );
          // console.log(result);
          if (result.status == 200 && result.data.Result == 1) {
            this.Permissiondrawer = false;
            this.$message({
              type: "success",
              message: "编辑成功",
            });
            this.SettingruleForm.menuLists = [];
          }
        } else {
          this.$message.error("请先按要求填写信息！");
          return false;
        }
      });
    },
    //每页条数
    handleSizeChange(val) {
      this.pagesize = val;
      this.role_info_Query();
    },
    //切换页码
    handleCurrentChange(val) {
      this.current = val;
      this.role_info_Query();
    },
  },
};
</script>
<style lang="scss" scoped>
.powerlist-title {
  display: block;
  margin-bottom: 10px;
}
.powerlist-bj {
  padding: 23px;
  border-radius: 4px;
  background-color: #fff;
}
.search {
  width: 310px;
}
.border-black {
  height: 480px;
  padding: 20px;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
}
</style>