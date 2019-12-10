import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

export const getListAF = functions
.region('europe-west1')
.https.onCall(async (data, context) => {
    const films = await admin.firestore().collection('films').get();
    
    return films.docs.map(doc => {
        return {
            gtin: doc.data().gtin,
            title: doc.data().title,
            subtitle: doc.data().subtitle,
            authors: doc.data().authors,
            thumbnails: [ doc.data().thumbnails[0] ]
        }
    });
});

export const getListHC = functions
.region('europe-west1')
.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', "*")
    response.set('Access-Control-Allow-Methods', 'GET')
    admin.firestore().collection('films').get()
    .then(snapshot => {
        response.send(snapshot.docs.map(doc => {
            return {
                gtin: doc.data().gtin,
                title: doc.data().title,
                subtitle: doc.data().subtitle,
                authors: doc.data().authors,
                thumbnails: [ doc.data().thumbnails[0] ]
            }
        }))
    })
    .catch(error => {
        console.log(error)
        response.status(500).send(error)
    })
});

export const getListAll = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', "*")
    response.set('Access-Control-Allow-Methods', 'GET')
    admin.firestore().collection('films').get()
    .then(snapshot => {
        response.send(snapshot.docs.map(doc => doc.data()))
    })
    .catch(error => {
        console.log(error)
        response.status(500).send(error)
    } )
});
