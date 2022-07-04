<template>
  <div class="toast-container position-absolute top-0 end-0">
    <ToastWindow v-for="(item, index) in messages" :key="index" :msg="item"/>
  </div>
</template>

<script>
import ToastWindow from './ToastWindow.vue';

export default {
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  components: { ToastWindow },
  mounted() {
    this.emitter.on('message', (msg) => {
      const { style = 'success', title, content } = msg;
      this.messages.push({ style, title, content });
    });
  },
};
</script>
