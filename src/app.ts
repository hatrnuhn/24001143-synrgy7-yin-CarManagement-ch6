import express from 'express';
import path from 'path';
import apiRouter from './routes';
import { printRequest } from './controllers/middlewares';
import dotenv from 'dotenv';
import { knexSnakeCaseMappers, Model } from 'objection';
import config from './knexfile';
import knex from 'knex';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';
const connection = process.env.DATABASE_URL;
const port = process.env.port || 3000;

// connects objection to postgres through knex
Model.knex(knex({...config[environment as keyof typeof config], connection, ...knexSnakeCaseMappers()}));

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use('/api', printRequest, apiRouter);

app.listen(port, () => console.log('Running on port: ', port));