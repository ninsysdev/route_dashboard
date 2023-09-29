import { ref } from 'vue'

class UserRegisterService {
    constructor(){
        this.responseRec = ref([])
    }

    getResponse()  {
        return this.responseRec
    }

    async fetchRegisterUser(urlPpal,headerdata,firstname,lastname,email,picture,password) {
        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('picture', picture);
        formData.append('password', password);
        console.log(formData)
        try{
            const res = await fetch(urlPpal+'acountnewuserdata',{
                method : 'POST',
                headers : headerdata.headers,
                body : formData
            })

            const response = await res.json()
            this.responseRec.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default UserRegisterService