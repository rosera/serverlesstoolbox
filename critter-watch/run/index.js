const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();

app.listen(port, () => {
  console.log('CritterWatch Rest API listening on port', port);
});

app.get('/animals/:animalName', async (req, res) => {
  const animalName = req.params.animalName;
  const querySnapshot = await firestore.collection(animalName).get();
  if (!querySnapshot.empty) {
    const sightings = querySnapshot.docs.map(doc => doc.data());
    res.json({status: 'success', data: {sightings: sightings}});
  }
  else {
    res.status(404).send({
      status: 'failure', data: {message: `'${animalName}' not found`}
    });
  }
})
