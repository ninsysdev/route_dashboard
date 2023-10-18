<template>
    <div class="container mt-3 mb-2">
        <div class="row">
            <div class="col-2">
                <router-link :to="{ name : 'statitics' }" class="btn btn-warning" ><i class="bi bi-caret-left-fill"></i></router-link>
            </div>
            <div class="col-4">
                <input v-model="dateinit" type="date" class="form-control">
            </div>
            <div class="col-4">
                <input v-model="dateend" type="date" class="form-control">
            </div>
            <div class="col-2">
                <button @click="updateStatitics()" class="btn btn-primary" ><i class="bi bi-search"></i></button>
            </div>
        </div>
    </div>
    <table class="table table-dark">
        <tbody>
            <tr class="table-secondary">
                <td>Week</td>
                <td>Date Init</td>
                <td>Date End</td>
                <td>All Client</td>
                <td>Active Client</td>
                <td>Inactive</td>
                <td>Payable</td>
                <td>Users Pay</td>
                <td>User Collection</td>
                <td>New Users</td>
            </tr>
            <tr v-for="item in weekdata" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.dateinit }}</td>
                <td>{{ item.dateend }}</td>
                <td>{{ item.allclient }}</td>
                <td>{{ item.activeclient }}</td>
                <!-- td>{{ item.renovated }}</td -->
                <!-- td>{{ item.notrenovated }}</td -->
                <td>{{ item.inactive }}</td>
                <td>{{ item.payable }}</td>
                <td>{{ item.userspay }}</td>
                <td>{{ item.userscollection }}</td>
                <td>{{ item.usersnew }}</td>
                <!-- td>{{ item.usersnewcollection }}</td -->
            </tr>
        </tbody>
    </table>
</template>
<script setup>
    import { onMounted,ref } from 'vue';
    import WeekStatiticsService from '../services/WeekStatiticsService';
    import { useGlobalStore } from '../store/global'
    
    const store = useGlobalStore()
    const weekstatitics = new WeekStatiticsService()
    const weekdata = weekstatitics.getFinancialData()
    
    var date = new Date();
    var primerDia = new Date(date.getUTCFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    const dateinit = ref('');
    const dateend = ref('');

    onMounted( async ()=>{
        dateinit.value = primerDia.toISOString().substring(0,10)
        dateend.value = ultimoDia.toISOString().substring(0,10)
        await updateStatitics()
    })

    const updateStatitics = ( async ()=>{
        await weekstatitics.fetchWeekStatitics(store.urlPpal,store.headRequest(),dateinit.value,dateend.value)
    })
</script>
