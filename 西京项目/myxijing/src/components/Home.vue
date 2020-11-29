<template>
  <div>
    <div class="container">
      <div id="daytime" class="home-title m-b-20">{{ nowTime }}</div>
      <div class="year-Beginning">年初应收：14788.2</div>
    </div>
    <el-row :gutter="20">
      <el-col :span="6"
        ><div
          class="grid-content"
          style="background: linear-gradient(138deg, #499bfe, #377cfc)"
        >
          <div class="padding20 year_receivable">
            <div class="m-b-10 fontsize-14">今年应收</div>
            <div class="fontsize-20" style="font-weight: bold">
              {{ hometitle.yearReceivable }}
            </div>
          </div>
          <div class="padding20 year_income">
            <div class="m-b-10 fontsize-14">今年实收</div>
            <div class="fontsize-20" style="font-weight: bold">
              {{ hometitle.yearIncome }}
            </div>
            <div id="main" style="width: 100px; height: 100px"></div>
          </div></div
      ></el-col>
      <el-col :span="6">
        <div
          class="grid-content"
          style="background: linear-gradient(135deg, #a08afb, #684ceb)"
        >
          <div class="padding20 month_income">
            <div class="m-b-10 fontsize-14">当月实收</div>
            <div class="fontsize-20" style="font-weight: bold">
              {{ hometitle.monthReceivable }}
            </div>
          </div>
          <div class="padding20 month_households">
            <div class="shawdow"></div>
            <div class="m-b-10 fontsize-14">月收户数</div>
            <div class="fontsize-20" style="font-weight: bold">
              {{ hometitle.monthIncome }}
            </div>
          </div>
        </div></el-col
      >
      <el-col :span="6"
        ><div
          class="grid-content"
          style="background: linear-gradient(130deg, #17c1ff, #1499ff)"
        >
          <div class="padding20 year_Arrears">
            <div class="m-b-10 fontsize-14">2020年累计欠费</div>
            <div class="fontsize-20" style="font-weight: bold">0</div>
          </div>
          <div class="padding20 recovery_Arrears">
            <div class="shawdow"></div>
            <div class="m-b-10 fontsize-14">追缴欠费金额</div>
            <div class="fontsize-20" style="font-weight: bold">0</div>
          </div>
        </div></el-col
      >
      <el-col :span="6"
        ><div
          class="grid-content"
          style="background: linear-gradient(317deg, #0b83ca, #03b8d1)"
        >
          <div class="padding20 year_presale">
            <div class="m-b-10 fontsize-14">年预收</div>
            <div class="fontsize-20" style="font-weight: bold">0</div>
          </div>
          <div class="padding20 month_presale">
            <div class="shawdow"></div>
            <div class="m-b-10 fontsize-14">月预收户数</div>
            <div class="yy"></div>
          </div></div
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16"
        ><div class="grid-content">
          <Annualcollectuion></Annualcollectuion></div
      ></el-col>
      <el-col :span="8"
        ><div class="grid-content fgysjqk">
          <div class="title">房管员收缴情况</div>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script>
import time from "../assets/js/time";
import axios from "axios";
import echarts from "echarts";
import Annualcollectuion from "./Annualcollection";
export default {
  data() {
    return {
      //现在时间
      nowTime: "",
      hometitle: {
        //今年应收
        yearReceivable: 0,
        //今年实收
        yearIncome: 0,
        //月收户数
        monthReceivable: 0,
        //当月实收
        monthIncome: 0,
      },
    };
  },
  components: {
    Annualcollectuion,
  },
  async created() {
    setInterval(() => {
      const res = time.getTime().dayTime("daytime");
      this.nowTime = res;
    }, 500);
    const result = await axios.post("Statistic/HomePageTopleft");
    // console.log(result);
    this.hometitle.yearReceivable = result.data.ResultList[0].year_receivable;
    this.hometitle.yearIncome = result.data.ResultList[0].year_income;
  },
  mounted() {
    const option = {
      tooltip: {
        backgroundColor: "white",
        textStyle: {
          color: "black",
        },
      },
      series: [
        {
          type: "pie",
          radius: ["90%", "70%"],
          avoidLabelOverlap: true,
          hoverOffset: 15,
          width: "100%",
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold",
            },
          },
          data: [
            {
              name: "1",
              value: 223,
              itemStyle: {
                color: "#e3e3e3",
              },
            },
            {
              name: "2",
              value: 83,
              itemStyle: {
                color: "rgba(0,0,255,0.5)",
              },
            },
          ],
        },
      ],
    };

    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById("main"));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.month_households,
.recovery_Arrears,
.month_presale {
  position: relative;
}
.shawdow {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff;
  opacity: 0.1;
}
.month_presale .yy {
  display: inline-block;
  width: 148px;
  height: 22px;
  background: linear-gradient(265deg, hsla(0, 0%, 100%, 0.1), #fff);
}
#main {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.year_income {
  position: relative;
}
.home-title {
  display: block;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.padding20 {
  padding: 20px;
  color: white;
}
.fgysjqk {
  padding: 30px;
  background-color: #fff;
}
</style>