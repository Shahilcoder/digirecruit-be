import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import { authRouter } from './routes/auth.routes';
import { candRouter } from './routes/candidate.routes';

// create app
const app: Express = express();
const port = process.env.PORT || 5000;

// configure app
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({}));

// configure routes
app.use('/auth', authRouter);
app.use('/candidate', candRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Digirecruit Backend');
});

// listen on port
app.listen(port, () => {
    console.log('[server]: running at ' + port);
});
