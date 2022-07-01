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
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="dashboard-sidebarLabel">管理選單</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <p>Try scrolling the rest of the page to see this option in action.</p>
    </div>
  </div>
</template>

<script>
import 'bootstrap/js/dist/offcanvas';

export default {};
</script>
