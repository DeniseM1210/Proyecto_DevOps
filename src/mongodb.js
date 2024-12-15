const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/bdUsuarios")
.then(()=>{
    console.log("MongoDB conectado");
})
.catch(()=>{
    console.log("Error de conexion");
});

const loginSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const collection = new mongoose.model("collection1", loginSchema);

module.exports=collection;