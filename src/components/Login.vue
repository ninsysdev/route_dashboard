<template>
 <section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-50">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <h3 class="mb-5" style="color: white;">Sign in</h3>

              <div class="form-outline mb-4">
                <input placeholder="Email" type="email" v-model="email" class="form-control form-control-lg" />
              </div>

              <div class="form-outline mb-4">
                <input placeholder="Password" type="password" v-model="password" class="form-control form-control-lg" />
              </div>

              <button class="btn btn-warning btn-lg btn-block" @click="authUser">Login</button>

              <hr class="my-4">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </section>
</template>

<script setup>
    import { ref,inject } from 'vue'
    import { useRouter } from 'vue-router'
    import AuthService from '../services/AuthService';
    import { useGlobalStore } from '../store/global'
    
    const router = useRouter()
    let email = ref('')
    let password = ref('')
    const store = useGlobalStore()

    const swal = inject('$swal')

    const authUser = async () =>{
        const auth = new AuthService()
        const success = await auth.login(store.new_url,email.value,password.value)
        if(success){
            await swal('Login success')
            await router.push('/')
            location.reload()
        }
        else{
          swal('LOGIN ERROR')
        }
    }
</script>