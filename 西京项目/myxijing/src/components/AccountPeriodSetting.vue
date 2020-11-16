<template>
  <div>
    <span class="system-title">账期设置</span>
    <div class="system-bj">
      <div class="system-bj-month">
        <span>账期月份</span>
        <el-date-picker
          v-model="month"
          value-format="yyyy-MM"
          type="month"
          placeholder="选择月"
          @change="change"
        >
        </el-date-picker>
        <el-button @click="query">查询</el-button>
        <el-button type="primary" @click="newadd">新增账期</el-button>
      </div>
      <el-drawer
        :visible.sync="drawer"
        :with-header="false"
        close-on-press-escape
        class="accountPeriodSetting"
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
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="账期日期">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  type="date"
                  v-model="ruleForm.startdate"
                  disabled
                  placeholder="请选择开始交易日期"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">至</el-col>
            <el-col :span="11">
              <el-form-item prop="enddate">
                <el-date-picker
                  type="date"
                  value-format="yyyy-MM-dd"
                  v-model="ruleForm.enddate"
                  placeholder="请选择结束交易日期"
                  style="width: 100%"
                  :autofocus='autofocus'
                  @focus="focus"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="账期月份">
            <el-col :span="11">
              <el-date-picker
                disabled
                v-model="ruleForm.month"
                placeholder="请选择交易账期月份"
                type="month"
                style="width: 100%"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item class="text-right demo-drawer__footer">
            <el-button
              type="primary"
              class="drawer-btn-submit"
              @click="add('ruleForm')"
              >保存</el-button
            >
            <el-button @click="drawer = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
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
        <el-table-column prop="zqrq" label="账期日期"></el-table-column>
        <el-table-column prop="as_ny" label="账期月份"></el-table-column>
        <el-table-column label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="text">结账</el-button>
            <el-button type="text" class="f-btn">反结账</el-button>
            <el-button
              type="text"
              class="m-btn"
              @click="handleMonth(scope.$index, scope.row)"
              >月报表</el-button
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
    //自定义校验规则
    const validate = (rule, value, callback) => {
      console.log(value)
      const days1 = Math.abs(getTime.getTime().days(this.ruleForm.startdate));
      console.log(days1, "day1");
      const days2 = Math.abs(getTime.getTime().days(this.ruleForm.enddate));
      console.log(days2, "day2");
      if (value == "") {
        callback(new Error("请输入结束日期比开始日期大"));
      } else {
        if (days1 > days2) {
          callback(new Error("请输入结束日期比开始日期大"));
        } else if (days2 - days1 > 31) {
          callback(new Error("所选日期区间不能超过一个月,结束日期有误"));
        }
        callback();
      }
    };
    return {
      autofocus:true,
      //抽屉
      drawer: false,
      //加载动画
      loading: false,
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
      //查询月份
      month: "",
      //抽屉新增数据
      ruleForm: {
        startdate: "",
        month: "",
        enddate: "",
      },
      //校验规则
      rules: {
        enddate: [
          {
            type: "date",
            validator: validate,
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.account_set_Query();

    // console.log(this.tableData)
    // this.loading = true;
    // const result = await axios.post("account_set/Query", {
    //   pageIndex: this.current,
    //   pageSize: this.pagesize,
    //   ilist: [
    //     {
    //       title: "string",
    //       content: "string",
    //     },
    //   ],
    // });
    // console.log(result);
    // this.accountPeriodSetting = result;
    // //表格数据
    // this.tableData = this.accountPeriodSetting.data.ResultList;
    // this.tableData.forEach((item, index) => {
    //   item.index = index + 1;
    //   item.zqrq = item.start_date + " 至 " + item.end_date;
    // });
    // // console.log(this.tableData);
    // this.data = this.tableData;
    // //总数
    // this.total = this.accountPeriodSetting.data.TotalRecords;
    // //截取片段
    // this.data = this.tableData.slice(0, this.pagesize);

    // // 日期+1
    // this.ruleForm.startdate = getTime
    //   .getTime()
    //   .getNewDay(this.tableData[0].end_date, 1);
    // // 月份+1
    // this.ruleForm.month = getTime
    //   .getTime()
    //   .getNewMonth(this.tableData[0].as_ny, 1);
    // this.loading = false;
  },
  mounted() {},
  methods: {
    focus(){
      this.autofocus = false
      console.log('foucs')
    },
    //最新数据查询
    async account_set_Query() {
      this.loading = true;
      const result = await axios.post("account_set/Query", {
        pageIndex: this.current,
        pageSize: this.pagesize,
        ilist: [
          {
            title: "string",
            content: "string",
          },
        ],
      });
      // console.log(result);
      if (result.status == 200 && result.data.Result == 1) {
        //表格数据
        this.tableData = result.data.ResultList;
        this.tableData.forEach((item, index) => {
          item.index = (this.current - 1) * this.pagesize + index + 1;
          item.zqrq = item.start_date + " 至 " + item.end_date;
        });
        // console.log(this.tableData, "111111111111111");
        // console.log(this.tableData);
        this.total = result.data.TotalRecords;
        this.data = this.tableData;
        this.loading = false;
      }
    },
    //账期月份改变后查询数据更新
    change() {
      // this.loading = true;
      // // this.month == null ? (this.data = this.tableData) : this.month;
      if (this.month == null) {
        this.account_set_Query();
        // const result = await axios.post("account_set/Query", {
        //   pageIndex: 0,
        //   pageSize: 0,
        //   ilist: [
        //     {
        //       title: "string",
        //       content: "string",
        //     },
        //   ],
        // });
        // this.tableData = result.data.ResultList;
        // this.tableData.forEach((item, index) => {
        //   item.index = index + 1;
        //   item.zqrq = item.start_date + " 至 " + item.end_date;
        // });
        // this.data = this.tableData;
        // this.current = 1;
      }
      // this.loading = false;
    },
    //查询数据数据更新
    async query() {
      if (this.month != "") {
        this.data = [];
        console.log(this.month);
        if (this.month == null) {
          this.account_set_Query();
        } else {
          const result = await axios.post("account_set/Query", {
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
            return item.as_ny == this.month;
          });
          this.data.forEach((item, index) => {
            item.index = (this.current - 1) * this.pagesize + index + 1;
            item.zqrq = item.start_date + " 至 " + item.end_date;
          });
          this.total = this.data.length;
        }
      } else {
        this.account_set_Query();
      }
    },
    // 账期新增
    newadd() {
      this.drawer = true;
      // 日期 + 1;
      this.ruleForm.startdate = getTime
        .getTime()
        .getNewDay(this.tableData[0].end_date, 1);
      // 月份+1
      this.ruleForm.month = getTime
        .getTime()
        .getNewMonth(this.tableData[0].as_ny, 1);
    },
    add(ruleForm) {
      this.$refs[ruleForm].validate(async (valid) => {
        if (valid) {
          console.log("success");
          const result = await axios.post("account_set/Add", {
            end_date: this.ruleForm.enddate,
          });
          console.log(result);
          if (result.data.Result == 1 && result.status == 200) {
            this.$message({
              type: "success",
              message: result.data.ResultDesc,
            });
            this.drawer = false;
          }
          this.query();
        } else {
          console.log("error submit!!");
          this.$message.error("请先按要求填写信息！");
          return false;
        }
      });
    },
    handleMonth(index, item) {
      this.$router.push(`/monthPaymentStatistics?id=${item.as_id}`);
    },
    //每页条数
    handleSizeChange(val) {
      this.pagesize = val;
      // const start = (this.current - 1) * this.pagesize;
      // // console.log(start);
      // const end = this.current * this.pagesize;
      // // console.log(end);
      // this.data = this.tableData.slice(start, end);
      this.account_set_Query();
      this.month = "";

    },
    //切换页码
    handleCurrentChange(val) {
      this.current = val;
      // const start = (val - 1) * this.pagesize;
      // // console.log(start);
      // const end = val * this.pagesize;
      // // console.log(end);
      // this.data = this.tableData.slice(start, end);
      this.account_set_Query();
      this.month = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.system-bj-month {
  width: 650px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  .el-date-editor {
    width: 385px !important;
  }

  .el-button--primary {
    margin: 0 !important;
  }
}
.f-btn {
  color: #f79a02 !important;
}
.m-btn {
  color: #000 !important;
}

// .el-drawer__wrapper {
//   .el-drawer.rtl {
//     width: 780px !important;
//     padding: 20px;
//     margin: 0 auto;
//     .el-drawer__body {
//       .header {
//         width: 100%;
//         color: #72767b;
//         margin-bottom: 32px;
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//       }
//       .el-form {
//         width: 600px;
//         margin: 0 auto;
//         text-align: center;
//         .demo-drawer__footer {
//           margin-right: 0;
//         }
//       }
//     }
//   }
// }
</style>