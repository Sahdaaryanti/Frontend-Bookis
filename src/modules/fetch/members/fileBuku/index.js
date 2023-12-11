import { instance } from '../../../axios/index';

// Create a new file buku
const createFileBuku = async (formData) => {
  try {
    const response = await instance.post('/file-buku', formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an existing file buku
const updateFileBuku = async (fileId, formData) => {
  try {
    const response = await instance.put(`/file-buku/${fileId}`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all file buku
const getAllFileBuku = async () => {
  try {
    const response = await instance.get('/file-buku/all');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { createFileBuku, updateFileBuku, getAllFileBuku };
