const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 8000;

app.use(cors())

const rappers = {
  '21 savage': {
    age: 29,
    birthName: 'Sheyaa Bin Abraham-Joseph',
    birthLocation: 'London, England',
  },
  'chance the rapper': {
    age: 29,
    birthName: 'Chancelor Bennett',
    birthLocation: 'Chicago, Illinois',
  },
  'dylan': {
    age: 29,
    birthName: 'Dylan',
    birthLocation: 'Dylan',
  },
};

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/:name', (req, res) => {
    const rappersName = req.params.name.toLowerCase()
    if(rappers[rappersName]) {
        res.json(rappers[rappersName])
    } else {
        res.json(rappers['dylan'])
    }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

