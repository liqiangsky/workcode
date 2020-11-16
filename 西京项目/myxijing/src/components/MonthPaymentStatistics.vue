<template>
  <div>
    <span class="system-title">月缴费统计</span>
    <div class="system-bj">
      <div class="system-bj-month m-l-30">
        <span>月份</span>
        <el-date-picker
          v-model="month"
          value-format="yyyy-MM"
          type="month"
          placeholder="请选择"
        >
        </el-date-picker>
        <el-button>查询</el-button>
      </div>
      <el-table
        border
        v-loading="loading"
        :data="data"
        show-summary
        style="width: 100%"
        :summary-method="getSummaries"
      >
        <el-table-column
          label="序号"
          prop="index"
          show-overflow-tooltip
          width="60"
          fixed="left"
        >
        </el-table-column>
        <el-table-column
          label="房管员"
          prop="user_name"
          show-summary="true"
          sum-text="合计"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="所管户数(户)"
          show-overflow-tooltip
          prop="house_count"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="月应收(元)"
          show-overflow-tooltip
          prop="month_receivable"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="月实收(元)"
          show-overflow-tooltip
          prop="month_income"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="年应收(元)"
          show-overflow-tooltip
          prop="year_receivable"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="年实收(元)"
          show-overflow-tooltip
          prop="year_income"
        >
        </el-table-column>
        <el-table-column label="年收缴率(%)" show-overflow-tooltip prop="ratio">
        </el-table-column>
        <el-table-column label="预收房租">
          <el-table-column
            label="当月(元)"
            show-overflow-tooltip
            prop="current_collect"
            width="150"
          >
          </el-table-column>
          <el-table-column
            label="累计(元)"
            show-overflow-tooltip
            prop="total_collect"
            width="150"
          >
          </el-table-column>
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
export default {
  data() {
    return {
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
    };
  },
  async created() {
    this.Statistic_GetMonthStatistics();
  },
  methods: {
    //最新数据
    async Statistic_GetMonthStatistics() {
      this.loading = true;
      const result = await axios.post("Statistic/GetMonthStatistics", {
        pageIndex: 0,
        pageSize: 0,
        ilist: [
          {
            title: "string",
            content: "string",
          },
        ],
      });
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
    //表格合计行
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        }
      });

      return sums;
    },
    //每页条数
    handleSizeChange(val) {
      this.pagesize = val;
      // const start = (this.current - 1) * this.pagesize;
      // // console.log(start);
      // const end = this.current * this.pagesize;
      // // console.log(end);
      // this.data = this.tableData.slice(start, end);
      this.Statistic_GetMonthStatistics();
    },
    //切换页码
    handleCurrentChange(val) {
      this.current = val;
      // const start = (val - 1) * this.pagesize;
      // // console.log(start);
      // const end = val * this.pagesize;
      // // console.log(end);
      // this.data = this.tableData.slice(start, end);
      this.Statistic_GetMonthStatistics();
    },
  },
};
</script>
<style lang="scss" scoped>
.system-bj-month {
  width: 430px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 23px;
  .el-date-editor {
    width: 300px !important;
  }
}
</style>