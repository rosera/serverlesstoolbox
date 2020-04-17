const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('BarkBark Rest API listening on port', port);
});

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
const db = admin.firestore();

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