<template>
    <UsersTable :typequery="typequery" :returnto="returnto"/>
</template>
<script setup>
    import { onBeforeMount,ref } from 'vue';
    import { useRoute } from 'vue-router';
    import UsersTable from '../components/UsersTable.vue';
    import { useGlobalStore } from '../store/global';

    const store = useGlobalStore()
    const typequery = ref('')
    const returnto = ref('')

    onBeforeMount(()=>{
        store.authDeprecated(store.new_url,store.headRequest())
        const route = useRoute() 
        typequery.value = route.params.typequery
        returnto.value = route.params.returnto
    }) 
</script>