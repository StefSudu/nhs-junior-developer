import { authRouter } from './routes/AuthenticationRoutes';
import { searchRouter } from './routes/SearchRoutes';
import authenticateToken from './middlewares/CheckToken';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local'});
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.listen(port);

app.use('/auth', authRouter);

app.use('/user', authenticateToken, searchRouter);