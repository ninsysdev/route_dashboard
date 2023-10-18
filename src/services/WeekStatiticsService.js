import { ref } from 'vue';

class WeekStatiticsService {
     
    constructor(){
        this.records = ref([])
    }

    getFinancialData(){
        return this.records
    }

    async fetchWeekStatitics(urlPpal,headerdata,dateinit,dateend){
        try{
            const res = await fetch(urlPpal+'weekstatitics',{
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

export default WeekStatiticsService