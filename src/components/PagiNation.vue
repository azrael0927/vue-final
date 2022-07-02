<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{'disabled': !pages.has_pre}">
        <a class="page-link" href="#" aria-label="Previous"
        @click.prevent="$emit('change-page', pages.current_page-1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
      v-for="item in pages.total_pages" :key="item" >
        <a class="page-link text-dark"
        :class="{'active' : item === pages.current_page}"
        @click.prevent="$emit('change-page', item)"
        href="#">{{item}}</a>
      </li>
      <li class="page-item" :class="{'disabled': !pages.has_next}">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent="$emit('change-page', pages.current_page+1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  .active{
    background-color: black;
    color:white !important;
    font-weight: bold;
  }
</style>

<script>
export default {
  props: {
    pages: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
