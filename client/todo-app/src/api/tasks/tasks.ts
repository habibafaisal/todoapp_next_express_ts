import { apiPost, apiGet, apiPut, apiDelete } from "../apiHelper";

// API call to create a new task
export const createTask = async (userId: string, title: string, description: string, token: string | null) => {
    return apiPost("/todos/create", { userId, title, description }, token);
};

// API call to get all tasks for a user
export const getTasks = async (token: string | null) => {
    console.log({ token })
    return apiGet(`/todos`, token);
};

// API call to update a task
export const updateTask = async (taskId: string, updates: { title: string; description: string; completed: boolean }, token: string | null) => {
    return apiPut(`/todos/${taskId}`, updates, token);
};

// API call to delete a task
export const deleteTask = async (taskId: string, token: string | null) => {
    return apiDelete(`/todos/${taskId}`, token);
};
