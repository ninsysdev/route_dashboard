<template>
  <div class="container py-4 h-80">
    <div class="row d-flex justify-content-center align-items-center h-50">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <h4 class="mb-3" style="color: white;">Users Summary</h4>
              <div class="d-grid gap-2">
                <router-link :to="{ name : 'users', params : { typequery : 'admin', returnto : 'statitics' } }" type="button" class="btn btn-primary"> ADMIN : {{ dataSum.admin }}</router-link>
                <router-link :to="{ name : 'users', params : { typequery : 'ally', returnto : 'statitics' } }" type="button" class="btn btn-primary"> ALLY : {{ dataSum.ally }}</router-link>
                <router-link :to="{ name : 'users', params : { typequery : 'client', returnto : 'statitics' } }" type="button" class="btn btn-success"> ALL CLIENT : {{ dataSum.client }}</router-link>
                <router-link :to="{ name : 'users', params : { typequery : 'active_client', returnto : 'statitics' } }" type="button" class="btn btn-success"> ACTIVE CLIENT : {{ dataSum.active_client }}</router-link>
                <router-link :to="{ name : 'users', params : { typequery : 'active_renew_client', returnto : 'statitics' } }" type="button" class="btn btn-success"> RENOVATED : {{ dataSum.active_renew_client }}</router-link>
                <router-link :to="{ name : 'users', params : { typequery : 'active_notrenew_client', returnto : 'statitics' } }" type="button" class="btn btn-warning"> NOT RENOVATED : {{ dataSum.active_notrenew_client }}</router-link>
                <router-link :to="{ name : 'users', params : { typequery : 'inactive_client', returnto : 'statitics' } }" type="button" class="btn btn-warning"> INACTIVE  : {{ dataSum.inactive_client }}</router-link>
                <router-link :to="{ name : 'users', params : { typequery : 'courtesy', returnto : 'statitics' } }" type="button" class="btn btn-warning"> PAYABLE / COURTESY  : {{ dataSum.courtesy }}</router-link>
                <router-link :to="{ name : 'users', params : { typequery : 'locked', returnto : 'statitics' } }" type="button" class="btn btn-danger"> LOCKED : {{ dataSum.locked }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
    import { onMounted,ref } from 'vue';
    import { useGlobalStore } from '../store/global';
    import SummaryRenewService from '../services/SummaryRenewService';

    const store = useGlobalStore()
    const summaryRenew = new SummaryRenewService()
    const sumary = summaryRenew.getSummary()
    const dataSum = ref({})
    onMounted( async() =>{
        await summaryRenew.fetchSummary(store.urlPpal,store.headRequest())
        dataSum.value = sumary.value[0] 
    })
</script>
