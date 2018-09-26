// server.js

// first we import our dependencies…
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {
	getAllPlayers,
	getPlayerWithFinesByPlayerId,
	postPlayer
} from './actions/players';
import {
	postFine,
	getUnpaidByPlayerId,
	getPaidByPlayerId,
	getAllByPlayerId,
	payFinesById
} from './actions/fines';
import { getImage } from './actions/images';
import cors from 'cors';
dotenv.config();
// import {
// 	getSecret
// } from './secrets';

// and create our instances

const app = express();
app.use(cors());
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

// db config -- set your URI from mLab in secrets.js
mongoose.connect(process.env.DB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/players/', getAllPlayers);
router.get('/players/:id', getPlayerWithFinesByPlayerId);
router.post('/players/', postPlayer);

router.post('/fines', postFine);
router.get('/fines/:id', getAllByPlayerId);
router.post('/fines/pay', payFinesById);

router.get('/unpaidFines/:id', getUnpaidByPlayerId);
router.get('/paidFines/:id', getPaidByPlayerId);

router.get('/images/:imageName', getImage);

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));