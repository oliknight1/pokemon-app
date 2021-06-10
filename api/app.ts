import express from 'express';
import cors  from 'cors';
import { pokemonRouter } from './controllers/routes/pokemon';

export const app = express();

app.use( cors() );
app.use( express.json() );

app.use( '/api/pokemon/', pokemonRouter );
