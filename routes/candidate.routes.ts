import { Router } from "express";
import { getCandDetails, getCandidateList, registerCandDetails } from "../controllers/candidate.controllers";
import { upload } from "../middleware/candidate.middleware";

const candRouter: Router = Router();

candRouter.get('/', getCandidateList);
candRouter.post('/details', upload.any(), registerCandDetails);
candRouter.get('/details', getCandDetails);

export { candRouter };