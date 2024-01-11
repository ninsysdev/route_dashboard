<template>
    <div class="container mt-3 mb-2">
        <div class="row">
            <div class="col-2">
                <router-link :to="{ name : returnto }" class="btn btn-warning" ><i class="bi bi-caret-left-fill"></i></router-link>
            </div>
            <div class="col-8">
                <input v-model="datoabuscar" type="text" class="form-control" placeholder="SEARCH" @keyup="filtrarData()" @keydown="filtrarData()" >
            </div>
            <div class="col-2">
                <download-excel
                    class="btn btn btn-success"
                    :data="datosfiltrados"
                    worksheet="My Worksheet"
                    name="List_Users.xls"
                >
                <i class="bi bi-file-earmark-excel-fill" style="color: white;"></i>
                </download-excel>
            </div>
        </div>
    </div>
    <table class="table table-dark">
        <tbody>
            <tr v-for="user in datosfiltrados" :key="user.id">
                <!--  https://costa.smartphonexone.com/img/users/  -->
                <!--  https://flexapp.servicevzla.com/img/users/  -->
                <!--  https://routeoverview.servicevzla.es/img/users/ -->
                <td v-if="store.applicant" >
                    <img :src="'https://routeoverview.servicevzla.es/img/users/'+user.picture+'.jpg'" 
                    alt="..." 
                    style="width: 60px;border-radius: 50%;" 
                    data-bs-toggle="modal" 
                    data-bs-target="#editUserModal" 
                    @click="asignaData(user.id,user.firstname,user.lastname,user.email,user.picture,user.isactive)">
                </td>
                <td v-else >
                    <img :src="'https://routeoverview.servicevzla.es/img/users/'+user.picture+'.jpg'"
                    alt="..." 
                    style="width: 60px;border-radius: 50%;"
                    data-bs-toggle="modal"
                    data-bs-target="#editAdminUserModal"
                    @click="asignaData(user.id,user.firstname,user.lastname,user.email,user.picture,user.isactive)">
                </td>
                <td style="font-size: small;">{{ user.firstname }} {{ user.lastname }} <br> 
                    {{ user.email }} <br>
                    <small>
                    <i>{{ user.id }} - </i>  
                    <i v-if="user.isactive>0" style="color: green;" class="bi bi-check-circle-fill"> - </i>
                    <i v-if="user.isactive==0" style="color: yellow;" class="bi bi-ban-fill"> - </i>
                    <i v-if="user.isactive<0" style="color: red;" class="bi bi-x-circle-fill" > - </i>
                    <i v-if="user.isactive>4" > Admin - </i> 
                    <i v-if="user.isactive==2" > Ally - </i>
                    <i v-if="user.isactive<0" > Locked - </i>
                    <i v-if="user.payment==1"> Paid {{ user.payment }} Day - </i><i v-else> Paid {{ user.payment }} Days - </i>
                    <i v-if="store.applicant" class="bi bi-key-fill" data-bs-toggle="modal" data-bs-target="#sendDataModal" @click="asignaData(user.id,user.firstname,user.lastname,user.email,user.picture,user.isactive)"></i>
                    </small>
                    <br>
                    <small style="color: greenyellow;">
                        Last Pay: {{ user.amount }} - {{ user.lastpay }}
                    </small>
                </td>
                <td v-if="store.applicant" ><button class="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target="#registerPayModal" @click="asignaData(user.id,user.firstname,user.lastname,user.email,user.picture,user.isactive)">Pay</button></td>
            </tr>
        </tbody>
    </table>
    <!--MODALES-->
    <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">                            
                <img :src="'https://routeoverview.servicevzla.es/img/users/'+dataEdit.picture+'.jpg'" alt="..." style="width: 333px;border-radius: 50%;">
                <!-- img :src="'https://flexapp.servicevzla.com/img/users/'+dataEdit.picture+'.jpg'" alt="..." style="width: 333px;border-radius: 50%;" -->
            </div>
            <div class="modal-body">
                <input type="text" class="form-control mb-2" v-model="dataEdit.firstname">
                <input type="text" class="form-control mb-2" v-model="dataEdit.lastname">
                <input type="text" class="form-control mb-2" v-model="dataEdit.email">
                <select name="isactive" id="isactive" v-model="dataEdit.isactive" class="form-select" >
                    <option value="-1">Locked</option>
                    <option value="0">InActive</option>
                    <option value="1">Active</option>
                    <option value="2">Ally</option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="editData()">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    <!-- -->
    <div class="modal fade" id="sendDataModal" tabindex="-1" aria-labelledby="esendDataModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                Change Data
            </div>
            <div class="modal-body">
                <div class="mb-2"><b>{{ dataEdit.firstname }} {{ dataEdit.lastname }}</b>  <br> {{ dataEdit.email }}</div>  
                <input type="text" class="form-control mb-2" v-model="dataEdit.pass" placeholder="NEW PASSWORD">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="sendData()">Save and Send Data</button>
            </div>
            </div>
        </div>
    </div>
    <!-- -->
    <div class="modal fade" id="registerPayModal" tabindex="-1" aria-labelledby="registerPayModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
               <b>PAY REGISTER</b>
            </div>
            <div class="modal-body">
                <div class="mb-2"><b>{{ dataEdit.firstname }} {{ dataEdit.lastname }}</b>  <br> {{ dataEdit.email }}</div>  
                <input type="number" step="0.01" class="form-control mb-2" v-model="dataEdit.amount" min="17">
                <select class="form-select mb-2" name="paytype" id="paytype" v-model="dataEdit.paytype">
                    <option value="ZELLE">ZELLE</option>
                    <option value="PROMO">PROMO</option>
                </select>
                <select class="form-select mb-2" name="weeks" id="weeks" v-model="dataEdit.weeks">
                    <option value="0"> - </option>
                    <option value="1">1 DAY</option>
                    <option value="2">2 DAYS</option>
                    <option value="3">3 DAYS</option>
                    <option value="4">4 DAYS</option>
                    <option value="5">5 DAYS</option>
                    <option value="6">6 DAYS</option>
                    <option value="7">7 DAYS</option>
                    <option value="8">8 DAYS</option>
                    <option value="9">9 DAYS</option>
                    <option value="10">10 DAYS</option>
                    <option value="11">11 DAYS</option>
                    <option value="12">12 DAYS</option>
                    <option value="13">13 DAYS</option>
                    <option value="14">14 DAYS</option>
                    <option value="15">15 DAYS</option>
                    <option value="16">16 DAYS</option>
                    <option value="17">17 DAYS</option>
                    <option value="18">18 DAYS</option>
                    <option value="19">19 DAYS</option>
                    <option value="20">20 DAYS</option>
                    <option value="21">21 DAYS</option>
                </select>
                <input v-model="dataEdit.reference" class="form-control mb-2" maxlength="20" placeholder="REFERENCE" type="text" name="reference" id="reference">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
                <button type="button" class="btn btn-primary" @click="newPay()">SAVE PAY</button>
            </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="editAdminUserModal" tabindex="-1" aria-labelledby="editAdminUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">                            
                <img :src="'https://routeoverview.servicevzla.es/img/users/'+dataEdit.picture+'.jpg'" alt="..." style="width: 333px;border-radius: 50%;">
                <!-- img :src="'https://flexapp.servicevzla.com/img/users/'+dataEdit.picture+'.jpg'" alt="..." style="width: 333px;border-radius: 50%;" -->
            </div>
            <div class="modal-body">
                <input type="text" class="form-control mb-2" v-model="dataEdit.firstname" disabled>
                <input type="text" class="form-control mb-2" v-model="dataEdit.lastname" disabled>
                <input type="text" class="form-control mb-2" v-model="dataEdit.email" disabled>
                <select name="isactive" id="isactive" v-model="dataEdit.isactive" class="form-select" >
                    <option value="0">InActive</option>
                    <option value="1">Active</option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="editData()">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    <!-- -->
