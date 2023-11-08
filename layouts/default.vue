<template>
  <div>
    <nav class="navbar bg-dark border-bottom border-bottom-dark navbar-expand-lg" data-bs-theme="dark">
      <div class="container-fluid">
      <a class="logo p-1 px-3" href="/#/">
        <img src="https://uploads-ssl.webflow.com/6075c27738665c833a39fd83/608566aaabf4b474f887440f_Light.svg" width="100" alt="" class="header-logo logo-icon">
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <nuxt-link
                class="nav-link"
                aria-current="page"
                :to="`/`">
              Connections
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
                class="nav-link"
                aria-current="page"
                :to="`/callouts`">
              Callouts
            </nuxt-link>
          </li>
        </ul>
      </div>

      </div>
    </nav>
    <div class="container mt-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" :class="{ active: !$route.params.connection }"><nuxt-link to="/">Home</nuxt-link></li>
          <li class="breadcrumb-item" :class="{ active: !$route.params.organization }"  v-if="!!$route.params.connection">
            <nuxt-link v-if="$route.params.organization" :to="`/connections/${$route.params.connection}`">Connection</nuxt-link>
            <span v-else>Connection</span>
          </li>
          <li class="breadcrumb-item active" v-if="!!$route.params.organization">Mappings</li>
        </ol>
      </nav>
      <slot/>
    </div>
  </div>
</template>
<script setup lang="ts">

  // const { signOut } = useAuth()

</script>

<style>
.logo path {
  fill: #fff;
}
</style>