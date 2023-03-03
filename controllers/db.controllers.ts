import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
const { getStorage } = require('firebase-admin/storage');
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = JSON.parse(<string>process.env.SERVICE_KEY);

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'gs://digirecruit-4e1c9.appspot.com'
});

const db = getFirestore();
const bucket = getStorage().bucket();

export { db, bucket };