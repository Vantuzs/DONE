import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const getTasks = async()=> await httpClient.get('/tasks')

export const deleteTaskById = async(taskId)=> await httpClient.delete(`/tasks/${taskId}`);

export const createTask = async(taskBody) => await httpClient.post('/tasks',taskBody)

export const setIsDoneTask = async(taskId,taskBody) => await httpClient.put(`tasks/${taskId}`,taskBody);