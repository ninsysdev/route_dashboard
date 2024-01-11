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
                <!--  https://costa.smartphonexone.com/img/users/  -->
                <!--  https://flexapp.servicevzla.com/img/users/  -->
                <!-- https://routeoverview.servicevzla.es/img/users/ -->
                <td><img :src="'https://routeoverview.servicevzla.es/img/users/'+data.picture+'.jpg'" alt="..." style="width: 40px"></td>
                <td>{{ data.iduser }} - {{ data.name }}</td>
                <td>{{ data.paydate }}</td>
                <td>{{ data.amount }}</td>
                <td>{{ data.reference }}</td>
                <td>{{ data.type }}</td>
                <td><button @click="asignaData(data.id,data.name,data.reference)" class="btn btn-sm btn-outline-warning" data-bs-toggle="modal" data-bs-target="#registerPayModal"><i class="bi bi-pencil-fill"></i></button></td>
            </tr>
        </tbody>
    </table>
    <!-- -->
    <div class="modal fade" id="registerPayModal" tabindex="-1" aria-labelledby="registerPayModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
               <b>EDIT PAY REGISTER</b>
            </div>
            <div class="modal-body">
                <div class="mb-2"><b>{{ dataEdit.name }}</b></div>  
                <input v-model="dataEdit.reference" class="form-control mb-2" maxlength="20" placeholder="REFERENCE" type="text" name="reference" id="reference">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
                <button type="button" class="btn btn-primary" @click="editPay()">EDIT PAY</button>
            </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { defineProps,onMounted,ref,inject } from 'vue'
    import { useGlobalStore } from '../store/global';
    import FinancialDetailService from '../services/FinancialDetailService';

    const swal = inject('$swal')
    const store = useGlobalStore()
    const financialdetail = new FinancialDetailService()
    const financialdata = financialdetail.getFinancialData()
    const responseRec = financialdetail.getResponse() 

    const datoabuscar = ref('')
    const datosfiltrados = ref([])

    const dataEdit = ref({
        id : 0,
        name : '',
        reference : ''
    })

    const props = defineProps({
        typequery : String,
        dateinit : String,
        dateend : String
    })

    onMounted( async ()=>{
        if(props.typequery == 'all'){
            await  financialdetail.fetchDetailAmountDate(store.new_url,store.headRequest(),props.dateinit,props.dateend)
        }
        else{
            await  financialdetail.fetchDetailNewUsersDate(store.new_url,store.headRequest(),props.dateinit,props.dateend)
        }
        datosfiltrados.value = financialdata.value
    })

    const filtrarData = ( ()=>{   
        datosfiltrados.value = financialdata.value.filter(el => el.name.toLowerCase().includes(datoabuscar.value.toLowerCase()))
     })

     const asignaData = ((id,name,reference)=>{
        dataEdit.value.id = id
        dataEdit.value.name = name
        dataEdit.value.reference = reference
     })

     const editPay = ( async ()=>{ 
        await financialdetail.fetchEditPay(store.new_url,store.headRequest(),dataEdit.value.id,dataEdit.value.reference)
        if(props.typequery == 'all'){
            await  financialdetail.fetchDetailAmountDate(store.new_url,store.headRequest(),props.dateinit,props.dateend)
        }
        else{
            await  financialdetail.fetchDetailNewUsersDate(store.new_url,store.headRequest(),props.dateinit,props.dateend)
        }
        datosfiltrados.value = financialdata.value
        await swal.fire({
            icon: responseRec.value.colormen,
            title: responseRec.value.message,
            showConfirmButton: false,
            timer: 1500
        })
     })
</script>