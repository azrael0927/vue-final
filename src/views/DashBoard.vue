<template>
  <NavBar />
  <div class="container position-relative">
    <ToastMessages />
    <div class="d-flex fs-1 mt-5 text-center" v-if="$route.fullPath === '/dashboard'">
      <router-link to="/dashboard/adminproducts" class="nav-link p-5 mb-3 bg-secondary text-light">
        <i class="bi bi-columns-gap d-block mb-3 mt-5"></i>
        <div class="mt-3 mb-5">商品管理</div>
      </router-link>
      <router-link to="/dashboard/admincoupons" class="nav-link p-5 mb-3 bg-secondary text-light">
        <i class="bi bi-ticket-detailed d-block mb-3 mt-5"></i>
        <div class="mt-3 mb-5">優惠管理</div>
      </router-link>
      <a href="#" class="nav-link p-5 mb-3 bg-secondary text-light">
        <i class="bi bi-file-text d-block mb-3 mt-5"></i>
        <div class="mt-3 mb-5">訂單管理</div>
      </a>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.d-flex {
  flex-wrap: wrap;
}
.d-flex a {
  width: 30%;
  margin: 0 1.666%;
  border: 5px solid #000;
  transition: all 0.3s;
}
.d-flex a:hover {
  background: rgb(226, 226, 226) !important;
  color: rgb(56, 56, 56) !important;
  font-weight: bold;
  box-shadow: 0.2em 0.2em 5px rgb(36, 36, 36);
}

@media (max-width: 992px) {
  .d-flex a {
    width: 45%;
  }
}
@media (max-width: 500px) {
  .d-flex {
    justify-content: center;
    flex-direction: column;
  }
  .d-flex a {
    width: 95%;
    margin: 0 auto;
  }
}
</style>

<script>
import NavBar from '../components/NavBar.vue';
import ToastMessages from '../components/ToastMessages.vue';
import emitter from '../methods/emitter';
import updateToast from '../methods/updateToast';

export default {
  components: {
    NavBar,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
      updateToast,
    };
  },
};
</script>
