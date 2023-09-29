import { ref } from 'vue';

class SummaryRenewService {
     
    constructor(){
        this.records = ref([])

    }

    getSummary(){
        return this.records
    }

    async fetchSummary(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'routesummaryrenew',{
                method : 'GET',
                headers : headerdata.headers
            })

            const response = await res.json()
            this.records.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default SummaryRenewService