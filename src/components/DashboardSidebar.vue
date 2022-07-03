<template>
  <button
    class="btn btn-secondary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#dashboard-sidebar"
    aria-controls="dashboard-sidebar"
  >
    管理選單
  </button>
  <div
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    tabindex="-1"
    id="dashboard-sidebar"
    aria-labelledby="dashboard-sidebarLabel"
  >
    <div class="offcanvas-header bg-dark text-light fw-bold">
      <h5 class="offcanvas-title fw-bold" id="dashboard-sidebarLabel">管理選單</h5>
      <button
        type="button"
        class="btn-close btn-close-white text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <router-link to="/dashboard/adminproducts"
      class="d-block fs-4 text-decoration-none p-2 text-dark border-bottom">
        <i class="bi bi-columns-gap"></i>
        商品管理
      </router-link>
      <router-link to="/dashboard/admincoupons"
      class="d-block fs-4 text-decoration-none p-2 text-dark border-bottom">
        <i class="bi bi-ticket-detailed"></i>
        優惠管理
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.offcanvas-body a{
  transition: all .3s;
}
.offcanvas-body a:hover, .active{
  color: white !important;
  font-size: 2rem !important;
  text-shadow: 0.1em 0.1em 0.3em black;
}
</style>
<script>
import 'bootstrap/js/dist/offcanvas';

export default {};
</script>
