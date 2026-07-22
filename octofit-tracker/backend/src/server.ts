import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/', (_request, response) => {
  response.json({
    service: 'octofit-tracker-api',
    apiBaseUrl,
    api: `${apiBaseUrl}/api`,
  });
});

app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', apiBaseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});