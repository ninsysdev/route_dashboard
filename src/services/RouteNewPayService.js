import { ref } from 'vue';

class RouteNewPayService {
     
    constructor(){
        this.response = ref([])
    }

    getResponse(){
        return this.response
    }

    async fetchNewPayData(urlPpal,headerdata,datos){
        try{
            const res = await fetch(urlPpal+'routenewpay',{
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

export default RouteNewPayService