import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = JSON.parse(<string>process.env.SERVICE_KEY);

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

export { db };