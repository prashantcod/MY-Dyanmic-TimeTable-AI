import { config } from 'dotenv';
config({ path: `.env.local`, override: true });
config();


import '@/ai/flows/summarize-timetable-conflicts.ts';
