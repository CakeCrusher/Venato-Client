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
  return axios.post(`${url}/user/meals`, { user_id });
}

export function consume(user_id, meal_id) {}

export function getDailyConsumption(user_id, start_date, end_date) {
  return axios.get(`${url}/meal`, {
    params: { user_id, start_date, end_date },
  });
}

export function getPrediction(groceries) {
  console.log("groceries", groceries);
  return axios.post(`http://sv.tangyisheng2.com:8080/health`, {
    groceries,
    // '[{"id":5,"amount_g":11000.0,"category":"BagelsandEnglishmuffins"},{"id":10,"amount_g":30.0,"category":"Candycontainingchocolate"},{"id":46,"amount_g":102.600003,"category":"Chickenwholepieces"},{"id":4,"amount_g":4.0,"category":"Coffee"},{"id":50,"amount_g":525.599976,"category":"Coldcutsandcuredmeats"},{"id":42,"amount_g":100.0,"category":"Creamandcreamsubstitutes"},{"id":52,"amount_g":262.799988,"category":"Notincludedinafoodcategory"},{"id":44,"amount_g":78.780003,"category":"Otherstarchyvegetables"},{"id":48,"amount_g":929.599976,"category":"Ricemixeddishes"}]',
  });
}
