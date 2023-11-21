<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6 pt-5">
        <p class="text-center">Authenticated</p>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

const { signIn, status } = useAuth()

onMounted(async () => {

})

async function goSignIn () {
  busy.value = true
  await signIn('credentials', {
    username: username.value,
    password: password.value,
    redirect: false
  })
  if (status.value === 'authenticated') {
    navigateTo('/')
  }
  busy.value = false
}

</script>

