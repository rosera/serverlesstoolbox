const express = require('express');
const app = express();
const { Translate } = require('@google-cloud/translate').v2;
const client = new Translate();
const Knex = require('knex');

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('REST API listening on port', port);
});

//  /hello?name=Me
app.get('/hello', async (req, res) => {
  const name = req.query.name;
  const result = `Hello ${name}!\n\n`;
  res.send(result);
});

// /translate/fr
app.get('/translate/:lang', async (req, res) => {
  const result = await client.translate('Hello, world!', req.params.lang);
  res.send(`${result[0]}\n\n`);
});

// /clients/2
app.get('/clients/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  const client = await getClient(id);
  res.json({status: 'success', data: {client: client}});
});

async function getClient(id) {
  return await knex
    .select('*')
    .from('clients')
    .where('id', id);
};

const connect = () => {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST
  };
  const knex = Knex({
    client: 'pg',
    connection: config,
  });
  return knex;
};
const knex = connect();
