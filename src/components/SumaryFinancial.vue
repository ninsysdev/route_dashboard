<template>
  <div class="card">
    <div class="card-body p-2 text-center">
      <h4 class="mb-3" style="color: white;">Financial Summary</h4>
      <div class="d-grid gap-2">
        <input class="form-control mb-2" v-model="datepay" type="date" name="dateinit" id="dateinit" @change="updateSettDatePay">
        <router-link :to="'/financialdetail/all/'+datepay+'/'+datepay" type="button" class="btn btn-info mb-2"> TOTAL DAY USERS PAY: {{ sumByDay.usertot }}<br> TOTAL COLLECTION: {{ sumByDay.amounttot }}</router-link>
        <input class="form-control mb-2" v-model="dateinit" type="date" name="dateinit" id="dateinit" @change="updateSettData">
        <input class="form-control mb-2" v-model="dateend" type="date" name="dateend" id="dateend" @change="updateSettData">
        <router-link :to="'/financialdetail/all/'+dateinit+'/'+dateend" type="button" class="btn btn-warning"> TOTAL USERS PAY: {{ sumAmount.usertot }}<br> TOTAL COLLECTION: {{ sumAmount.amounttot }}</router-link>
        <router-link :to="'/financialdetail/new/'+dateinit+'/'+dateend" type="button" class="btn btn-warning"> NEW USERS : {{ sumCount.usertot }}<br> TOTAL COLLECTION:  {{ sumCount.amounttot }}</router-link>
        <hr>
        <table v-if="store.applicant">
          <thead style="background-color: rgb(2, 101, 134);">
              <tr>
                  <td>FECHA</td>
                  <td>Clientes</td>
                  <td>Monto</td>
              </tr>
          </thead>
          <tbody style="background-color: rgb(56, 55, 55);">
              <tr>
                  <td>
                      {{ datepay }}
                  </td>
                  <td>
                      {{ sumByDay.usertot }}
                  </td>
                  <td style="text-align: right;">
                      {{ sumByDay.amounttot }}
                  </td>
              </tr>
              <tr>
                  <td>{{ dateinit }} - {{ dateend }}</td>
                  <td>{{ sumAmount.usertot }}</td>
                  <td style="text-align: right;">{{ sumAmount.amounttot }}</td>
              </tr>
          </tbody>
        </table>
        <hr>
        <router-link :to="{name : 'weekstatitics'  }" class="btn btn-info" v-if="store.applicant">WEEK STATITICS</router-link>
        <button v-if="store.applicant" class="btn btn-primary" style="color: black;" @click="saveStatitics">SAVE WEEK STATITICS</button>
      </div> 
      
      
    </div>
  </div>
</template>

<script setup>
    import { onMounted,ref,inject } from 'vue'
    import { useGlobalStore } from '../store/global';
    import SettingsDataService from '../services/SettingsDataService';
    
    const swal = inject('$swal')
    const settingsdata = new SettingsDataService()
    const dates = settingsdata.getSetiingsData()
    const sumAmount = settingsdata.getAmountRec()
    const sumCount = settingsdata.getCountRec()
    const sumByDay = settingsdata.getAmountByDay()

    const store = useGlobalStore()
    const dateinit = ref('')
    const dateend = ref('')
    const datepay = ref('')

    onMounted( async ()=>{
        await settingsdata.fetchSettingsData(store.new_url,store.headRequest())
        dateinit.value = dates.value.dateinit
        dateend.value = dates.value.dateend
        datepay.value = dates.value.datepay
        await settingsdata.sumaryAmountDate(store.new_url,store.headRequest(),dateinit.value,dateend.value)
        await settingsdata.summaryNewUsers(store.new_url,store.headRequest(),dateinit.value,dateend.value)
        await settingsdata.sumaryAmountByDay(store.new_url,store.headRequest(),datepay.value,datepay.value)
    })

    const updateSettData = ( async ()=>{
        await settingsdata.fetchSettingsEditData(store.new_url,store.headRequest(),dateinit.value,dateend.value)
        await settingsdata.sumaryAmountDate(store.new_url,store.headRequest(),dateinit.value,dateend.value)
        await settingsdata.summaryNewUsers(store.new_url,store.headRequest(),dateinit.value,dateend.value)
    })

    const updateSettDatePay = ( async ()=>{
        await settingsdata.fetchSettingsEditDatePay(store.new_url,store.headRequest(),datepay.value)
        await settingsdata.sumaryAmountByDay(store.new_url,store.headRequest(),datepay.value,datepay.value)
    })

    const saveStatitics = ( async ()=>{
        await swal.fire({
          title: 'Do you want to Save the Statitics?',
          showDenyButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            const saveweek = settingsdata.saveWeekStatitics(store.new_url,store.headRequest(),dateinit.value,dateend.value,sumAmount.value.usertot,sumAmount.value.amounttot,sumCount.value.usertot,sumCount.value.amounttot)
            console.log(saveweek)
            swal.fire('Saved!', '', 'success')
          }
        })
    })
</script>

<style scoped>
  table,tr,td{
    border: solid wheat 1px;
    color: white;
  }
</style>