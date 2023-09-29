<template>
    <div class="container mt-3 mb-2">
        <div class="row">
            <div class="col-2">
                <router-link :to="{ name : 'statitics' }" class="btn btn-warning" ><i class="bi bi-caret-left-fill"></i></router-link>
            </div>
            <div class="col-8">
                <input v-model="datoabuscar" type="text" class="form-control" placeholder="SEARCH" @keyup="filtrarData()">
            </div>
            <div class="col-2">
                <download-excel
                    class="btn btn btn-success"
                    :data="datosfiltrados"
                    worksheet="My Worksheet"
                    name="Pay_List_Users.xls"
                >
                <i class="bi bi-file-earmark-excel-fill" style="color: white;"></i>
                </download-excel>
            </div>
        </div>
    </div>
    <table class="table table-dark">
        <tbody>
            <tr v-for="data in datosfiltrados" :key="data.id">
                <td><img :src="'https://costa.smartphonexone.com/img/users/'+data.picture+'.jpg'" alt="..." style="width: 40px"></td>
                <td>{{ data.iduser }} - {{ data.name }}</td>
                <td>{{ data.paydate }}</td>
                <td>{{ data.amount }}</td>
                <td>{{ data.type }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
    import { defineProps,onMounted,ref } from 'vue'
    import { useGlobalStore } from '../store/global';
    import FinancialDetailService from '../services/FinancialDetailService';

    const store = useGlobalStore()
    const financialdetail = new FinancialDetailService()
    const financialdata = financialdetail.getFinancialData() 

    const datoabuscar = ref('')
    const datosfiltrados = ref([])

    const props = defineProps({
        typequery : String,
        dateinit : String,
        dateend : String
    })

    onMounted( async ()=>{
        if(props.typequery == 'all'){
            await  financialdetail.fetchDetailAmountDate(store.urlPpal,store.headRequest(),props.dateinit,props.dateend)
        }
        else{
            await  financialdetail.fetchDetailNewUsersDate(store.urlPpal,store.headRequest(),props.dateinit,props.dateend)
        }
        datosfiltrados.value = financialdata.value
    })

    const filtrarData = ( ()=>{   
        datosfiltrados.value = financialdata.value.filter(el => el.name.toLowerCase().includes(datoabuscar.value.toLowerCase()))
     })
</script>