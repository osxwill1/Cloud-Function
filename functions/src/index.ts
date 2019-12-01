import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const getAvatar = functions.https.onRequest((request, response) => {
    admin.firestore().collection('films').get()
    .then(snapshot => {
        response.send(snapshot.docs.map(doc => doc.data()))
    })
    .catch(error => {
        console.log(error)
        response.status(500).send(error)
    } )
})

export const getList = functions.https.onRequest((request, response) => {
    admin.firestore().collection('films').get()
    .then(snapshot => {
        response.send(snapshot.docs.map(doc => doc.data()))
    })
    .catch(error => {
        console.log(error)
        response.status(500).send(error)
    } )
})