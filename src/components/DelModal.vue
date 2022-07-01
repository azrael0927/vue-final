<template>
  <div
    class="modal fade"
    id="Modal"
    tabindex="-1"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="ModalLabel">刪除商品</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          確定刪除 <span class="text-danger fw-bold fs-2">{{tempItem.title}}</span> ???
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">確認</button>
          <button type="button" class="btn btn-danger"
          @click="$emit('del-item', tempItem)">
            <div class="spinner-grow spinner-grow-sm text-light"
            role="status" v-if="del">
              <span class="visually-hidden">Loading...</span>
            </div>
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from '../mixins/ModalMixin';

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    del: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  watch: {
    item() {
      this.tempItem = { ...this.item };
    },
  },
  data() {
    return {
      modal: {},
      tempItem: {},
    };
  },
  mixins: [ModalMixin],
};
</script>
