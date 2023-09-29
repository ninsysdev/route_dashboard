<template>
  <div class="container py-4 h-80">
    <div class="row d-flex justify-content-center align-items-center h-50">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <h4 class="mb-3" style="color: white;">New User Register</h4>
              <form @submit.prevent="newUserRegister">
                <div class="form-outline mb-2">
                  <input v-model="firstname" placeholder="First Name" type="text" maxlength="25" class="form-control form-control" required/>
                </div>
                <div class="form-outline mb-2">
                  <input v-model="lastname" placeholder="Last Name" type="text" maxlength="25"  class="form-control form-control" required/>
                </div>
                <div class="form-outline mb-2">
                  <input v-model="email" placeholder="Email" type="email" maxlength="240"  class="form-control form-control" required/>
                </div>
                <div class="form-outline mb-2">
                  <input class="form-control" type="file" id="picture" name="picture" accept="image/jpeg" @change="previewFiles" required/>
                </div>
                <div class="form-outline mb-4">
                  <input v-model="password" placeholder="Password" type="text" maxlength="50"  class="form-control form-control" required/>
                </div>
                <hr>
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-warning btn-lg" >NEW REGISTER</button>
                  <router-link :to="{ name : 'home' }" class="btn btn-light btn-lg" >RETURN</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref,inject } from 'vue'
  import { useGlobalStore } from '../store/global';
  import UserRegisterService from '../services/UserRegisterService'

  const swal = inject('$swal')
  const store = useGlobalStore()
  const userregister = new UserRegisterService()
  const responseRec = userregister.getResponse()

  const firstname = ref('')
  const lastname = ref('')
  const email = ref('')
  const picture = ref([])
  const password = ref('')

  const newUserRegister = ( async ()=>{
    await userregister.fetchRegisterUser(store.urlPpal,store.pictureHeadRequest(),firstname.value,lastname.value,email.value,picture.value,password.value)
    await swal.fire({
        icon: responseRec.value.colormen,
        title: responseRec.value.message,
        showConfirmButton: false,
        timer: 1500
      })
  })

  function previewFiles(event) {
    picture.value = event.target.files[0] 
   }
</script>