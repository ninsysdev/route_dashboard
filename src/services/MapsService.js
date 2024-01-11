import { ref } from 'vue';

class MapsService {
     
    constructor(){
        this.records = ref([])
        this.coordinates = ref([])
    }

    getMaps(){
        return this.records
    }

    getMapCoordinate(){
        return this.coordinates
    }

    async fetchMaps(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'mapslist',{
                method : 'GET',
                headers : headerdata.headers
            })

            const response = await res.json()
            this.records.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async fetchMapCoordinates(urlPpal,headerdata,lng,lat,can){
        try{
            const res = await fetch(urlPpal+'mapcoordinates',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    longitud : lng,
                    latitud : lat,
                    cantidad : can
                })
            })

            const response = await res.json()
            this.coordinates.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default MapsService