const admin = require('firebase-admin');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.json())

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
const db = admin.firestore();

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
    res.json({ status: 'success', data: { dog: data } });
})