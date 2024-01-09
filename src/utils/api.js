import axios from 'axios';
import { toast } from 'react-toastify';

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

export const getImages = async (keyword, page) => {
  const result = { total: 0, images: [] };
  const params = getQueryParams(keyword, page);

  try {
    // Get images from API
    const { data } = await pixabayApi.get('', { params });
    // Show error if nothing found
    if (data.total === 0) throw new Error('Nothig found');

    result.total = data.totalHits;
    result.images = data.hits;
  } catch (error) {
    // Show error
    toast.error(error.message);
  }

  return result;
};

function getQueryParams(keyword, page) {
  const params = {
    key: process.env.REACT_APP_PIXABAY_KEY,
    q: keyword,
    p: page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  };

  return new URLSearchParams(params);
}
