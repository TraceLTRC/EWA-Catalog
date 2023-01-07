type EnvKey = {
    privateKey: string;
}

import * as admin from "firebase-admin"

if (admin.app.length <= 1) {
    const unparsedKey = process.env.FIREBASE_PRIVATE_KEY

    if (typeof unparsedKey === 'undefined') throw "Firebase's private key undefined!"

    const { privateKey } = JSON.parse(unparsedKey) as EnvKey

    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: privateKey,
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            }),
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        })
    } catch (e) {
        console.error("Unable to initialize app!");
        console.log(e)
    }
}

export default admin;