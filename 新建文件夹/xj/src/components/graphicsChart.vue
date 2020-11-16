<template>
  <div>
    <div :id="id"  :option="option"></div>
  </div>
</template>

<script>
  import HighCharts from 'highcharts'
//   import Highcharts from 'highcharts/highstock';
// import HighchartsMore from 'highcharts/highcharts-more';
// import HighchartsDrilldown from 'highcharts/modules/drilldown';
// import Highcharts3D from 'highcharts/highcharts-3d';
// import Highmaps from 'highcharts/modules/map';

// HighchartsMore(Highcharts)
// HighchartsDrilldown(Highcharts);
// Highcharts3D(Highcharts);
// Highmaps(Highcharts);
  export default {
    name:'graphicsChart',
    // 验证类型
    props: {
      id: {
        type: String
      },
      option: {
        type: Object
      }
    },
    watch: {
      option () {
        HighCharts.chart(this.id,this.option);
      }
    },
    mounted() {
      HighCharts.chart(this.id,this.option)
    }
  }
</script>

<style scoped>

</style>