import axios from "axios";

// eslint-disable-next-line no-undef
const BASE_URL = `${process.env.BASE_URL}/canvas`;

export const getAllCanvas = () => {
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

export const updateCanvas = (canvasId, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASE_URL}/${canvasId}`, data)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addCanvas = (data) => {
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

export const deleteCanvas = (canvasId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASE_URL}/${canvasId}`)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/${userId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getCanvasById = (canvasId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}?id=${canvasId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const searchByEmail = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}?email=${email}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
