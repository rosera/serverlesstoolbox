const {v2beta3} = require('@google-cloud/tasks');
const client = new v2beta3.CloudTasksClient();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening on port', port);
});

app.post('/', async (req, res) => {
  const order = req.body;
  order.id = generateOrderId();
  await callPaymentService(order);
  const retVal = {
    status: "success",
    order_id: order.id
  };
  res.json(retVal);
})

function generateOrderId() {
  return Math.floor(Math.random()*100000);
}

async function callPaymentService(order) {
  const task = {
    httpRequest: {
      url: 'https://payment-service-weeju7u4zq-uc.a.run.app',
      body: encodePayload(order),
      httpMethod: 'POST',
      headers: {'content-type': 'application/json'},
      oidcToken: {
        serviceAccountEmail: 'tasks-cloud-run-invoker@serverless-toolbox.iam.gserviceaccount.com',
      }
    },
    scheduleTime: {
      seconds: Date.now() / 1000 + 10,
    }
  };
  const project = 'serverless-toolbox';
  const location = 'us-west2';
  const queue = 'payments';
  const request = {
    parent: client.queuePath(project, location, queue),
    task: task,
  };
  const [response] = await client.createTask(request);
  console.log(`Created task for order ${order.id}`);
}

function encodePayload(payload) {
  return Buffer.from(
    JSON.stringify(payload)
  ).toString('base64');
}
