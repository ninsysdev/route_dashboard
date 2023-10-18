<template>
      <div class="container py-4 h-80">
        <div class="row d-flex justify-content-center align-items-center h-50">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong" style="border-radius: 1rem;">
                <div class="card-body p-5 text-center">
                  <h4 class="mb-3" style="color: white;">Financial Summary</h4>
                  <input class="form-control mb-2" v-model="dateinit" type="date" name="dateinit" id="dateinit" @change="updateSettData">
                  <input class="form-control mb-2" v-model="dateend" type="date" name="dateend" id="dateend" @change="updateSettData">
                  <div class="d-grid gap-2">
                    <router-link :to="'/financialdetail/all/'+dateinit+'/'+dateend" type="button" class="btn btn-warning"> TOTAL USERS PAY: {{ sumAmount.usertot }}<br> TOTAL COLLECTION: {{ sumAmount.amounttot }}</router-link>
                    <router-link :to="'/financialdetail/new/'+dateinit+'/'+dateend" type="button" class="btn btn-warning"> NEW USERS : {{ sumCount.usertot }}<br> TOTAL COLLECTION:  {{ sumCount.amounttot }}</router-link>
                    <hr>
                    <router-link :to="{name : 'weekstatitics'  }" class="btn btn-info">WEEK STATITICS</router-link>
                    <button v-if="store.applicant" class="btn btn-primary" style="color: black;" @click="saveStatitics">SAVE WEEK STATITICS</button>
                  </div>
                </div>
              </div>
            </div>
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
    const store = useGlobalStore()
    const dateinit = ref('')
    const dateend = ref('')

    onMounted( async ()=>{
        await settingsdata.fetchSettingsData(store.urlPpal,store.headRequest())
        dateinit.value = dates.value.dateinit
        dateend.value = dates.value.dateend
        await settingsdata.sumaryAmountDate(store.urlPpal,store.headRequest(),dateinit.value,dateend.value)
        await settingsdata.summaryNewUsers(store.urlPpal,store.headRequest(),dateinit.value,dateend.value)
    })

    const updateSettData = ( async ()=>{
        await settingsdata.fetchSettingsEditData(store.urlPpal,store.headRequest(),dateinit.value,dateend.value)
        await settingsdata.sumaryAmountDate(store.urlPpal,store.headRequest(),dateinit.value,dateend.value)
        await settingsdata.summaryNewUsers(store.urlPpal,store.headRequest(),dateinit.value,dateend.value)
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
            const saveweek = settingsdata.saveWeekStatitics(store.urlPpal,store.headRequest(),dateinit.value,dateend.value,sumAmount.value.usertot,sumAmount.value.amounttot,sumCount.value.usertot,sumCount.value.amounttot)
            console.log(saveweek)
            swal.fire('Saved!', '', 'success')
          }
        })
    })
</script>