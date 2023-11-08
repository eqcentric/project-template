<template>
  <div>
    <nav class="navbar bg-dark border-bottom border-bottom-dark navbar-expand-lg" data-bs-theme="dark">
      <div class="container-fluid">
      <a class="logo p-1 px-3" href="/#/">
        <img src="https://uploads-ssl.webflow.com/6075c27738665c833a39fd83/608566aaabf4b474f887440f_Light.svg" width="100" alt="" class="header-logo logo-icon">
      </a>
      </div>
    </nav>
    <div class="container mt-5">
      <slot/>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style>
.logo path {
  fill: #fff;
}
</style>