import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const [maya, jordan, priya, sam] = await User.create([
            { name: 'Maya Chen', email: 'maya@example.com', role: 'athlete', weeklyGoalMinutes: 180 },
            { name: 'Jordan Ellis', email: 'jordan@example.com', role: 'athlete', weeklyGoalMinutes: 240 },
            { name: 'Priya Nair', email: 'priya@example.com', role: 'coach', weeklyGoalMinutes: 300 },
            { name: 'Sam Rivera', email: 'sam@example.com', role: 'athlete', weeklyGoalMinutes: 150 },
        ]);
        const [trailblazers, pulseCrew] = await Team.create([
            { name: 'Trailblazers', color: '#197935', members: [maya._id, jordan._id], weeklyPoints: 920 },
            { name: 'Pulse Crew', color: '#e8590c', members: [priya._id, sam._id], weeklyPoints: 780 },
        ]);
        await Activity.create([
            { user: maya._id, type: 'run', durationMinutes: 42, calories: 390, completedAt: new Date('2026-07-20T07:30:00Z') },
            { user: jordan._id, type: 'cycle', durationMinutes: 55, calories: 510, completedAt: new Date('2026-07-20T18:15:00Z') },
            { user: priya._id, type: 'strength', durationMinutes: 48, calories: 330, completedAt: new Date('2026-07-21T06:45:00Z') },
            { user: sam._id, type: 'yoga', durationMinutes: 30, calories: 140, completedAt: new Date('2026-07-21T17:00:00Z') },
        ]);
        await Leaderboard.create([
            { user: maya._id, team: trailblazers._id, points: 520, rank: 1, period: '2026-W30' },
            { user: jordan._id, team: trailblazers._id, points: 400, rank: 2, period: '2026-W30' },
            { user: priya._id, team: pulseCrew._id, points: 430, rank: 3, period: '2026-W30' },
            { user: sam._id, team: pulseCrew._id, points: 350, rank: 4, period: '2026-W30' },
        ]);
        await Workout.create([
            { title: 'Morning Momentum', focus: 'Full body', difficulty: 'beginner', durationMinutes: 25, exercises: ['Bodyweight squats', 'Incline push-ups', 'Bird dogs'] },
            { title: 'Runner Power', focus: 'Lower body', difficulty: 'intermediate', durationMinutes: 35, exercises: ['Walking lunges', 'Single-leg deadlifts', 'Calf raises'] },
            { title: 'Core Control', focus: 'Core', difficulty: 'advanced', durationMinutes: 30, exercises: ['Plank reaches', 'Hollow holds', 'Russian twists'] },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
