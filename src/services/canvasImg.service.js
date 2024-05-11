import axios from "axios";

// eslint-disable-next-line no-undef
const BASE_URL = `${process.env.BASE_URL}/images`;

export const getAllImages = () => {
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

export const getAllImagesByUser = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}?userId=${userId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateImages = (ImagesId, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASE_URL}/${ImagesId}`, data)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addImages = (data) => {
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

export const deleteImages = (ImagesId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASE_URL}/${ImagesId}`)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
