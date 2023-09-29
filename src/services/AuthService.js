import { ref } from 'vue'

class AuthService {
    constructor(){
        this.error = ref('')
    }

    getError()  {
        return this.error
    }

    async login(urlPpal,email,password) {
        try{
            const res = await fetch(urlPpal+'nrsrclassldashboard',{
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    username : email,
                    password : password
                })
            })

            const response = await res.json()
            if(!response.status){
                this.error.value = 'Login Failed'
                localStorage.removeItem('drov_localdata')
                return false
            }

            let drov_localdata = {
                drov_userid : response.userid, 
                drov_tok_p : response.usetoken,
                drov_nam_p : email,
                drov_datenow : response.datenow,
              }
              localStorage.setItem('drov_localdata',JSON.stringify(drov_localdata))
            return true

        }
        catch(error){
            this.error.value = 'Login Failed'
            localStorage.removeItem('drov_localdata')
            return false
        }
    }
}

export default AuthService