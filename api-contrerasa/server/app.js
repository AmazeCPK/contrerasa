import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/main';

// Route imports
import auth from './routes/auth';
import index from './routes/index';
import user from './routes/user';
import projects from './routes/projects.js';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/user', user);
app.use('/projects', projects);

// SErver
app.listen(config.port, () => {
	console.log(`Magic is happening on port ${config.port}`)
})