<template>
  <div>
    <div id="main1"></div>
  </div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";
export default {
  data() {
    return {
      annualcollection: {
        month_receivable: [],
        month_income: [],
        month_arrears: [],
      },
    };
  },
  async mounted() {
    const result = await axios.post("Statistic/HomePageBottom");
    console.log(result);
    if (result.status == 200 && result.data.Result == 1) {
      result.data.ResultList.forEach((item) => {
        this.annualcollection.month_receivable.push(item.month_receivable);
        this.annualcollection.month_income.push(item.month_income);
        this.annualcollection.month_arrears.push(item.month_arrears);
      });
    }
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      backgroundColor: "#fff",
      legend: {
        top: 30,
        right: 110,
        data: ["应收", "实收", "欠收"],
      },
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
      ],
      yAxis: {
        type: "value",
        name: "年收缴完成度",
        axisLabel: {
          formatter: "{value} 元",
        },
      },
      series: [
        {
          name: "应收",
          type: "line",
          data: this.annualcollection.month_receivable,
          itemStyle: {
            color: "#A3A1FB",
            borderColor: "#fff",
          },
        },
        {
          name: "实收",
          type: "bar",
          stack: "one",
          data: this.annualcollection.month_income,
          itemStyle: {
            color: "#4392FF",
            barBorderRadius: 4,
          },
          barWidth: "40%",
        },
        {
          name: "欠收",
          type: "bar",
          stack: "one",
          data: this.annualcollection.month_arrears,
          itemStyle: {
            color: "#D6E6FF",
            barBorderRadius: 4,
          },
          barWidth: "40%",
        },
      ],
    };
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById("main1"));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>
<style lang="scss" scoped>
#main1 {
  width: 100%;
  height: 600px;
}
</style>