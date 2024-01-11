<template>
  <nav-bar/>
  <br><br>
  <router-view/>
</template>

<script setup>
  import NavBar from './components/NavBar.vue';
</script>

<style>
    html,body{
    background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
    background-size: cover;
    height: 100%;
    font-family: 'Numans', sans-serif;
    }

    .container{
    height: 100%;
    align-content: center;
    }

    .card{
    width: 360px;
    background-color: rgba(0,0,0,0.5) !important;
    }

    .card-header h3{
    color: white;
    }
</style>