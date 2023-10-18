import { ref } from 'vue'

class EditRegisterService {
    constructor(){
        this.responseRec = ref([])
    }

    getResponse()  {
        return this.responseRec
    }

    async fetchRegisterEditUser(urlPpal,headerdata,userData) {
        try{
            const res = await fetch(urlPpal+'acountedituserdata',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    id : userData.id,
                    firstname : userData.firstname,
                    lastname : userData.lastname,
                    email : userData.email,
                    isactive : userData.isactive
                })
            })

            const response = await res.json()
            this.responseRec.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async fetchRegisterSendData(urlPpal,headerdata,userData) {
        try{
            const res = await fetch(urlPpal+'acountsenddata',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    id : userData.id,
                    email : userData.email,
                    pass : userData.pass
                })
            })

            const response = await res.json()
            this.responseRec.value = await response
        }
        catch(error){
            console.log(error)
        }
    }

    async fetchNewPayData(urlPpal,headerdata,userData) {
        try{
            const res = await fetch(urlPpal+'routenewpay',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    id : userData.id,
                    amount : userData.amount,
                    paytype : userData.paytype,
                    weeks : userData.weeks,
                    reference : userData.reference
                })
            })

            const response = await res.json()
            this.responseRec.value = await response
        }
        catch(error){
            console.log(error)
        }
    }
}

export default EditRegisterService