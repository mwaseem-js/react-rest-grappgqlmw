import axios from 'axios';

// Create an Axios instance
const restClient = axios.create({
  baseURL: '/api', // Replace with your actual REST API base URL
  timeout: 10000, // 10 seconds timeout
});

// Add interceptors for exponential backoff retries and error normalization
restClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    if (!config || !response || response.status < 500) {
      return Promise.reject(error);
    }

    // Implement exponential backoff retries
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= 3) {
      return Promise.reject(error);
    }

    config.__retryCount += 1;
    const delay = Math.pow(2, config.__retryCount) * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    return restClient(config);
  }
);

export default restClient;