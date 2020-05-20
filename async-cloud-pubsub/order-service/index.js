const Firestore = require('@google-cloud/firestore');
const db = new Firestore();
const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})


app.post('/', async (req, res) => {
  const data = req.body.message.data;
  const order = decodeBase64Json(data);

  console.log(`ORDER: ${order}`);

  await saveOrder(order);
  res.status(204).send();
})


function decodeBase64Json(data) {
  return JSON.parse(Buffer.from(data, 'base64').toString());
}

async function saveOrder(order) {
  const id = order.id.toString();
  console.log ('Writing to Db');
//  await db.collection('orders').doc(id).set(order);
}
