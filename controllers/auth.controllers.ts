import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { db } from './db.controllers';
dotenv.config();

const signup = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const users = db.collection('users');

        const snapshot = await users.where('username', '==', username).get();

        if (snapshot.empty) {
            const docRef = users.doc();

            const passwordHash = await bcrypt.hash(password, <number>parseInt(<string>process.env.SALT));

            await docRef.set({ username, password: passwordHash });

            res.status(201).json({ "message": "User created successfully" });
        } else {
            res.status(403).json({ "message": "User already exists" });
        }
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const users = db.collection('users');

        const snapshot = await users.where('username', '==', username).get();

        if (snapshot.empty) {
            res.status(404).json({ "message": "User does not exist" });
        } else {
            const data = snapshot.docs[0].data();

            const result = await bcrypt.compare(password, data.password);

            if (result) {
                res.status(200).json({ "message": "Login successful" });
            } else {
                res.status(401).json({ "message": "Incorrect Password" });
            }
        }
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

export { signup };