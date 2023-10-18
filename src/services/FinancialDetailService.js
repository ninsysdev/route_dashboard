import { ref } from 'vue';

class FinancialDetailService {
     
    constructor(){
        this.records = ref([])
        this.response = ref([])
    }

    getFinancialData(){
        return this.records
    }

    getResponse(){
        return this.response
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

    async fetchEditPay(urlPpal,headerdata,id,reference){
        try{
            const res = await fetch(urlPpal+'routeeditpay',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    id : id,
                    reference : reference
                })
            })

            const response = await res.json()
            this.response.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default FinancialDetailService