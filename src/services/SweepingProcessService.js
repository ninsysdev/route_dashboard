import { ref } from 'vue';

class SweepingProcessService {
     
    constructor(){
        this.responseRec = ref([])
    }

    getProcessResponse(){
        return this.responseRec
    }

    async fetchSweepingProcess(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'sweepingprocessdat',{
                method : 'GET',
                headers : headerdata.headers
            })

            const response = await res.json()
            this.responseRec.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default SweepingProcessService