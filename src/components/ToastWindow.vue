<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-header text-light"
    :class="[`bg-${msg.style}`, {'rounded': !msg.content}]">
      <!-- <img src="..." class="rounded me-2" alt="..."> -->
      <strong class="me-auto">{{msg.title}}</strong>
      <!-- <small class="text-muted">just now</small> -->
      <button type="button" class="btn-close btn-close-white"
      data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" v-if="msg.content">
      {{msg.content}}
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  props: {
    msg: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    const toast = new Toast(this.$refs.toast, {
      delay: 6000,
    });
    toast.show();
  },
};
</script>
