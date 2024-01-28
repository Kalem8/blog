const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User')
const Post = require('./models/Post')
//Gestions des mot de passe
const bcrypt = require('bcryptjs');
//Création de token pour les utilisateurs
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
//Middleware qui gère l'envoi des fichiers 
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs')

//Mot de passe
const salt = bcrypt.genSaltSync(10);
const secret = 'zefijhzefhouiyzehf54156zefzef456';



//Midlewares
//On précise dans cors (notre gestionaire domaine) le credentials car on envoi des cookies cross-origin
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());


//Lien d'identification sur la base de donnée. [MAJ à faire pour la sécurité plus tard]
mongoose.connect('mongodb+srv://blog:EuLoiVgJ5Y63DBDk@mern-blog.c2vhfnh.mongodb.net/');


//Inscription
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        })
        res.json(userDoc);
    } catch (error) {
        res.status(400).json(error);
    }
})


//Connexion 
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    //Cherche le nom d'utilisateur dans la DB
    const userDoc = await User.findOne({ username });
    //Compare password avec userDoc.password (dans la DB) 
    const passwordIsOk = bcrypt.compareSync(password, userDoc.password);
    if (passwordIsOk) {
        // Sign : Création du token de l'utilisateur 
        // {username, id:userDoc._id} ici, il inclut l'utilisateur et son id dans le token
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            //Lors de la connexion réussi, le callback est lanc
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        })
    } else {
        //Status 401 Unauthorized plus précis que 400 Bad request
        res.status(401).json("Nom d'utilisateur ou mot de passe incorrect")
    }
})

// Endpoint pour vérifier le token JWT de l'utilisateur. Si le token est valide, 
//renvoie les informations décodées de l'utilisateur à l'adresse /profile.
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            // Gestion de l'erreur - envoi un statut 401 Unauthorized
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        // Envoi les données de l'utilisateur si le token est valide
        res.json(info);
    });
});


app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})


//Poster un article
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
    });

    res.json(postDoc)
});

app.listen(4000);