<template>
  <div class="container">
    <h2 class="text-center">請先登入</h2>
    <form class="login-window border border-3 shadow rounded p-4 mt-3" @submit.prevent="signin">
      <div class="mb-3">
        <label for="email" class="form-label d-block mt-1">
          E-mail address
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="請輸入E-Mail"
            required
            v-model="user.username"
          />
        </label>
      </div>
      <div class="mb-5">
        <label for="password" class="form-label d-block mt-1">
          密碼
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="請輸入密碼"
            required
            v-model="user.password"
          />
        </label>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <label for="remeberMe">
          <input
            type="checkbox"
            name=""
            id="remeberMe"
            class="form-check-input"
            ref="remeberCheck"
            @change="remeberMe"
          />
          記住我
        </label>
        <button type="sumbit" class="btn btn-dark">登入</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.login-window {
  width: 400px;
}
</style>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `vf-token=${token}; expires=${new Date(expired)}`;
          this.$router.push('/dashboard');
        }
      });
    },
    remeberMe() {
      if (this.$refs.remeberCheck.checked) {
        document.cookie = `vf-remeber=${JSON.stringify(this.user)}; expires=7`;
      } else {
        document.cookie = 'vf-remeber=; expires=-1';
      }
    },
  },
  mounted() {
    const vfCookie = document.cookie.replace(/(?:(?:^|.*;\s*)vf-remeber\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (vfCookie) {
      this.$refs.remeberCheck.checked = true;
      this.user = JSON.parse(vfCookie);
    }
  },
};
</script>