</template>
<script setup>
    import { onMounted,defineProps,ref,inject } from 'vue'
    import { useGlobalStore } from '../store/global';
    import UsersDataService from '../services/UsersDataService';
    import EditRegisterService from '../services/EditRegisterService';

    const props = defineProps({
        typequery : String,
        returnto : String
    })

    const swal = inject('$swal')
    const store = useGlobalStore()
    const usersData = new UsersDataService()
    const users = usersData.getUsers()

    const editRegister = new EditRegisterService()
    const responseRec = editRegister.getResponse()

    const datoabuscar = ref('')
    const datosfiltrados = ref([])

    const dataEdit = ref({
        id : 0,
        firstname : '',
        lastname : '',
        email : '',
        picture : '',
        isactive : 0,
        pass : '',
        amount : 0,
        paytype : 'ZELLE',
        weeks : 0,
        reference : ''
    })

    onMounted( async () => {
        await usersData.fetchAllUsers(store.new_url,store.headRequest(),props.typequery)
        datosfiltrados.value = users.value
    })

    const filtrarData = ( ()=>{   
        datosfiltrados.value = users.value.filter(el => (el.firstname+el.lastname).toLowerCase().includes(datoabuscar.value.toLowerCase()))
     })

     const asignaData = ((id,firstname,lastname,email,picture,isactive)=>{
        dataEdit.value.id = id
        dataEdit.value.firstname = firstname
        dataEdit.value.lastname = lastname
        dataEdit.value.email = email
        dataEdit.value.picture = picture
        dataEdit.value.isactive = isactive
     })

     const editData = ( async ()=>{
        await editRegister.fetchRegisterEditUser(store.new_url,store.headRequest(),dataEdit.value)
        await usersData.fetchAllUsers(store.new_url,store.headRequest(),props.typequery)
        filtrarData()
        await swal.fire({
            icon: responseRec.value.colormen,
            title: responseRec.value.message,
            showConfirmButton: false,
            timer: 1500
        })
     })

     const sendData = ( async ()=>{
        await editRegister.fetchRegisterSendData(store.new_url,store.headRequest(),dataEdit.value)
        await swal.fire({
            icon: responseRec.value.colormen,
            title: responseRec.value.message,
            showConfirmButton: false,
            timer: 1500
        })
     })

     const newPay = ( async ()=>{
        if(dataEdit.value.amount<5 && dataEdit.value.paytype != 'PROMO'){
            swal.fire({
                icon: 'error',
                title: 'AMOUNT ERROR',
            })
        }
        else{
            if(dataEdit.value.weeks == 0){
                swal.fire({
                    icon: 'error',
                    title: 'WEEKS ERROR',
                })  
            }
            else{
                await editRegister.fetchNewPayData(store.new_url,store.headRequest(),dataEdit.value)
                await usersData.fetchAllUsers(store.new_url,store.headRequest(),props.typequery)
                filtrarData()
                dataEdit.value.weeks = 0
                dataEdit.value.amount = 0        
                await swal.fire({
                    icon: responseRec.value.colormen,
                    title: responseRec.value.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
     })
</script>