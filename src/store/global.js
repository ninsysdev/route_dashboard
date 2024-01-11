import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';

export const useGlobalStore = defineStore('storePpal',{
    state : () =>{
        let datoslocales = JSON.parse(localStorage.getItem('drov_localdata'));
        let aplica = false
        if(datoslocales){
            if(datoslocales.drov_nam_p=='lnaveda@hotmail.com'){
                aplica = true
            } 
        }
        return {
            dev : 'http://localhost:8081/apirouteoverview/public/api/',
            new_url : 'https://servicerouteoverview.servicevzla.es/api/',
            res_url : 'https://www.nincostaapi.smartphonexone.com/api/',
            old_url : 'https://apirouteoverview.servicevzla.com/api/',
            pic_url : 'https://routeoverview.servicevzla.es/img/users/',
            applicant : aplica
        }
    },
    actions : {
        headRequest () {
            let datoslocales = JSON.parse(localStorage.getItem('drov_localdata'));
            var response = {
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': datoslocales.drov_tok_p,
                    'firm' : 'bmlDS2ptamJaR2haU-dJM0p0V1doNXFES2ZRQjU1QXdXMmJwR-IzUmx0dEwwZXAxcUppazdtOE01',
                    'applicant' : datoslocales.drov_nam_p
                }
            }
            return response
        },
        pictureHeadRequest () {
            let datoslocales = JSON.parse(localStorage.getItem('drov_localdata'));
            var response = {
                headers : {
                    'Accept' : '*/*',
                    'Authorization': datoslocales.drov_tok_p,
                    'firm' : 'bmlDS2ptamJaR2haU-dJM0p0V1doNXFES2ZRQjU1QXdXMmJwR-IzUmx0dEwwZXAxcUppazdtOE01',
                    'applicant' : datoslocales.drov_nam_p
                }
            }
            return response
        },
        async authDeprecated(urlPpal,headerdata) {
                try{
                    const router = useRouter()
                    const res = await fetch(urlPpal+'authclasslconf',{
                        method : 'GET',
                        headers : headerdata.headers
                    })
        
                    const response = await res.json()
                    if(!response.status){
                        localStorage.removeItem('drov_localdata')
                        router.push({ name : 'login' })
                    }
                }
                catch(error){
                    console.log(error)
                }
            }    
    }
})