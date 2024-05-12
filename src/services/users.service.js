import axios from "axios";

// eslint-disable-next-line no-undef
const BASE_URL = `${process.env.BASE_URL}/users`;

export const getAllUser = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(BASE_URL)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateUser = (UserId, data) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${BASE_URL}/${UserId}`, data)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addUser = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL, data)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteUser = (UserId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASE_URL}/${UserId}`)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}?email=${email}&password=${password}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUserById = (UserId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}?id=${UserId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
