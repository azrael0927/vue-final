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
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="ModalLabel">新增優惠券</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
            <div class="col-lg-6">
              <label for="title" class="d-block">
                優惠券名稱
                <input
                  type="text"
                  id="title"
                  class="form-control"
                  placeholder="請輸入名稱"
                  v-model="tempCoupon.title"
                />
              </label>
            </div>
            <div class="col-lg-6">
              <label for="code" class="d-block">
                優惠碼
                <input
                  type="text"
                  id="code"
                  class="form-control"
                  placeholder="請輸入優惠碼"
                  v-model="tempCoupon.code"
                />
              </label>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-lg-6">
              <label for="percent" class="d-block">
                優惠折扣
                <input
                  type="number"
                  id="percent"
                  class="form-control"
                  placeholder="請輸入折扣"
                  v-model="tempCoupon.percent"
                />
              </label>
            </div>
            <div class="col-lg-6">
              <label for="due_date" class="d-block">
                到期日
                <input type="date" id="due_date" class="form-control" v-model="due_date" />
              </label>
            </div>
          </div>
          <label for="is_enabled">
            <input type="checkbox" class="form-check-input me-2" id="is_enabled"
            :true-value='1' :false-value='0' v-model="tempCoupon.is_enabled">
            啟用
          </label>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="
              tempCoupon = {};
              due_date = '';
            "
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-coupon', tempCoupon)">
            送出
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
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    coupon() {
      this.tempCoupon = { ...this.coupon };
      this.due_date = '';
      if (this.coupon.id) {
        [this.due_date] = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      }
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  data() {
    return {
      modal: {},
      tempCoupon: {},
      due_date: '',
    };
  },
  mixins: [ModalMixin],
};
</script>
