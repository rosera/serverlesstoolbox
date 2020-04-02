const admin = require( 'firebase-admin' );

let serviceAccount = require( './barkbark-key.json' );

admin.initializeApp( {
    credential: admin.credential.cert( serviceAccount )
  } );

let db = admin.firestore();

function getDogs() {
    db.collection( "dogs" ).get()
    .then( querySnapshot => {
        return querySnapshot.docs.map( doc => {
            console.log( { id: doc.id, ...doc.data() } );
            return { id: doc.id, ...doc.data() }
        });
    }
    );
};