<template>
  <div>
    <span class="system-title">小区维护</span>
    <div class="system-bj">
      <div class="system-bj-newadd">
        <el-button type="primary" @click="newadd">新增</el-button>
      </div>
      <el-drawer title="新增" :visible.sync="newdrawer" size="780px">
        <el-form
          label-width="100px"
          :model="newresidence"
          :rules="rules"
          ref="newresidence"
          class="demo-ruleForm"
        >
          <el-form-item label="房管员" prop="administrator">
            <el-select
              clearable
              v-model="newresidence.administrator"
              placeholder="请选择活动区域"
            >
              <el-option
                v-for="item in newresidence.user_name"
                :key="item.user_id"
                :label="item.user_name"
                :value="item.user_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管辖小区" prop="residence_name">
            <el-select
              clearable
              v-model="newresidence.residence_name"
              placeholder="请选择活动区域"
            >
              <el-option
                v-for="item in residence.xiaoqu"
                :key="item.residence_id"
                :label="item.residence_name"
                :value="item.residence_name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="savenewresidence('newresidence')"
              >保 存</el-button
            >
            <el-button @click="newdrawer = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <el-drawer
        :visible.sync="editdrawer"
        :with-header="false"
        close-on-press-escape
        class="communityMaintenance"
      >
        <div class="header">
          <span>编辑</span>
          <i
            class="el-icon-close fontsize-20"
            @click="editdrawer = false"
            style="cursor: pointer"
          ></i>
        </div>
        <el-form
          :model="residence"
          :rules="rules"
          ref="residence"
          label-width="80px"
        >
          <el-form-item label="房管员">
            <el-select
              v-model="residence.user_name"
              disabled
              placeholder="请选择活动区域"
            >
            </el-select>
          </el-form-item>
          <el-form-item label="管辖小区" prop="residence_name">
            <el-select
              multiple
              placeholder="请选择文章标签"
              v-model="residence.residence_name"
            >
              <!-- <el-checkbox-group v-model="residence.residence_name"> -->
              <el-option
                v-for="item in residence.xiaoqu"
                :key="item.residence_id"
                :label="item.residence_name"
                :value="item.residence_name"
              >
                <div style="display: inline-block" @click="clickCheckbox">
                  <el-checkbox v-model="item.isCheck"></el-checkbox>
                </div>
              </el-option>
              <!-- </el-checkbox-group> -->
            </el-select>
          </el-form-item>
          <el-form-item
            label="管辖楼栋"
            v-show="residence.residence_name != ''"
          >
            <el-checkbox-group v-model="residence.checked">
              <el-checkbox
                v-for="item in residence.buildingList"
                :key="item.building_id"
                :label="item.building_no"
                :disabled="item.optional_state != 1"
                >{{ item.building_no }}</el-checkbox
              >
            </el-checkbox-group>
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
        <el-table-column prop="user_name" label="房管员"></el-table-column>
        <el-table-column prop="building_no" label="管辖范围"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" class="bj-btn" @click="editrow(scope.row)"
              >编辑</el-button
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
export default {
  data() {
    return {
      newdrawer: false,
      //抽屉
      editdrawer: false,
      //加载动画
      loading: false,
      //原表格数据
      tableData: [],
      //新表格数据
      data: [],
      // 每页数量
      pagesize: 10,
      //当前页
      current: 1,
      //总条数
      total: 0,
      newresidence: {
        administrator: "",
        user_name: [],
        residence_name: "",
      },
      residence: {
        //select小区名字
        residence_name: [],
        //管辖楼栋
        buildingList: [],
        // 管辖选中
        checked: [],
        //房管
        user_name: "",
        //select所有小区
        xiaoqu: [],
      },
      rules: {
        residence_name: [
          { required: true, message: "请选择一个小区", trigger: "change" },
        ],
        administrator: [
          { required: true, message: "请选择房管员", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.residence_set_GetList();
  },
  methods: {
    async residence_set_GetList() {
      this.loading = true;
      const result = await axios.post("residence_set/GetList", {
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
        //总数
        this.total = result.data.TotalRecords;
        this.data = this.tableData;
        this.loading = false;
      }
    },
    //select编辑按钮
    async editrow(row) {
      this.residence.residence_name = [];
      //抽屉
      this.editdrawer = true;
      //房管员
      this.residence.user_name = row.user_name;
      console.log(row);
      const result = await axios.post("residence_set/Detail", {
        user_id: row.user_id,
      });
      console.log(result);
      //管辖小区
      this.residence.residence_name.push(
        result.data.ResultList[0].residenceList[0].residence_name
      );
      this.residence.buildingList =
        result.data.ResultList[0].residenceList[0].buildingList;
      this.residence.checked.push(row.building_no);

      const res = await axios.post("residence_set/Query", {
        pageIndex: 0,
        pageSize: 0,
        ilist: [
          {
            title: "string",
            content: "string",
          },
        ],
      });
      console.log(res);
      this.residence.xiaoqu = res.data.ResultList;
    },
    newadd() {
      this.newdrawer = true;
      console.log(this.tableData);
      this.newresidence.user_name = this.tableData;
    },
    savenewresidence(newresidence) {
      this.$refs[newresidence].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // async queryXiaoqu() {
    //   // console.log(this.residence.residence_name);
    //   // this.residence.xiaoqu = [];
    //   const result = await axios.post("residence_set/Query", {
    //     pageIndex: 0,
    //     pageSize: 0,
    //     ilist: [
    //       {
    //         title: "string",
    //         content: "string",
    //       },
    //     ],
    //   });
    //   // console.log(result);
    //   // const obj = {};
    //   this.residence.xiaoqu = result.data.ResultList;
    //   console.log(this.residence.xiaoqu);
    // },
    //每页条数
    handleSizeChange(val) {
      this.pagesize = val;
      this.residence_set_GetListy();
    },
    //切换页码
    handleCurrentChange(val) {
      this.current = val;
      this.residence_set_GetList();
    },
  },
};
</script>

<style lang="scss" scoped>
.system-bj-newadd {
  margin-bottom: 20px;
}
</style>