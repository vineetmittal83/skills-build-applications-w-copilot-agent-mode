import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const apiRouter = Router();

apiRouter.get('/', (_request, response) => {
  response.json({
    service: 'octofit-tracker-api',
    routes: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

apiRouter.get('/users/', async (_request, response) => {
  response.json(await User.find().sort({ name: 1 }));
});

apiRouter.get('/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name email').sort({ weeklyPoints: -1 }));
});

apiRouter.get('/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'name').sort({ completedAt: -1 }));
});

apiRouter.get('/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user', 'name').populate('team', 'name').sort({ rank: 1 }));
});

apiRouter.get('/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ difficulty: 1, title: 1 }));
});

export default apiRouter;