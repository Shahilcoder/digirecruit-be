import fs from 'fs';
import { Request, Response } from "express";
import { db, bucket } from "./db.controllers";

const getCandidateList = async (req: Request, res: Response) => {
    try {
        const cands = db.collection("candidates");
        const data = [];
        const snapshot = await cands.get();

        if (snapshot.empty) {
            res.status(404).json({ "message": "No Candidates" });
        } else {
            for (let doc of snapshot.docs) {
                data.push({ name: doc.data().name, username: doc.data().username });
            }

            res.status(200).json({ "data": data });
        }
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const registerCandDetails = async (req: Request, res: Response) => {
    try {
        const { username, name, age } = req.body;
        const files: any = req.files;

        const cands = db.collection("candidates");
        const snapshot = await cands.where('username', '==', username).get();

        if (snapshot.empty) {
            const docRef = cands.doc();
            let data: any = { username, name, age };

            if (files[0].originalname.split('.')[1] === 'pdf') {
                let file = files[0];
                let options = {
                    destination: `candidates/${username}/${file.filename}.${file.originalname.split('.')[1]}`,
                    // preconditionOpts: {ifGenerationMatch: 0},
                };
                data.resume = options.destination;
                await bucket.upload(file.path, options);

                file = files[1];
                options = {
                    destination: `candidates/${username}/${file.filename}.${file.originalname.split('.')[1]}`,
                    // preconditionOpts: {ifGenerationMatch: 0},
                };
                data.photo = options.destination;
                await bucket.upload(file.path, options);
            } else {
                let file = files[0];
                let options = {
                    destination: `candidates/${username}/${file.filename}.${file.originalname.split('.')[1]}`,
                    // preconditionOpts: {ifGenerationMatch: 0},
                };
                data.photo = options.destination;
                await bucket.upload(file.path, options);

                file = files[1];
                options = {
                    destination: `candidates/${username}/${file.filename}.${file.originalname.split('.')[1]}`,
                    // preconditionOpts: {ifGenerationMatch: 0},
                };
                data.resume = options.destination;
                await bucket.upload(file.path, options);
            }

            await docRef.set(data);
        } else {
            let data: any = { username, name, age };

            if (files[0].originalname.split('.')[1] === 'pdf') {
                let file = files[0];
                let options = {
                    destination: `candidates/${username}/${file.filename}.${file.originalname.split('.')[1]}`,
                    // preconditionOpts: {ifGenerationMatch: 0},
                };
                data.resume = options.destination;
                await bucket.upload(file.path, options);

                file = files[1];
                options = {
                    destination: `candidates/${username}/${file.filename}.${file.originalname.split('.')[1]}`,
                    // preconditionOpts: {ifGenerationMatch: 0},
                };
                data.photo = options.destination;
                await bucket.upload(file.path, options);
            } else {
                let file = files[0];
                let options = {
                    destination: `candidates/${username}/${file.filename}.${file.originalname.split('.')[1]}`,
                    // preconditionOpts: {ifGenerationMatch: 0},
                };
                data.photo = options.destination;
                await bucket.upload(file.path, options);

                file = files[1];
                options = {
                    destination: `candidates/${username}/${file.filename}.${file.originalname.split('.')[1]}`,
                    // preconditionOpts: {ifGenerationMatch: 0},
                };
                data.resume = options.destination;
                await bucket.upload(file.path, options);
            }

            await cands.doc(snapshot.docs[0].id).delete();
            await cands.doc(snapshot.docs[0].id).set(data);
        }

        // remove the uploads dir recursively
        fs.rmSync('uploads', { recursive: true, force: true });
        // create empty uploads dir
        fs.mkdir('uploads', () => { });

        res.status(201).json({ "message": "Details registered" });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const getCandDetails = async (req: Request, res: Response) => {
    try {
        const { username } = req.query;

        const cands = db.collection("candidates");
        const snapshot = await cands.where('username', '==', username).get();

        if (snapshot.empty) {
            res.status(404).json({ "message": "Candidate does not exist" });
        } else {
            const candData = snapshot.docs[0].data();
            const options = { action: 'read', expires: Date.now() + 1000 * 60 * 5 };

            if (!(typeof candData.resume === "undefined")) {
                const resumeFile = bucket.file(candData.resume);
                const exists = await resumeFile.exists();
                if (exists) {
                    const [resumeUrl] = await resumeFile.getSignedUrl(options);
                    candData.resumeUrl = resumeUrl;
                }
            }

            if (!(typeof candData.photo === "undefined")) {
                const photoFile = bucket.file(candData.photo);
                const exists = await photoFile.exists();
                if (exists) {
                    const [photoUrl] = await photoFile.getSignedUrl(options);
                    candData.photoUrl = photoUrl;
                }
            }

            res.status(200).json({ "data": candData });
        }
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

export { getCandidateList, registerCandDetails, getCandDetails };