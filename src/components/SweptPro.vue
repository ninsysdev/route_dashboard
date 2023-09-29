<template>
  <div class="container py-4 h-80">
    <div class="row d-flex justify-content-center align-items-center h-50">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <h4 class="mb-3" style="color: white;">SUMARY</h4>
              <div class="d-grid gap-2">
                <router-link :to="{ name : 'users', params : { typequery : 'client', returnto : 'swept' } }" type="button" class="btn btn-success"> ALL CLIENT : {{ dataSum.client }}</router-link>
                <router-link :to="{ name : 'users', params : { typequery : 'active_renew_client', returnto : 'swept' } }" type="button" class="btn btn-success"> RENOVATED : {{ dataSum.active_renew_client }}</router-link>
                <router-link :to="{ name : 'users', params : { typequery : 'active_notrenew_client', returnto : 'swept' } }" type="button" class="btn btn-warning"> NOT RENOVATED : {{ dataSum.active_notrenew_client }}</router-link>
                <router-link :to="{ name : 'users', params : { typequery : 'courtesy', returnto : 'swept' } }" type="button" class="btn btn-warning"> PAYABLE / COURTESY  : {{ dataSum.courtesy }}</router-link>
                <hr>
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmationModal"> RUN SWEEPING PROCESS </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 <!--MODAL-->
 <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
               <b style="color: red;">CONFIRMATION</b>
            </div>
            <div class="modal-body">
                <div class="mb-2"><b>This is a critical process <br> you're sure ?</b> </div> 
                <hr>
                <div class="d-grid gap-2">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CANCEL</button>
                    <button type="button" class="btn btn-danger" @click="runSweepingPro()">EXECUTE</button>
                </div> 
            </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { onMounted,ref,inject } from 'vue';
    import { useGlobalStore } from '../store/global';
    import SummaryRenewService from '../services/SummaryRenewService'; 
    import SweepingProcessService from '../services/SweepingProcessService'

    const swal = inject('$swal')
    const store = useGlobalStore()
    const summaryRenew = new SummaryRenewService()
    const sumary = summaryRenew.getSummary()
    const dataSum = ref({})
    
    const sweepingPro = new SweepingProcessService()
    const sweeptpro = sweepingPro.getProcessResponse()

    onMounted( async ()=>{
        await summaryRenew.fetchSummary(store.urlPpal,store.headRequest())
        dataSum.value = sumary.value[0] 
    })

    const runSweepingPro = ( async ()=>{
        await sweepingPro.fetchSweepingProcess(store.urlPpal,store.headRequest())
        console.log(sweeptpro.value)
        swal.fire({
                icon: sweeptpro.value.colormen,
                title: sweeptpro.value.message,
                showConfirmButton: false,
                timer: 1500
        })
    })
</script>