const mysql = require('mysql');
const express = require('express');
const app = express();
app.use(express.static('public'));
const admin = require('firebase-admin');
admin.initializeApp();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Pet Theory app and REST API listening on port', port);
});

// Usage: GET /api/appointments will return
// appointments for the calling user.
// This call will fail if an appropriate JWT token
// is not found in the authorization header.
app.get('/api/appointments', async (req, res) => {
  const idToken = req.headers['authorization'];
  if(!idToken) {
    return res.status(403).send('Unauthorized');
  }
  const auth = admin.auth();
  const result = await auth.verifyIdToken(idToken);
  const requestingUserId = result.uid;
  try {
    const appointments = await getAppointments(requestingUserId);
    return res.json({status: 'success', data: {appointments: appointments}});
  }
  catch (ex) {
    return res.status(500).json({status: 'error', message: ex});
  }
});

async function getAppointments(userId) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM appointments where user_id=?';
    getDbPool().query(sql, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return reject(getErrorMessage(err));
      }
      
      resolve(results);
    })
  })
}

function getErrorMessage(err) {
  return err.sqlMessage || err.code || err;
}

let cachedDbPool;

function getDbPool() {
  if (!cachedDbPool) {
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
