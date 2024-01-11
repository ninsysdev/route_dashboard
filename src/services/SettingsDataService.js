import { ref } from 'vue';

class SettingsDataService {
     
    constructor(){
        this.record = ref([])
        this.mountrecords = ref({})
        this.countrecords = ref({})
        this.mountbyday = ref({})
    }

    getSetiingsData(){
        return this.record
    }

    getAmountRec(){
        return this.mountrecords
    }

    getCountRec(){
        return this.countrecords
    }

    getAmountByDay(){
        return this.mountbyday
    }

    async fetchSettingsData(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'settingsdata',{
                method : 'GET',
                headers : headerdata.headers
            })

            const response = await res.json()
            this.record.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async fetchSettingsEditData(urlPpal,headerdata,dateinit,dateend){
        try{
            const res = await fetch(urlPpal+'settingseditdata',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    dateinit : dateinit,
                    dateend : dateend
                })
            })

            const response = await res.json()
            //this.edirresponse.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async fetchSettingsEditDatePay(urlPpal,headerdata,datepay){
        try{
            const res = await fetch(urlPpal+'settingseditdatepay',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    datepay : datepay
                })
            })

            const response = await res.json()
            //this.edirresponse.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async sumaryAmountDate(urlPpal,headerdata,dateinit,dateend){
        try{
            const res = await fetch(urlPpal+'sumaryamountdate',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    dateinit : dateinit,
                    dateend : dateend
                })
            })

            const response = await res.json()
            this.mountrecords.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async summaryNewUsers(urlPpal,headerdata,dateinit,dateend){
        try{
            const res = await fetch(urlPpal+'summarynewusers',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    dateinit : dateinit,
                    dateend : dateend
                })
            })

            const response = await res.json()
            this.countrecords.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async saveWeekStatitics(urlPpal,headerdata,dateinit,dateend,userspay,userscollection,usersnew,usersnewcollection){
        try{
            const res = await fetch(urlPpal+'newweekstatitics',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    dateinit : dateinit,
                    dateend : dateend,
                    userspay : userspay,
                    userscollection : userscollection,
                    usersnew : usersnew,
                    usersnewcollection : usersnewcollection
                })
            })

            const response = await res.json()
            return response
        }
        catch(error){
            console.log(error)
        }
    }

    async sumaryAmountByDay(urlPpal,headerdata,dateinit,dateend){
        try{
            const res = await fetch(urlPpal+'sumaryamountdate',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    dateinit : dateinit,
                    dateend : dateend
                })
            })

            const response = await res.json()
            this.mountbyday.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default SettingsDataService