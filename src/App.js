import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  MarkerWithLabel,
  
  InfoWindow,
} from "react-google-maps";


import * as parkData from "./data/skateboard-parks.json";
import mapStyles from "./mapStyles";
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  const [parkselected, setParkselected] = useState([]);
  const [pencarian, setPencarian] = useState('')
  const [awal, setAwal] = useState({ lat: -0.048814, lng: 109.339166 })
  const [zoom, setZooom] = useState(3)
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  useEffect(()=>{
    if(pencarian!=""){
      setParkselected([])
      let mapss = []
      for(let i=0;i<parkData.features.length;i++){
        
        if(parkData.features[i].properties.NAME.toLowerCase().includes(pencarian.toLowerCase()) || parkData.features[i].properties.DESCRIPTIO.toLowerCase().includes(pencarian.toLowerCase())){
        
          mapss.push(parkData.features[i])
        }
      }
      setTimeout(()=>{
        if(mapss.length){
          setParkselected(mapss)
          setAwal({lat:mapss[0].geometry.coordinates[1],lng:mapss[0].geometry.coordinates[0]})
        }
        setZooom(3)
      },100)
      
    }else{
      
      setParkselected(JSON.parse(JSON.stringify(parkData.features)))
      setAwal({lat:parkData.features[0].geometry.coordinates[1],lng:parkData.features[0].geometry.coordinates[0]})
      setTimeout(()=>{

        setZooom(14)
      },100)
    }
    
  },[pencarian])
  const onShow = (e)=>{
    window.alert(e.target.value)
  }

  return (
    <GoogleMap

     
      center={awal}
      zoom={zoom}
      
      defaultOptions={{ styles: mapStyles }}
    >
    
      <input
        type="text"
        onChange={e=>setPencarian(e.target.value)}
        value={pencarian}
        
        placeholder="Search"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          position:'fixed',
          zIndex:30,
          top:30,
          left:10,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />

      {parkselected.length?parkselected.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          
          label={{text:park.properties.NAME,color:'white',size:30}}
          
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          animation={2}
          onClick={() => {
            setSelectedPark(park);
          }}
          icon={{
            url: `/Coffee-Shop-Storefront.png`,
          
              labelOrigin: new window.google.maps.Point(10,30),
              
            scaledSize: new window.google.maps.Size(25, 25)
          }}
          
        >
         
        </Marker>
      )):""}

      {selectedPark && (
        <InfoWindow
        
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}
      
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC85XXHMs3i3qHX1C5E002QXXRvIqJnAyo`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
