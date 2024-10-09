const request = require('request');

const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5ddd597d480f973bd653b538361ad42d&query='+latitude+','+longitude+'&units=f';

 request({url, json:true},(error,{body})=>{
    if(error){
        callback("unable to connect to service",undefined);
    }
    else if(body.error){
        callback("no found data",undefined);
    }
    else{
        const degree = body.current.temperature;
         const feel = body.current.feelslike;
             const weather = body.current.weather_descriptions[0];
             callback(undefined,weather+". it is currently "+degree+" degrees out. it feels like "+feel+" degrees out");
    }
 })


 }

 module.exports = forecast;