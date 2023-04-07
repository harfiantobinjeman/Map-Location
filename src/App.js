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
import * as parkDatas from "./data/select.json";
import ReactInputSelect from "react-input-select"
import mapStyles from "./mapStyles";
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  const [parkselected, setParkselected] = useState([]);
  const [pencarian, setPencarian] = useState('')
  const [selected,setSelected] = useState('')
  const [awal, setAwal] = useState({ lat: -0.048814, lng: 109.339166 })
  const [zoom, setZooom] = useState(3)
  const isiArray =[
  {value : 'Kota Pontianak',label:'Kota Pontianak'},
  {value : 'Kabupaten Kubu Raya',label:'Kabupaten Kubu Raya'},
  {value : 'Kabupaten Mempawah',label:'Kabupaten Mempawah'},
  {value : 'Kabupaten Landak',label:'Kabupaten Landak'},
  {value : 'Kota Singkawang',label:'Kota Singkawang'},
  {value : 'Kabupaten Sambas',label:'Kabupaten Sambas'},
  {value : 'Kabupaten Bengkayang',label:'Kabupaten Bengkayang'},
  {value : 'Kabupaten Ketapang',label:'Kabupaten Ketapang'},
  {value : 'Kabupaten Kayong Utara',label:'Kabupaten Kayong Utara'}
]
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
        setZooom(20)
      },100)
      
    }else{
      
      setParkselected(JSON.parse(JSON.stringify(parkData.features)))
      setAwal({lat:parkData.features[0].geometry.coordinates[1],lng:parkData.features[0].geometry.coordinates[0]})
      setTimeout(()=>{

        setZooom(14)
      },100)
    }
    
  },[pencarian])

//ini
useEffect(()=>{
  if(selected!=""){
    setParkselected([])
    let mapss = []
    for(let i=0;i<parkDatas.features.length;i++){
      
      if(parkDatas.features[i].properties.NAME.toLowerCase().includes(selected.toLowerCase()) || parkDatas.features[i].properties.DESCRIPTIO.toLowerCase().includes(selected.toLowerCase())){
      
        mapss.push(parkDatas.features[i])
      }
    }
    setTimeout(()=>{
      if(mapss.length){
        setParkselected(mapss)
        setAwal({lat:mapss[0].geometry.coordinates[1],lng:mapss[0].geometry.coordinates[0]})
      }
      setZooom(12)
    },100)

    
  }  else{
      
      setParkselected(JSON.parse(JSON.stringify(parkDatas.features)))
      setAwal({lat:parkDatas.features[0].geometry.coordinates[1],lng:parkDatas.features[0].geometry.coordinates[0]})
      setTimeout(()=>{

        setZooom(10)
      },100)
    }
},[selected])
//akhir ini
  
  const onShow = (e)=>{
    window.alert(e.target.value)
  }

  return (
    <GoogleMap

     
      center={awal}
      zoom={zoom}
      
      defaultOptions={{ styles: mapStyles }}
    >
      <div style={{
        backgroundColor:'white',
        marginTop: `40px`,
          position:'fixed',
          top:-40,
          left:0,
          padding: `0 12px`,
          width: `100%`,
          height: `50px`,
          display:'flex'
        }}>
          <h3 className="hopLocation" style={{
            marginTop:'10px',
            marginLeft:'27px'
          }}>HOP Location Cafe</h3>
          <button className="home" style={{
            backgroundColor:'transparent',
            marginTop:'2px',
            marginLeft:'600px',
            backgroundRepeat: 'no-repeat',
            border: 'none',
            cursor: 'pointer',
            overflow: 'hidden',
            outline: 'none',
          }}>Home</button>
          <select onChange={e=>setSelected(e.target.value)} style={{
            backgroundColor:'transparent',
            marginTop:'2px',
            marginLeft:'60px',
            backgroundRepeat: 'no-repeat',
            border: 'none',
            cursor: 'pointer',
            overflow: 'hidden',
            outline: 'none',
          }}>
            {isiArray.map((option) =>(
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
      </div>
      <div>
        <h1 className="harfi" style={{
          fontSize:'64px',
          color: '#1C5089',
          fontFamily:'Gotam',
          textShadow: '3px 2px 1px grey',
          marginTop: `60px`,
          position:'fixed',
          zIndex:30,
          top:30,
          left:30,
          padding: `0 12px`,
          }}>Your Location</h1>
        <h1 style={{
          marginTop:'-50px',
          fontSize:'64px',
          color: '#1C5089',
          fontFamily:'Gotam',
          textShadow: '3px 2px 1px grey',
          marginTop: `100px`,
          position:'fixed',
          zIndex:30,
          top:50,
          left:30,
          padding: `0 12px`,
          }}>Hop</h1>
      </div>
      <div className="han"
      style={{
        boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `340px`,
            height: `32px`,
            marginTop: `190px`,
            position:'fixed',
            zIndex:30,
            top:45,
            left:0,
      }}>
        <select className="selectpicker form-control" data-live-search="true" onChange={e=>setPencarian(e.target.value)}
      style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `340px`,
            height: `32px`,
            marginTop: `190px`,
            position:'fixed',
            zIndex:30,
            top:30,
            left:30,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}>
            {parkData.features.map((option) =>(
              <option value={option.properties.NAME}>{option.properties.NAME}</option>
            ))}
          </select>
      </div>
      


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
            setZooom(17)
          }}
          icon={{
            url: `/Coffee-Shop-Storefront.jpg`,
          
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
    <div style={{ width: "100vw", height: "90vh", marginTop:'50px' }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDohdsw11eVXEOValxS0gSJY-DAfGuoJSY`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}