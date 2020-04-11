const admin = require('firebase-admin');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.json())
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
/* 
The initializeApp function above will use the current project's Application Default
Credentials.  You can specify a different service account by providing the service
account key in a json file and initializing with that instead:
 
const serviceAccount = require('./barkbark-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

*/
const db = admin.firestore();
app.use('/add', express.static('static'));
app.use(express.urlencoded());
app.listen(port, () => {
    console.log('BarkBark Rest API listening on port', port);
});

app.get('/:breed', async (req, res) => {
    let breed = req.params.breed;
    let dogsRef = db.collection('dogs');
    let query = dogsRef.where('name', '==', breed);
    let results = await query.get();
    let retVal = results.docs.map(doc => {
        return { ...doc.data() }
    })
    res.json(retVal)
})

app.post('/', async (req, res) => {
    const data = {
        name: req.body.name,
        origin: req.body.origin,
        lifeExpectancy: req.body.lifeExpectancy,
        type: req.body.type
    }
    await db.collection('dogs').doc().set(data);
    res.json({status: 'success', data: {dog: data}});
})