const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
require('dotenv').config();

const MB_KEY = process.env.DB_KEY;

MongoClient.connect(MB_KEY, { useUnifiedTopology: true }).then((client) => {
  console.log('Connected to Database');
  const db = client.db('rappers-names');

  app.use(express.static('public'));
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());

  const rappersCollections = db.collection('rappers');

  // Gets db
  app.get('/', (req, res) => {
    rappersCollections
      .find()
      .toArray()
      .then((data) => {
        res.render('index.ejs', { info: data });
      })
      .catch((err) => console.error(err));
  });

  // Post to db
  app.post('/addRapper', (req, res) => {
    rappersCollections
      .insertOne({
        rapperName: req.body.rapperName,
        birthName: req.body.birthName,
        likes: 0,
      })
      .then((result) => {
        res.redirect('/');
      })
      .catch((err) => console.error(err));
  });

  // Updates db
  app.put('/addOneLike', (req, res) => {
      rappersCollections
        .updateOne({
            rapperName: req.body.rapperNameS,
            birthName: req.body.birthNameS,
            likes: req.body.likesS,
          },
          {
            $set: {
              likes: req.body.likesS + 1,
            }
          },
          {
            sort: { _id: -1 },
            upsert: false
          })
        .then((result) => {
          console.log('like added');
          res.json('like added');
        })
        .catch((err) => console.error(err));
    })


  // deletes from dB
  app.delete('/deleteRapper', (req, res) => {
    rappersCollections
      .deleteOne({
        rapperName: req.body.rapperNameS,
      })
      .then((result) => {
        console.log('Rappers deleted');
        res.json('Rapper Deleted');
      })
      .catch((err) => console.error(err));
  });
});

// .catch((error) => console.error(error));

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
