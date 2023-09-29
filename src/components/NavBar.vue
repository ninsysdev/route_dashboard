<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <router-link class="btn btn-outline-info" :to="{ name : 'home' }"><i class="bi bi-house-fill"></i></router-link>
      <router-link class="btn btn-outline-info" aria-current="page" :to="{ name : 'users', params : { typequery : 'all' , returnto : 'home' } }"><i class="bi bi-people-fill"></i></router-link>
      <router-link v-if="store.applicant" class="btn btn-outline-info" :to="{ name : 'register' }"><i class="bi bi-person-plus-fill"></i></router-link>
      <router-link class="btn btn-outline-info" :to="{ name : 'statitics' }"><i class="bi bi-pie-chart-fill"></i></router-link>
      <router-link v-if="store.applicant" class="btn btn-outline-info" :to="{ name : 'swept' }"><i class="bi bi-stars"></i></router-link>
      <butto class="btn btn-outline-light" @click="logOtu()"  ><i class="bi bi-box-arrow-right"></i></butto>
    </div>
  </nav>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useGlobalStore } from '../store/global';
  const store = useGlobalStore()

  const router = useRouter()
  function logOtu(){
    localStorage.removeItem('drov_localdata')
    router.push({ name : 'login' })
  }
</script>