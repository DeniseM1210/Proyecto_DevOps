const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const collection = require('./mongodb')
const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res)=>{
    res.render("login");
});

app.get("/signup", (req, res)=>{
    res.render("signup");
});

app.post("/signup", async(req, res)=>{
    const data = {
        nombre:req.body.nombre,
        password:req.body.password
    }

    await collection.insertMany([data]);

    res.render("login");
});

app.post("/login", async(req, res)=>{

    try{
        const check = await collection.findOne({nombre:req.body.nombre});

        if(check.password===req.body.password){
            res.render("home");
        }else{
            res.send("Contraseña incorrecta");
        }
        
    }catch{
        res.send("Datos incorrectos");
    }

    app.post('/github-webhook/', (req, res) => {
        console.log('Payload recibido:', req.body);
        res.status(200).send('OK');
    });
    
});

app.listen(3000, ()=> {
    console.log("Puerto conectado");
});