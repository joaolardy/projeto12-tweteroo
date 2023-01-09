import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const usuarios = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    //pega o objeto determinado no front
    const usuario = req.body;
    //sobe esse objeto no array de usuarios
    usuarios.push(usuario);
    res.status(200).send("OK");
} );

app.post("/tweets", (req, res) => {
    const tweet = req.body;
    let autorizado = false;
    usuarios.map((usuario) => {
        if(usuario.username == tweet.username){
            autorizado = true;
            tweets.push(tweet);
            res.status(200).send("OK")
        }
    })
    if(autorizado === false){
        res.status(401).send(tweet.username);
    }
} );

app.get("/tweets", (req, res) => {
    tweets.forEach((tweet) => {
        const card = usuarios.find((usuario) => usuario.username === tweet.username);
        tweet.avatar = card.avatar;
      });
    res.send(tweets);
})

app.listen(PORT, () => {
    console.log('a porta foi config com sucesso');
});