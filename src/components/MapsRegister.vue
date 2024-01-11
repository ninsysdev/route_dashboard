<template>
<div class="row">
  <div class="col-xs-12 col-sm-6 col-m-6">
    <div class="card" style="border-radius: 1rem;">
    <div class="card-body p-2 text-center">
      <h4 class="mb-3" style="color: white;">Maps File</h4>
      <div class="d-grid gap-2">
        <select class="form-select mb-2" v-model="maprec">
            <option v-for="map in maps" :key="map.id" :value="map" >{{ map.description }}</option>
        </select>
        <label style="color: white;">ID MAP</label>
        <input type="text" class="form-control mb-2" v-model="maprec.idmap" disabled>
        <label style="color: white;">BRANCH</label>
        <input type="text" class="form-control mb-2" v-model="maprec.branch" disabled>
        <label style="color: white;">CODE BRANCH</label>
        <input type="text" class="form-control mb-2" v-model="maprec.codebranch" disabled>
        <label style="color: white;">TIME ZONE</label>
        <input type="text" class="form-control mb-2" v-model="maprec.timezone" disabled>
        <label style="color: white;">LENGTH</label>
        <input type="text" class="form-control mb-2" v-model="maprec.length" disabled>
        <label style="color: white;">LATITUDE</label>
        <input type="text" class="form-control mb-2" v-model="maprec.latitude" disabled>
      </div>
    </div>
  </div>
</div>
  <div class="col-xs-12 col-sm-6 col-m-6">
    <div class="card" style="border-radius: 1rem;">
        <div class="card-body p-2 text-center">
          <input class="form-control mb-2" type="number" min="0" max="60" v-model="deliveries">
          <button class="btn btn-warning" @click="getViewMap()">VIEW TEST</button>
          <MapboxMap
            v-if="viewMap"
            style="height: 630px;width: 341px;"
            access-token="pk.eyJ1IjoibG5hdmVkYSIsImEiOiJjbHByYTExb2swNHZ5MmlscjI3a2d0eDNlIn0.7t7ia8b2UUZDWlgt2hBMzw"
            map-style="mapbox://styles/lnaveda/clpvdjvs500xh01qmfo4mbf7x"
            :center="mapCenter"
            :zoom="10">
            <MapboxMarker :lng-lat="mapCenter">
              <div class="greenmarker"><div style="transform: rotate(-45deg);font-size: large;" ><b>1</b></div></div>  
            </MapboxMarker>
            <div v-for="marker in mapMarker" :key="marker.number">
              <MapboxMarker :lng-lat="[ marker.lng, marker.lat]">
                <div class="blackmarker"><div style="transform: rotate(-45deg);font-size: large;" ><b>{{ marker.number }}</b></div></div>  
              </MapboxMarker>
            </div>
            <MapboxNavigationControl position="bottom-right" />
          </MapboxMap>
        </div>
      </div>
    </div>
</div>
</template>

<script setup>
    import { onMounted,ref } from 'vue'
    import MapsService from '../services/MapsService'
    import { useGlobalStore } from '../store/global';

    import { MapboxMap, MapboxMarker, MapboxNavigationControl  } from '@studiometa/vue-mapbox-gl';
    import 'mapbox-gl/dist/mapbox-gl.css';

    const store = useGlobalStore()
    const mapsreg = new MapsService()
    const maps = mapsreg.getMaps()
    const mapMarker = mapsreg.getMapCoordinate()
    
    const viewMap = ref(false)
    const maprec = ref({});
    const deliveries = ref(0);
    const mapCenter = ref([]);

    onMounted( async () => {
        await mapsreg.fetchMaps(store.new_url,store.headRequest())
    })

    const getViewMap = ( async ()=>{
      if(deliveries.value >=1 && deliveries.value<=60){
        if(maprec.value.length){
          viewMap.value = false;
          await mapsreg.fetchMapCoordinates(store.new_url,store.headRequest(),maprec.value.length,maprec.value.latitude,deliveries.value)
          mapCenter.value = [maprec.value.length,maprec.value.latitude];
          viewMap.value = true;
        }else{
          alert('Map Data Error')
        }
      }
      else{
        alert('Deliveries Error')
      }
    })
</script>

<style scoped>
  .greenmarker {
    position: absolute;
    left: -37px;
    background-color: rgb(7, 172, 7);
    border-style: solid;
    border-color: white;
    transform: rotate(45deg);
    border-radius: 100px 100px 0 100px;
    border-width: 4px;
    color: white;
    font-size: 12px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blackmarker{
    position: absolute;
    left: -37px;
    background-color: #222225;
    border-style: solid;
    border-color: white;
    border-width: 3px;
    color: white;
    font-size: 12px;
    transform: rotate(45deg);
    border-radius: 100px 100px 0 100px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>