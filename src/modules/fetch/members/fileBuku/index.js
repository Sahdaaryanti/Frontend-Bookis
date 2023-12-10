import { instance } from '../../../axios/index';

// Create a new file buku
const createFileBuku = async (fileData) => {
  try {
    const response = await instance.post('/file-buku', fileData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an existing file buku
const updateFileBuku = async (fileId, fileData) => {
  try {
    const response = await instance.put(`/file-buku/${fileId}`, fileData);
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
const deleteFileBuku = async (fileId) => {
  try {
    const response = await instance.delete(`/file-buku/${fileId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { createFileBuku, updateFileBuku, getAllFileBuku, deleteFileBuku };