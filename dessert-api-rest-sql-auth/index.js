const mysql = require('mysql');
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '[GET THIS FROM THE CLOUD CONSOLE]';
const client = new OAuth2Client(CLIENT_ID);


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('REST API listening on port ', port);
});

app.get('/api/desserts', async (req, res) =>  {
  res.json({status: 'API is ready to serve desserts'});
});

app.get('/api/desserts/:id', async(req, res) => {
  const userId = await getUserId(req.headers['authorization']);
  if (hasAccess(userId)) {
    const id = parseInt(req.params.id);
    const dessert = await getDessert(id);
    res.status(200).json({status: 'success1', data: {dessert: dessert}});
  } else {
    res.sendStatus(403);
  }
});

async function getUserId(authorizationHeader) {
  try {
    const userJwtToken = authorizationHeader.replace('Bearer ', '');
    const ticket = await client.verifyIdToken({
      idToken: userJwtToken,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'] || payload['hd'];
    return userId;
  }
  catch (ex) {
    console.error(ex);
    return '';
  }
}

function hasAccess(userId) {
  const userIds = ['[USER ID 1]', '[USER ID 2]'];
  return userIds.includes(userId);
}

let cachedDbPool;
function getDbPool() {
  if(!cachedDbPool) {
    cachedDbPool = mysql.createPool({
      connectionLimit: 1,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_NAME,
      socketPath: `/cloudsql/${process.env.INST_CON_NAME}`
    });
  }
  return cachedDbPool;
}

async function getDessert(id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM desserts where id=?';
    getDbPool().query(sql, [id], (err, results) => {
      resolve(results[0]);
    });
  });
}

