import React, { useEffect, useState } from 'react';

const Box = () =>{

    const [city, setCity] = useState(null);
    const [wind, setWind] = useState(null);
    const [search, setSearch] = useState("Delhi");

    useEffect( () => {
        const fetchApi = async () =>{
            //Change API KEY
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${/*Change API KEY*/}&units=metric`;
            const resp = await fetch(apiUrl);
            const respJson = await resp.json();
            console.log(respJson); 
            setCity(respJson.main);
            setWind(respJson.wind.speed);
        }
        fetchApi();
    },[search] )

    return (
        <div>
            <div>
            <label for="city">City </label>
            <input 
                type="text"
                id="ipcity"
                value={search}
                onChange={
                    (event)=>{setSearch(event.target.value)}
                }/>
            </div>
            {!city ? (
                <p>No Data Found</p>
            ):(
                <div>
                    <h2>{search}</h2>
                    <h1> Temp: {city.temp} 'C</h1>
                    <h3> Min: {city.temp_max} 'C |Max: {city.temp_min}'C</h3>
                    <h4> Wind Speed: {wind}  m/s</h4>
                </div>
            )}

        </div>
        
    )
} 

export default Box;