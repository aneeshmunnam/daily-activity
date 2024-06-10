import Dexie from "dexie";

export const db = new Dexie('plannerDatabase');
db.version(1).stores({
    workTasks: 'id, task, status, date',
    gymTasks: 'id, task, weight, status, date',
    personalTasks: 'id, task, status, date'
});