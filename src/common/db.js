import Dexie from "dexie";

export const db = new Dexie('plannerDatabase');
db.version(1).stores({
    workTasks: 'id, task, status, date',
    workoutConfigs: 'id, type, rounds, time, date',
    sweatTasks: 'id, task, weight, status, round_id, date, reps',
    personalTasks: 'id, task, status, date',
    warmupTasks: 'id, task, status, date, warmup'
});