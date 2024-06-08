import Dexie from "dexie";

export const db = new Dexie('plannerDatabase');
db.version(1).stores({
    workTasks: 'id, task, status, date',
});