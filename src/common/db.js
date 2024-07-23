import Dexie from "dexie";

export const db = new Dexie('plannerDatabase');
db.version(1).stores({
    workTasks: 'id, task, status, date',
    sweatTasks: 'id, task, weight, status, date, reps',
    personalTasks: 'id, task, status, date',
    warmupTasks: 'id, task, status, date, warmup'
});