import axios from 'axios'

const BASE_URL = "https://contact-app-backend-api-new.vercel.app/api";

export function getAllContacts(){

    return axios.get(`${BASE_URL}/contacts`);
}

export function addMyContact(data){
    return axios.post(`${BASE_URL}/create`, data);
}

export function deleteContact(id){
    return axios.delete(`${BASE_URL}/delete/${id}`);
}

export function updateMyContact(data,id){
    console.log(data + '   ' + id);
    return axios.put(`${BASE_URL}/update/${id}`, data);
}

export function searchContact(query){
    console.log(query);
    return axios.get(`${BASE_URL}/search?q=${query}`);
}