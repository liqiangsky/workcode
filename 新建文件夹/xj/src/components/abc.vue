<template>
  <div>
    <el-form :model="residence" label-width="80px">
      <el-form-item label="管辖小区">
        <el-select
          multiple
          placeholder="请选择文章标签"
          v-model="residence.residence_name"
          @change="handleWeekChange"
        >
          <el-option
            v-for="item in residence.xiaoqu"
            :key="item.residence_id"
            :label="item.residence_name"
            :value="item.residence_name"
          >
            <div style="display: inline-block" @click="clickCheckbox">
              <el-checkbox
                v-model="item.isCheck"
                :label="item.residence_name"

              ></el-checkbox>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      residence: {
        residence_name: [],
        xiaoqu: [
          { residence_id: 1, residence_name: "111111", isCheck: false },
          { residence_id: 2, residence_name: "222222", isCheck: false },
          { residence_id: 3, residence_name: "333333", isCheck: false },
          { residence_id: 4, residence_name: "444444", isCheck: false },
        ],
      },
    };
  },
  methods: {
    clickCheckbox(e) {
      e.preventDefault();
    },
    handleWeekChange(val) {
      this.residence.xiaoqu.forEach((item) => {
        item.isCheck = false;
      });
      console.log(val);
      val.forEach((el) => {
        this.residence.xiaoqu.forEach((v) => {
          if (el == v.residence_name) {
            v.isCheck = true;
          }
        });
      });
    },
  },
};
</script>