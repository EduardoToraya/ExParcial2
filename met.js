const request = require("request")
//https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflower

const getID = function(object, callback){
  const url = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" +
            object;
  request({url, json: true}, function(error, response){
    if(error){
      calllback(error, undefined)
    }
    else if(response.body.message){
      callback(response.body.message, undefined)
    }
    else if(response.body["total"] == 0){
      callback("No se tienen registros del objeto", undefined)
    }
    else{
      var data = response.body
      callback(undefined, data["total"])
    }
  })
}


const getObject = function(objectID, callback){
  const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
            + objectID


  var objectData;
  request({url, json: true}, function(error, response){
    if(error){
      callback(error, undefined)
    }
    else{
      var data = response.body
      objectData ={
        artist : data.constituents[0].name,
        title: data.title,
        year: data.objectEndDate,
        technique: data.medium,
        metUrl: data.objectURL
      }

      callback(undefined, objectData);
    }
  })
}


module.exports = {
  getObject: getObject,
  getID: getID
}


///TEST ZONE
/*
getID("sunflowedasdr", function(error, objID){
  if(error){
    console.log(error)
  }
  else{
    console.log(objID)
  }
})
*/
/*
getObject("707887", function(error, objData){
  if(error){
    callback(error, undefined)
  }
  else{
    console.log(objData)
  }
})
*/
