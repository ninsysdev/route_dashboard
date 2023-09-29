import { ref } from 'vue';

class UsersDataService {
     
    constructor(){
        this.records = ref([])

    }

    getUsers(){
        return this.records
    }

    async fetchAllUsers(urlPpal,headerdata,typequery){
        try{
            const res = await fetch(urlPpal+'queryclienttype',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    typequery : typequery
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

export default UsersDataService