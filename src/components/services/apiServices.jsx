function getData(value, page) {
    const key = '24305587-c8482d095dc3290807d6dab36';
    return fetch(
      `https://pixabay.com/api/?key=${key}&&image_type=photo&orientation=horizontal&page=${page}&per_page=12&q=${value}`
    ).then((res) => res.json());
  }
  const api = { getData };
  
  export default api;