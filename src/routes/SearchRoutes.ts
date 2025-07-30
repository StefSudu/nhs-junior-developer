import { search } from '../controller/SearchController';

const searchRouter = require('express').Router();

searchRouter.post('/search', search);

export { searchRouter };