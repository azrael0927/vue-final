<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">試試看</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">Link</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">後台管理</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
          <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';

export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          this.$router.push('/login');
          console.log(res.data.success);
        }
      });
    },
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)vf-token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.defaults.headers.common.Authorization = token;
    this.$http.post(api).then((res) => {
      if (!res.data.success) {
        this.$router.push('/login');
      }
    });
  },
};
</script>
