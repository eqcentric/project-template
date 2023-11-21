<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th>Sprocket Status</th>
        <th>System Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="st in localStatuses">
        <td>{{ st.name }}</td>
        <td>
          <select
              :disabled="saving"
              @change="save"
              class="form-select"
              v-model="newMappings[st.key]"
              aria-label="Default select example"
          >
            <option value="">-- Select CMMS Status --</option>
            <option v-for="s in cmmsStatuses" :value="s.key">{{ s.name }}</option>
          </select>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import _ from 'lodash'
const route = useRoute()
let saving = ref(false)

const [
  { data: localStatuses },
  { data: cmmsStatuses },
  { data: mappings },
] = await Promise.all([
  useAsyncData('local-statuses', async () => {
    const statuses = await $fetch(`<replace-statusList>`)
    return _.sortBy(_.uniqBy(statuses, 'name'), 'name')
  }),
  useAsyncData('cmms-statuses', async () => {
    const statuses = await $fetch(`/api/connections/${route.params.connection}/statuses`)
    return _.sortBy(_.uniqBy(statuses, 'name'), 'name')
  }),
  useAsyncData('mappings', async () => {
    const mappings = await $fetch(`/api/dealers/${route.params.connection}/status-mappings`)
    return _.mapValues(_.keyBy(_.filter(mappings, { connection_id: route.params.connection }), 'local'), 'system')
  })
])

const newMappings = ref({
  ...mappings.value,
})

async function save() {
  saving.value = true
  await $fetch(`/api/connections/${route.params.connection}/status-mappings`, {
    method: 'POST',
    body: JSON.stringify(_.mapValues(newMappings.value, (v, k) => ({
      local: k,
      system: v,
      connection_id: route.params.connection,
    })))
  })
  saving.value = false
}


</script>
