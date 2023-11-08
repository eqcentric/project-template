<template>
  <div class="card">
    <div class="card-body" v-if="connections && connections.length">
      <div class="mb-5 text-end">
        <a
            :href="oauthLink"
            class="btn btn-primary">
          Connect new system
        </a>
      </div>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">Connection Name</th>
        <th scope="col">Email</th>
        <th scope="col">System</th>
        <th scope="col">Webhooks</th>
        <th scope="col">Status</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="rec in connections">
          <td><nuxt-link :to="`/connections/${rec.id}`">{{ rec['Name'] }}</nuxt-link></td>
          <td>{{ rec['Email'] }}</td>
          <td>{{ rec['Provider'] }}</td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input"
                     @change="toggle(rec)"
                     v-model="rec['Enabled']"
                     type="checkbox"
                     role="switch"
                     id="flexSwitchCheckDefault"
              >
              <label class="form-check-label" for="flexSwitchCheckDefault">Enabled</label>
            </div>
          </td>
          <td>
            <div v-if="rec['Sync Status'] !== 'done'">
              <div class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">...</span>
              </div>
              <span v-if="!rec['Sync Status']">Initializing</span>
              <span class="text-success" v-else>Sync in progress...</span>
            </div>
            <span v-else>
              Ready
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="card-body text-center py-5" v-else>
      <p class="lead py-3">
        <strong>You don't have any connections yet.</strong>
      </p>
      <a
          :href="oauthLink"
          class="btn btn-primary">
        Connect new system
      </a>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'

  definePageMeta({
    middleware: ['auth']
  })

  const appConfig = useAppConfig()

  const oauthLink = 'https://link.makini.io/oauth/authorize'+
      `?client_id=${appConfig.clientId}` +
      `&redirect_uri=${encodeURIComponent(appConfig.redirectUri)}` +
      '&response_type=code'

  const { data: connections, error } = useAsyncData('connections', async () => {
    return $fetch('/api/connections')
  })

  const promises = {}
  async function updateSyncStatuses() {
    for (let rec of connections.value) {
      if (promises[rec.id]) continue
      promises[rec.id] = $fetch('/api/integrations/sync/status', {
        baseURL: appConfig.makiniApiUrl,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${rec['API Token']}`,
        },
      }).then(response => {
        promises[rec.id] = null
        rec['Sync Status'] = response.status
      })
    }
  }

  async function toggle(rec) {
    await $fetch('/api/connections/' + rec.id, {
      method: 'PATCH',
      body: JSON.stringify({
        Enabled: rec.Enabled,
      })
    })
  }

  onMounted(async () => {
    await updateSyncStatuses()
    setInterval(() => {
      updateSyncStatuses()
    }, 30000)
  })

</script>

