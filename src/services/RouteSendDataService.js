import { ref } from 'vue';

class RouteSendDataService {
     
    constructor(){
        this.response = ref([])
    }

    getResponse(){
        return this.response
    }

    async fetchSendData(urlPpal,headerdata,datos){
        try{
            const res = await fetch(urlPpal+'acountsenddata',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify(datos)
            })

            const response = await res.json()
            this.response.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default RouteSendDataService