import axios from "axios";
const url = "http://sv.tangyisheng2.com:4999";

export function createUser(username, password) {
  return axios.post(`${url}/user/signup`, {
    username,
    password,
  });
}

export function getUser(username, password) {
  return axios.post(`${url}/user/login`, {
    username,
    password,
  });
}

// type groceries = [{nutrition_id: number, amount_g: number}, ...]
export function addGroceries(userid, groceries) {
  return axios.post(`${url}/grocery`, {
    userid,
    groceries,
  });
}

export function getGroceries(user_id) {
  return axios.get(`${url}/grocery`, { params: { user_id } });
}

// types inputs = string[]
export function searchGroceries(inputs) {
  return axios.post(`${url}/grocery/search`, { keyword: inputs });
}

// type groceries = [{nutrition_id: number, amount_g: number}, ...]
export function createMeal(user_id, name, ingredient) {
  return axios.post(`${url}/meal`, { user_id, name, ingredient });
}

export function getMeals(user_id) {
  return axios.get(`${url}/meal`);
}

export function consume(user_id, meal_id) {}

export function getDailyConsumption(user_id) {}
