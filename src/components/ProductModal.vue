<template>
  <div
    class="modal fade"
    id="Modal"
    tabindex="-1"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-light">
          <h5 class="modal-title" id="ModalLabel">新增商品</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-4">
              <div class="imgsUrl overflow-auto" v-if="tempProduct.imagesUrl">
                <div
                  class="input-group mb-3"
                  v-for="(item, index) in tempProduct.imagesUrl"
                  :key="index"
                >
                  <span class="input-group-text bg-dark text-light">圖片{{ index + 1 }}</span>
                  <input
                    type="text"
                    class="form-control"
                    :value="item"
                    disabled
                    aria-label="Amount"
                  />
                  <span class="input-group-text bg-danger" @keydown="delUrl" @click="delUrl(index)">
                    <i class="bi bi-x-lg text-dark fw-bold"></i>
                  </span>
                </div>
              </div>
              <div class="mb-3">
                <label for="imgUrl" class="d-block mb-2">
                  上傳圖片網址
                  <input
                    type="text"
                    id="imgUrl"
                    class="form-control mt-1"
                    placeholder="請輸入圖片網址"
                    ref="imgInput"
                  />
                </label>
                <div class="text-end">
                  <button class="btn btn-dark" @click="addImgUrl">上傳</button>
                </div>
              </div>
              <label for="imgFile" class="d-block mb-3">
                上傳圖片檔案
                <input
                  type="file"
                  id="imgFile"
                  class="form-control mt-1"
                />
              </label>
              <div class="imgs p-3 mt-4 border position-relative"
              v-if="tempProduct.imagesUrl">
                <div class="position-absolute bg-white px-1">
                  請點擊以選擇封面圖片
                </div>
                <div class="overflow-auto">
                  <label class="d-inline-flex p-2 border-3 rounded flex-column bg-transparent"
                  :class="{'border': tempProduct.imageUrl === item}"
                  :for="index" v-for="(item, index) in tempProduct.imagesUrl" :key="index">
                    圖片{{index+1}}
                    <input type="radio" name="selectPic" class="d-none" :id="index" :value="item"
                    v-model="tempProduct.imageUrl">
                    <img :src="item" alt="">
                  </label>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="row mb-3">
                <div class="col">
                  <label for="title" class="d-block">
                    商品名稱
                    <input type="text" id="title" class="form-control"
                    placeholder="請輸入名稱" v-model="tempProduct.title">
                  </label>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="category" class="d-block">
                    商品分類
                    <input type="text" id="category" class="form-control"
                    placeholder="請輸入分類" v-model="tempProduct.category">
                  </label>
                </div>
                <div class="col-md-6">
                  <label for="unit" class="d-block">
                    商品單位
                    <input type="text" id="unit" class="form-control"
                    placeholder="請輸入單位" v-model="tempProduct.unit">
                  </label>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="origin_price" class="d-block">
                    商品原價
                    <input type="number" id="origin_price" class="form-control"
                    placeholder="請輸入原價" v-model="tempProduct.origin_price">
                  </label>
                </div>
                <div class="col-md-6">
                  <label for="price" class="d-block">
                    商品售價
                    <input type="number" id="price" class="form-control"
                    placeholder="請輸入售價" v-model="tempProduct.price">
                  </label>
                </div>
              </div>
              <hr>
              <label for="description" class="d-block mb-3">
                商品描述
                <textarea name="" id="description" class="form-control" placeholder="請輸入商品描述"
                v-model="tempProduct.description"></textarea>
              </label>
              <label for="content" class="d-block mb-3">
                商品內容
                <textarea name="" id="content" class="form-control" placeholder="請輸入商品內容"
                v-model="tempProduct.content"></textarea>
              </label>
                <label class="form-check-label" for="is_enabled">
                  <input class="form-check-input me-2" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempProduct.is_enabled"
                  id="is_enabled">
                  啟用
                </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary"
          @click="$emit('update-product', tempProduct)">送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.imgsUrl {
  max-height: 100px;
}
.bi-x-lg {
  cursor: pointer;
}
.imgs {
  max-height: 200px;
}
.position-absolute{
  top: 0;
  left: 5%;
  transform: translateY(-50%);
}
.overflow-auto{
  max-height: 165px;
}
.imgs label{
  max-width: 30%;
  margin: 5px 1%;
  padding: 0.6666%;
}
</style>

<script>
import ModalMixin from '../mixins/ModalMixin';

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    product() {
      this.tempProduct = { ...this.product };
    },
  },
  data() {
    return {
      modal: {},
      tempProduct: {},
    };
  },
  mixins: [ModalMixin],
  methods: {
    addImgUrl() {
      if (this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl.push(this.$refs.imgInput.value);
      } else {
        this.tempProduct.imagesUrl = [];
        this.tempProduct.imagesUrl.push(this.$refs.imgInput.value);
      }
      this.$refs.imgInput.value = '';
    },
    delUrl(index) {
      this.tempProduct.imagesUrl.splice(index, 1);
    },
  },
};
</script>
