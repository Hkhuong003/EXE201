import axios from 'axios';

const api = axios.create({
  baseURL: 'https://exe201tourbook.azurewebsites.net/', // Thay bằng URL API của bạn
});

export const getData = async () => {
  const response = await api.get('/endpoint');
  return response.data;
};