<template>
  <div>
    <table class="table">
      <tbody>
      <tr v-for="rec in devices">
        <td style="width: 30%">
          {{ rec['id'] }}
        </td>
        <td style="width: 100px">
          {{ rec['deviceNumber'] }}
        </td>
        <td style="width: 100px">
          {{ rec['name'] }}
        </td>
        <td>
          <vue3-simple-typeahead
              id="typeahead_id"
              placeholder="Start writing..."
              :items="availableAssets"
              :defaultItem="mappingsByDevice[rec.id] ? assetsByKey[mappingsByDevice[rec.id].assetKey] : null"
              @selectItem="asset => mapAsset(rec, asset)"
              @onInput="input => onInput(rec, input)"
              :itemProjection="a => `${a.name} / ${a.serialNumber}`"
              :minInputLength="2">
          </vue3-simple-typeahead>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import _ from 'lodash'
const route = useRoute()
import Vue3SimpleTypeahead from 'vue3-simple-typeahead';

const [
  // { data: connection },
  { data: devices },
  { data: assets },
  { data: mappings, refresh: refreshMappings },
] = await Promise.all([
  // useFetch('/api/connections/'+route.params['connection']),
  useFetch('/api/devices'),
  useFetch('/api/connections/'+route.params['connection']+'/assets'),
  useFetch('/api/connections/'+route.params['connection']+'/mappings'),
])

const assetsByKey = ref({})
const mappingsByDevice = ref({})

watch(assets, (data) => {
  assetsByKey.value = _.keyBy(data, 'key')
}, {
  immediate: true,
})

watch(mappings, (data) => {
  mappingsByDevice.value = _.keyBy(data, 'deviceId')
}, {
  immediate: true,
})

let availableAssets = ref([])

watch([mappings, assets], ([m, a]) => {
  let keys = _.map(m, 'assetKey')
  availableAssets.value = a.filter(a => keys.indexOf(a.key) === -1)
}, {
  immediate: true,
})

async function onInput(device, { input }) {
  if (input.length === 0) {
    await $fetch('/api/connections/'+route.params['connection']+'/mappings', {
      method: 'POST',
      body: JSON.stringify({
        deviceId: device.id,
      })
    })
  }
}

async function mapAsset(device, asset) {
  if (mappingsByDevice.value[device.id]) {
    if (mappingsByDevice.value[device.id].assetKey === asset.key) return;
  }

  await $fetch('/api/connections/'+route.params['connection']+'/mappings', {
    method: 'POST',
    body: JSON.stringify({
      deviceId: device.id,
      assetKey: asset.key,
    })
  })

  await refreshMappings()
}
</script>

