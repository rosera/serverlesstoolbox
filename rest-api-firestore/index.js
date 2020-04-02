const admin = require( 'firebase-admin' );

let serviceAccount = require( './barkbark-key.json' );

admin.initializeApp( {
    credential: admin.credential.cert( serviceAccount )
  } );

let db = admin.firestore();

async function getDogs() {
    let response = await db.collection( "dogs" ).get()
    return response.docs.map( doc => {
        return { id: doc.id, ...doc.data() }
    })
}