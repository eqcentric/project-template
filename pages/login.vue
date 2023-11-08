<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6 pt-5">
          <form>
            <div class="mb-3">
              <label for="login" class="form-label">Login</label>
              <input type="text" class="form-control" id="login" v-model="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="mb-3">
              <button
                  :disabled="busy"
                  class="btn btn-primary"
                @click.prevent="goSignIn()"
              >Submit</button>
            </div>
          </form>
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

  const busy = ref(false)
  const username = ref('')
  const password = ref('')

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

