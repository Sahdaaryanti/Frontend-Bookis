import { instance } from '../../../axios/index';

// Create a new file buku
const createFileBuku = async (fileData) => {
  try {
    // Ganti endpoint sesuai dengan endpoint ImageKit di sisi server
    const response = await instance.post('/https://ik.imagekit.io/duz42vuyd', fileData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an existing file buku
const updateFileBuku = async (fileId, fileData) => {
  try {
    // Ganti endpoint sesuai dengan endpoint ImageKit di sisi server
    const response = await instance.put(`/https://ik.imagekit.io/duz42vuyd/${fileId}`, fileData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all file buku
const getAllFileBuku = async () => {
  try {
    // Ganti endpoint sesuai dengan endpoint ImageKit di sisi server
    const response = await instance.get('/https://ik.imagekit.io/duz42vuyd/all');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { createFileBuku, updateFileBuku, getAllFileBuku };
