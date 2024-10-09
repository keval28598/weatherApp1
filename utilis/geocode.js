const request = require('request');

const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+address+'&access_token=pk.eyJ1Ijoia2V2YWwyODU5OCIsImEiOiJjbHdjaHo5bDIwenQyMmtxa2xzNnJoOGdxIn0.zyvkohV3yX9qz4j2pytkCQ'
    request({url, json:true},(error,{body})=>{

        if(error){
            callback("unable to connect to service",undefined);
        }
        else if(body.features == 0)
        {
            callback("no found data",undefined);
        }
        else{
            
            callback(undefined,{
                longitude : body.features[0].geometry.coordinates[0],
                latitude : body.features[0].geometry.coordinates[1],
                location : body.features[0].properties.place_formatted
            });
        }
    
       
    })


    
}

module.exports = geocode;