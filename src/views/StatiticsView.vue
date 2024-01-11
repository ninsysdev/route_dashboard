<template>
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-m-6">
            <SumaryUsers/>
        </div>
        <div class="col-xs-12 col-sm-6 col-m-6">
            <SumaryFinancial/>
        </div>
    </div>
</template>
<script setup>
    import SumaryUsers from '../components/SumaryUsers.vue';
    import SumaryFinancial from '../components/SumaryFinancial.vue';
</script>