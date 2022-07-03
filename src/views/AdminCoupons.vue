<template>
  <VueLoading :active="isLoading">
    <div class="loadingio-spinner-blocks-dbv0930aozc">
      <div class="ldio-wr2c4yrnhni">
        <div style="left: 38px; top: 38px; animation-delay: 0s"></div>
        <div style="left: 80px; top: 38px; animation-delay: 0.125s"></div>
        <div style="left: 122px; top: 38px; animation-delay: 0.25s"></div>
        <div style="left: 38px; top: 80px; animation-delay: 0.875s"></div>
        <div style="left: 122px; top: 80px; animation-delay: 0.375s"></div>
        <div style="left: 38px; top: 122px; animation-delay: 0.75s"></div>
        <div style="left: 80px; top: 122px; animation-delay: 0.625s"></div>
        <div style="left: 122px; top: 122px; animation-delay: 0.5s"></div>
      </div>
    </div>
  </VueLoading>
  <div class="d-flex">
    <DashboardSidebar />
    <h3 class="fs-2 fw-bold">優惠管理</h3>
    <button class="btn btn-dark" @click="openCouponModal">新增優惠券</button>
  </div>
  <div class="table-responsive">
    <table class="table table-striped text-center">
      <thead>
        <tr>
          <th>名稱</th>
          <th>優惠</th>
          <th>優惠碼</th>
          <th>到期日</th>
          <th>啟用</th>
          <th class="col-lg-2">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.code}}</td>
          <td>{{$filter.date(item.due_date)}}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td class="">
            <div class="btn-group" role="group" aria-label="Basic mixed styles">
              <button type="button" class="btn btn-outline-dark"
              @click="openCouponModal(item)">編輯</button>
              <button type="button" class="btn btn-outline-danger"
              @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CouponModal
  :coupon="tempCoupon"
  @update-coupon="updateCoupon"
  ref="couponModal"/>
  <DelModal
  :item="tempCoupon"
  :del="isDel"
  @del-item="delCoupon"
  ref="delModal"
  />
  <PagiNation
  :pages="pagination"
  @change-page="getCoupons"
  />
</template>

<style scoped>
  .d-flex{
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
  }
  @media (max-width: 992px) {
    table{
      width:992px;
    }
  }
</style>

<script>
import DashboardSidebar from '../components/DashboardSidebar.vue';
import CouponModal from '../components/CouponModal.vue';
import DelModal from '../components/DelModal.vue';
import PagiNation from '../components/PagiNation.vue';

export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isLoading: false,
      isDel: false,
    };
  },
  components: {
    DashboardSidebar,
    CouponModal,
    DelModal,
    PagiNation,
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.coupons = [...res.data.coupons];
          this.pagination = { ...res.data.pagination };
        }
        this.isLoading = false;
      });
    },
    openCouponModal(item) {
      console.log(item.id);
      if (item.id) this.tempCoupon = { ...item };
      else this.tempCoupon = {};
      this.$refs.couponModal.show();
    },
    updateCoupon(item) {
      this.tempCoupon = item;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = 'post';
      if (item.id) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        httpMethod = 'put';
      }
      this.isLoading = true;
      this.$http[httpMethod](api, { data: this.tempCoupon }).then((res) => {
        if (res.data.success) {
          this.getCoupons();
        }
        console.log(res);
        this.isLoading = false;
        this.$refs.couponModal.hide();
      });
    },
    openDelModal(item) {
      this.tempCoupon = item;
      this.$refs.delModal.show();
    },
    delCoupon(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
      this.isDel = true;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.getCoupons();
        }
        this.isDel = false;
        this.$refs.delModal.hide();
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
