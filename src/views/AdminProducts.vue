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
    <h3 class="fs-2 fw-bold">商品管理</h3>
    <button class="btn btn-dark" @click="openProductModal">新增商品</button>
  </div>
  <div class="table-responsive">
    <table class="table table-striped text-center">
      <thead>
        <tr>
          <th>分類</th>
          <th class="col-4">品名</th>
          <th>原價</th>
          <th>售價</th>
          <th>啟用</th>
          <th class="col-lg-2">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td>{{$filter.currency(item.origin_price)}}</td>
          <td>{{$filter.currency(item.price)}}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td class="">
            <div class="btn-group" role="group" aria-label="Basic mixed styles">
              <button type="button" class="btn btn-outline-dark"
              @click="openProductModal(item)">編輯</button>
              <button type="button" class="btn btn-outline-danger"
              @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <DelModal
  :item="tempProduct"
  :del="isDel"
  @del-item="delProduct"
  ref="delModal"/>
  <ProductModal
  :product="tempProduct"
  @update-product="updateProduct"
  ref="productModal"
  />
  <PagiNation
  :pages="pagination"
  @change-page="getProducts"
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
import ProductModal from '../components/ProductModal.vue';
import DelModal from '../components/DelModal.vue';
import PagiNation from '../components/PagiNation.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isLoading: false,
      isDel: false,
    };
  },
  components: {
    DashboardSidebar,
    ProductModal,
    DelModal,
    PagiNation,
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = [...res.data.products];
          this.pagination = { ...res.data.pagination };
        }
        this.isLoading = false;
      });
    },
    openProductModal(item) {
      if (item.id) this.tempProduct = { ...item };
      else this.tempProduct = {};
      this.$refs.productModal.show();
    },
    updateProduct(item) {
      this.tempProduct = item;
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      if (item.id) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      this.isLoading = true;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        if (res.data.success) {
          this.getProducts();
        }
        this.$refs.productModal.hide();
        this.isLoading = false;
      });
    },
    openDelModal(item) {
      this.tempProduct = item;
      this.$refs.delModal.show();
    },
    delProduct(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      this.isDel = true;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.getProducts();
        }
        this.$refs.delModal.hide();
        this.isDel = false;
      });
      console.log(item);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
