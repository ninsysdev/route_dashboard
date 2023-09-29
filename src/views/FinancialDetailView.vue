<template>
    <FinancialDetail :typequery="typequery" :dateinit="dateinit" :dateend="dateend" />
</template>
<script setup>
    import { onBeforeMount,ref } from 'vue';
    import { useRoute } from 'vue-router';
    import FinancialDetail from '../components/FinancialDetail.vue';

    const typequery = ref('')
    const dateinit = ref('')
    const dateend = ref('')

    onBeforeMount(()=>{
        const route = useRoute() 
        typequery.value = route.params.typequery
        dateinit.value = route.params.dateinit
        dateend.value = route.params.dateend
    }) 
</script>