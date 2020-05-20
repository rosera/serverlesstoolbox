const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// Open port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

// Post handler
app.post('/', async (req, res) => {
  const order = req.body;
  order.id = generateOrderId();
  await publishMessage(order);
  const retVal = {
    status: "success",
    order_id: order.id
  };

  res.json(retVal);

})


function generateOrderId(){
  return makeid(7);
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


async function publishMessage(order) {
  const buffer = Buffer.from(JSON.stringify(order));
  await pubsub.topic('ORDER_PLACED').publish(buffer);
}
