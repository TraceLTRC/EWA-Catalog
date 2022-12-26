import { FirebaseOptions, getApps, initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAnalytics } from 'firebase/analytics'
import { getPerformance } from 'firebase/performance'

export default function createFirebaseApp() {
    const clientCreds: FirebaseOptions = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }

    if (getApps().length <= 0) {
        const app = initializeApp(clientCreds);
        const appCheck = initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY as string),
            isTokenAutoRefreshEnabled: true,
        })

        if (typeof window !== 'undefined') {
            getAnalytics();
            getPerformance();
        }

        return app;
    } 
}