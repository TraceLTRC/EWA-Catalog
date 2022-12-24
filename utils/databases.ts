import createFirebaseApp from "./firebaseClient";
import { getFirestore, collection, DocumentData, CollectionReference } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'
import { ImageCfg } from "../types/imageTypes";

createFirebaseApp();

const db = getFirestore();
const bucket = getStorage();

function createCollection<T = DocumentData>(collectionName: string) {
    return collection(db, collectionName) as CollectionReference<T>
}

export const imageCol = createCollection<ImageCfg>('images')
export const imageBucket = ref(bucket);
