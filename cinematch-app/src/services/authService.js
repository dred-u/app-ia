import axios from "axios";

export const baseURL = 'http://localhost:8000/api' //IP DEL SERVIDOR DJANGO

export const registerRequest = async (data) => axios.post(`${baseURL}/register`, data);

export const loginRequest = async (data) => axios.post(`${baseURL}/login`, data);

export const updateUser = async (id, data) => axios.put(`${baseURL}/users/${id}`, data);

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/users/${id}`);
    return response;
  }catch (error) {
    throw error;
  }
}