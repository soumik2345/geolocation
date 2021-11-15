import React, { useState } from 'react';
import "./App.css";

const App = () => {

  const [location, setLocation] = useState("");

  const apiKey = "QNSJowcAaIVm8-aEC6hzwzOZsS5gxz9ddIjFWY-P9KY";

  const getLocation = () =>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
      setLocation("Geolocation is not supported by this browser.")
    }
  }

const showPosition = async (position) =>{
  const latitude = await position.coords.latitude ;
  const longitude = await position.coords.longitude;

  const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apikey=${apiKey}`

  const location = await fetch(url)

  const data = await location.json()

  const city = data.items[0].address.city;
  setLocation(city);
}


function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      setLocation( "User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      setLocation("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      setLocation("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      setLocation( "An unknown error occurred.")
      break;
    default :
      setLocation( "An unknown error occurred.")
      break;
  }
}


  return (
    <>
      

<div className="header">

    <button className="btn" onClick={ (e)=>getLocation() } >{ location ? "City : " + location : "Detect your location"}</button>

</div>


    </>
  )
}

export default App;
