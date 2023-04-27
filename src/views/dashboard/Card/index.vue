<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥126560">
            <template slot="charts">
              <span>周同比 56.67%
                <svg t="1680611671612" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="5499" width="16" height="16">
                  <path
                    d="M851.2 358.4l-316.8-256c-12.8-9.6-28.8-9.6-41.6 0l-320 256c-9.6 9.6-16 22.4-9.6 35.2 6.4 12.8 16 22.4 32 22.4H352v224c0 19.2 12.8 32 32 32h256c19.2 0 32-12.8 32-32v-224h156.8c12.8 0 25.6-9.6 28.8-22.4 6.4-12.8 3.2-25.6-6.4-35.2zM640 864h-256c-19.2 0-32 12.8-32 32s12.8 32 32 32h256c19.2 0 32-12.8 32-32s-12.8-32-32-32zM640 736h-256c-19.2 0-32 12.8-32 32s12.8 32 32 32h256c19.2 0 32-12.8 32-32s-12.8-32-32-32z"
                    fill="#d81e06" p-id="5500"></path>
                </svg></span>
              <span>日同比 19.16%
                <svg t="1680611914183" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="18608" width="16" height="16">
                  <path d="M392.448255 0h238.494873v635.98633h-238.494873z" p-id="18609" fill="#1afa29"></path>
                  <path
                    d="M495.00105 1016.783145L155.543347 677.325441A23.849487 23.849487 0 0 1 172.237988 635.98633h678.915407a23.849487 23.849487 0 0 1 16.694641 41.339111l-338.662721 339.457704a23.849487 23.849487 0 0 1-34.184265 0z"
                    p-id="18610" fill="#1afa29"></path>
                  <path d="M392.448255 0h238.494873v635.98633h-238.494873z" p-id="18611" fill="#1afa29"></path>
                  <path
                    d="M495.00105 1016.783145L155.543347 677.325441A23.849487 23.849487 0 0 1 172.237988 635.98633h678.915407a23.849487 23.849487 0 0 1 16.694641 41.339111l-338.662721 339.457704a23.849487 23.849487 0 0 1-34.184265 0z"
                    p-id="18612" fill="#1afa29"></path>
                </svg></span>
            </template>
            <template slot="footer">
              <span>日销售量￥12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="总访问量" count="88460">
            <template slot="charts">
              <lineChart></lineChart>
            </template>
            <template slot="footer">
              <span>日访问量1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <barChart></barChart>
            </template>
            <template slot="footer">
              <span>转化率65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <progressChart></progressChart>
            </template>
            <template slot="footer">
              <span>周同比 12%
                <svg t="1680611671612" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="5499" width="16" height="16">
                  <path
                    d="M851.2 358.4l-316.8-256c-12.8-9.6-28.8-9.6-41.6 0l-320 256c-9.6 9.6-16 22.4-9.6 35.2 6.4 12.8 16 22.4 32 22.4H352v224c0 19.2 12.8 32 32 32h256c19.2 0 32-12.8 32-32v-224h156.8c12.8 0 25.6-9.6 28.8-22.4 6.4-12.8 3.2-25.6-6.4-35.2zM640 864h-256c-19.2 0-32 12.8-32 32s12.8 32 32 32h256c19.2 0 32-12.8 32-32s-12.8-32-32-32zM640 736h-256c-19.2 0-32 12.8-32 32s12.8 32 32 32h256c19.2 0 32-12.8 32-32s-12.8-32-32-32z"
                    fill="#d81e06" p-id="5500"></path>
                </svg></span>
              <span>日同比 15%
                <svg t="1680611914183" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="18608" width="16" height="16">
                  <path d="M392.448255 0h238.494873v635.98633h-238.494873z" p-id="18609" fill="#1afa29"></path>
                  <path
                    d="M495.00105 1016.783145L155.543347 677.325441A23.849487 23.849487 0 0 1 172.237988 635.98633h678.915407a23.849487 23.849487 0 0 1 16.694641 41.339111l-338.662721 339.457704a23.849487 23.849487 0 0 1-34.184265 0z"
                    p-id="18610" fill="#1afa29"></path>
                  <path d="M392.448255 0h238.494873v635.98633h-238.494873z" p-id="18611" fill="#1afa29"></path>
                  <path
                    d="M495.00105 1016.783145L155.543347 677.325441A23.849487 23.849487 0 0 1 172.237988 635.98633h678.915407a23.849487 23.849487 0 0 1 16.694641 41.339111l-338.662721 339.457704a23.849487 23.849487 0 0 1-34.184265 0z"
                    p-id="18612" fill="#1afa29"></path>
                </svg></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail/index.vue'
import lineChart from './lineChart'
import barChart from './barChart'
import progressChart from './progressChart'
export default {
  components: {
    Detail,
    lineChart,
    barChart,
    progressChart
  }
}
</script>

<style scoped></style>