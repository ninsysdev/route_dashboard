import { ref } from 'vue';

class FinancialDetailService {
     
    constructor(){
        this.records = ref([])
    }

    getFinancialData(){
        return this.records
    }

    async fetchDetailAmountDate(urlPpal,headerdata,dateinit,dateend){
        try{
            const res = await fetch(urlPpal+'detailamountdate',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    dateinit : dateinit,
                    dateend : dateend
                })
            })

            const response = await res.json()
            this.records.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async fetchDetailNewUsersDate(urlPpal,headerdata,dateinit,dateend){
        try{
            const res = await fetch(urlPpal+'detailnewusersdate',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    dateinit : dateinit,
                    dateend : dateend
                })
            })

            const response = await res.json()
            this.records.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default FinancialDetailService