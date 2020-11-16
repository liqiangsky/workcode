<template>
  <div>
    <span class="system-title">减免项维护设置</span>
    <div class="system-bj">
      <div class="system-bj-jianmian">
        <span class="m-r-15">减免项名称</span>
        <el-input
          v-model="reduction_name"
          clearable
          placeholder="请输入内容"
          @change="change"
          class="m-r-15"
        ></el-input>
        <el-button class="m-r-15" @click="query">查询</el-button>
        <el-button type="primary" @click="drawer = true">新增</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="data"
        height="530"
        border
        style="width: 100%"
      >
        <el-table-column
          class="text-center"
          label="序号"
          width="60"
          prop="index"
        ></el-table-column>
        <el-table-column prop="reduction_name" label="减免项"></el-table-column>
        <el-table-column
          prop="reduction_money"
          label="减免金额"
        ></el-table-column>
        <el-table-column
          prop="reduction_reason"
          label="减免原因"
        ></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" class="del-btn" @click="delrow(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-drawer
        :visible.sync="drawer"
        :with-header="false"
        close-on-press-escape
        class="deductionSetting"
      >
        <div class="header">
          <span>新增</span>
          <i
            class="el-icon-close fontsize-20"
            style="cursor: pointer"
            @click="drawer = false"
          ></i>
        </div>
        <el-form
          :model="reduction"
          :rules="rules"
          ref="reduction"
          label-width="80px"
        >
          <el-form-item label="减免项" width="1000px" prop="reduction_name">
            <el-input v-model="reduction.reduction_name"></el-input>
          </el-form-item>
          <el-form-item label="减免金额(元)" prop="reduction_money">
            <el-input v-model="reduction.reduction_money"></el-input>
          </el-form-item>
          <el-form-item label="原因" prop="reduction_reason">
            <el-input v-model="reduction.reduction_reason"></el-input>
          </el-form-item>
          <el-form-item class="text-right demo-drawer__footer">
            <el-button
              type="primary"
              class="drawer-btn-submit"
              @click="add('reduction')"
              >保存</el-button
            >
            <el-button @click="drawer = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>

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
export default {
  data() {
    var reduction_money = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error("请输入正确金额"));
      } else {
        this.reduction.reduction_money = value * 1;
        callback();
      }
    };
    return {
      //抽屉
      drawer: false,
      //加载动画
      loading: false,
      //表格数据
      tableData: [],
      //表格数据
      data: [],
      //减免名称
      reduction_name: "",
      //抽屉新增数据
      reduction: {
        reduction_name: "",
        reduction_money: "",
        reduction_reason: "",
      },
      //校验规则
      rules: {
        reduction_name: [
          { required: true, message: "请输入正确减免项", trigger: "blur" },
        ],
        reduction_money: [
          { required: true, validator: reduction_money, trigger: "blur" },
        ],
        reduction_reason: [
          { required: true, message: "请输入减免原因", trigger: "blur" },
        ],
      },
      // 每页数量
      pagesize: 10,
      //当前页
      current: 1,
      //总条数
      total: 0,
    };
  },
  mounted() {
    // console.log('mont')
    this.reduction_set_Query();
  },
  methods: {
    //减免最新数据查询
    async reduction_set_Query() {
      this.loading = true;
      const result = await axios.post("reduction_set/Query", {
        pageIndex: this.current,
        pageSize: this.pagesize,
        ilist: [
          {
            title: "string",
            content: "string",
          },
        ],
      });
      if (result.status == 200 && result.data.Result == 1) {
        this.tableData = result.data.ResultList;
        this.tableData.forEach((item, index) => {
          item.index = (this.current - 1) * this.pagesize + index + 1;
        });
        this.total = result.data.TotalRecords;
        this.data = this.tableData;
        this.loading = false;
      }
    },
    //减免输入框为空
    change() {
      this.reduction_name == "" ? this.reduction_set_Query() : "";
    },
    //查询数据更新数据
    async query() {
      if (this.reduction_name !== "") {
        this.data = [];
        const result = await axios.post("reduction_set/Query", {
          pageIndex: 0,
          pageSize: 0,
          ilist: [
            {
              title: "string",
              content: "string",
            },
          ],
        });
        this.current = 1;
        this.pagesize = 10;
        this.tableData = result.data.ResultList;
        this.data = this.tableData.filter((item) => {
          return item.reduction_name.includes(this.reduction_name);
        });
        this.data.forEach((item, index) => {
          item.index = (this.current - 1) * this.pagesize + index + 1;
        });
        this.total = this.data.length;
      } else {
        this.reduction_set_Query();
      }
    },
    //删除当前行数据
    delrow(row) {
      console.log(row.reduction_id);
      const h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h("p", { style: "display:flex;align-item:center" }, [
          h("i", {
            class: "el-icon-success m-r-10 fontsize-24",
            style: "color:#67c23a",
          }),
          h("span", null, "您确定要进行删除操作吗？ "),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(async (res) => {
        const result = await axios.post("reduction_set/Del", {
          reduction_id: row.reduction_id,
        });
        console.log(result);
        this.reduction_name = "";
        // this.reduction_set_Query();
        this.$message({
          message: "删除成功！",
          type: "success",
        });
      });
    },
    //新赠
    add(reduction) {
      this.$refs[reduction].validate(async (valid) => {
        if (valid) {
          // alert("submit!");
          const result = await axios.post("reduction_set/Add", {
            reduction_name: this.reduction.reduction_name,
            reduction_money: this.reduction.reduction_money,
            reduction_reason: this.reduction.reduction_reason,
          });
          console.log(result);

          this.$message({
            type: result.data.Result == 0 ? "error" : "success",
            message: result.data.ResultDesc,
          });
          result.data.Result == 0 ? "" : (this.drawer = false);
          this.reduction_set_Query();
          this.reduction.reduction_name = "";
          this.reduction.reduction_money = "";
          this.reduction.reduction_reason = "";
        } else {
          this.$message.error("请先按要求填写信息！");
          console.log("error submit!!");
          return false;
        }
      });
    },
    //每页条数
    handleSizeChange(val) {
      this.pagesize = val;
      this.reduction_name = "";
      // const start = (this.current - 1) * this.pagesize;
      // // console.log(start);
      // const end = this.current * this.pagesize;
      // // console.log(end);
      // this.data = this.tableData.slice(start, end);
      this.reduction_set_Query();
    },
    //切换页码
    handleCurrentChange(val) {
      this.current = val;
      this.reduction_name = "";
      // const start = (val - 1) * this.pagesize;
      // // console.log(start);
      // const end = val * this.pagesize;
      // // console.log(end);
      // this.data = this.tableData.slice(start, end);
      this.reduction_set_Query();
    },
  },
};
</script>
<style lang="scss" scoped>
.system-bj-jianmian {
  display: flex;
  align-items: center;
  .el-form-item__content {
    width: 480px !important;
  }
  .el-input {
    width: 365px !important;
  }
  margin-bottom: 20px;
  .el-button--primary {
    margin: 0 !important;
  }
}

.del-btn {
  color: red !important;
}
</style>