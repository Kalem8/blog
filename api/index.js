const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User')
//Gestions des mot de passe
const bcrypt = require('bcryptjs');
//Création de token pour les utilisateurs
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);
const secret ='zefijhzefhouiyzehf54156zefzef456';

//Midlewares
//On précise dans cors (notre gestionaire domaine) le credentials car on envoi des cookies cross-origin
app.use(cors({credentials:true,origin:'http://localhost:3000'})); 
app.use(express.json());

//Lien d'identification sur la base de donnée.
mongoose.connect('mongodb+srv://blog:EuLoiVgJ5Y63DBDk@mern-blog.c2vhfnh.mongodb.net/');

app.post('/register', async (req,res) => {
    const {username, password} = req.body;
    try {
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt),
        })
        res.json(userDoc);
    } catch (error) {
        res.status(400).json(error);
    }
})
//Connexion 
app.post('/login', async (req, res)=>{
    const {username, password} = req.body;
    //Cherche le nom d'utilisateur dans la DB
    const userDoc = await User.findOne({username});
    //Compare password avec userDoc.password (dans la DB) 
    const passwordIsOk = bcrypt.compareSync(password, userDoc.password);
    if (passwordIsOk) {
        // Sign Création du token de l'utilisateur 
        // {username, id:userDoc._id} ici, il inclut l'utilisateur et son id dans le token
        jwt.sign( {username, id:userDoc._id}, secret, {}, (err, token) => {
            //Lors de la connexion réussi, le callback est lanc
            res.cookie('token', token).json('ok');
        })
    } else {
        //Status 401 Unauthorized plus précis que 400 Bad request
        res.status(401).json("Nom d'utilisateur ou mot de passe incorrect")
    }
})


app.listen(4000);