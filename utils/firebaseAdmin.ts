import * as admin from "firebase-admin"

if (!admin.app.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY,
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