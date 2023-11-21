<template>
  <div class="card">
    <div class="card-body">
      <p>Company name: {{ connection.Name }}</p>
      <p>Company email: {{ connection.Email }}</p>

      <ul class="nav nav-underline">
        <li class="nav-item">
          <nuxt-link
              class="nav-link"
              :class="{ active: route.name === 'connections-connection' }"
              aria-current="page"
              :to="`/connections/${connection.id}`">
            Assets
          </nuxt-link>
          <nuxt-link
              class="nav-link"
              :class="{ active: route.name === 'connections-connection-statuses' }"
              aria-current="page"
              :to="`/connections/${connection.id}/statuses`">
            Assets
          </nuxt-link>
        </li>
      </ul>

      <nuxt-page/>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
definePageMeta({
  // middleware: ['auth']
})
const { data: connection } = await useAsyncData('connection', () => {
  return $fetch('/api/connections/'+route.params['connection'])
})
</script>

