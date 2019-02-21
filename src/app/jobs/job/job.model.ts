import { Task } from './task.model';

export interface Job {
    id?: number,
    name?: string,
    active?: boolean,
    parentJob?: Job,
    tasks?: Task[],
}