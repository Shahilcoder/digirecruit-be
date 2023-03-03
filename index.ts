import express, { Express, Request, Response } from 'express';
import cors from 'cors';

// create app
const app: Express = express();
const port = process.env.PORT || 5000;

// configure app
app.use(express.json());
app.use(cors({}));

app.get('/', (req: Request, res: Response) => {
    res.send('Digirecruit Backend');
});

app.listen(port, () => {
    console.log('[server]: running at ' + port);
});
