const express = require("express")
const app = express()
const port = process.env.PORT || 3000;
const funciones = require("./met.js")


app.get("/students/:id", function(req, res){
if(req.params.id != "A00819785"){
  res.send({
    error: "La matricula no coincide con la del estudiante. Es A00819785"
  })
}
else{
  res.send({
    "id": "A00819785",
    "fullname": "Eduardo Alejandro Toraya Solís",
    "nickname": "Toraya",
    "age": 21
  })
}
})

app.get("/met", function(req, res){
  if(!req.query.search){
    res.send({
      error: "Debe existir un parametro en search"
    })
  }
else{
  funciones.getID(req.query.search, function(error1, objID){
    if(error1){
      return res.send({
        error: error1
      })
    }
    else{
      funciones.getObject(objID, function(error2, output){
        if(error2){
          return res.send({
            error: error2
          })
        }
        else{
          return res.send({
            searchTerm: req.query.search,
            Data: output
          })
        }
      })
    }
  })
}

})


app.get("*", function(req,res){
  res.send({
    error: "Ruta no valida"
  })
})

app.listen(port, function(){
  console.log("Listening on port " + port)
})
