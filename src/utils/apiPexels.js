import axios from 'axios';

const pexelsApi = axios.create({
  baseURL: 'https://api.pexels.com/v1/',
});

export const getImages = async (keyword, page) => {
  const result = { total: 0, images: [] };
  const params = getQueryParams(keyword, page);

  // Get images from API
  const { data } = await pexelsApi.get('search', {
    params,
    headers: {
      Authorization: process.env.REACT_APP_PEXELX_KEY,
    },
  });
  // Show error if nothing found
  if (data.total_results === 0) throw new Error('Nothig found');

  result.total = data.total_results;
  result.images = data.photos;

  return result;
};

function getQueryParams(keyword, page) {
  const params = {
    query: keyword,
    page: page,
    per_page: 12,
    orientation: 'landscape',
  };

  return new URLSearchParams(params);
}
