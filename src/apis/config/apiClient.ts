import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
});

apiClient.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (
      error.response &&
      error.response.data &&
      error.response.status === 401
    ) {
      try {
        const reissueRequestDto = {
          accessToken: sessionStorage.getItem('accessToken'),
          refreshToken: sessionStorage.getItem('refreshToken'),
        };

        const reissueUrl =
          process.env.REACT_APP_API_URL + '/api/v1/auth/reissue';

        const { data } = await axios.post(reissueUrl, reissueRequestDto);

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('refreshToken', data.refreshToken);

        originalConfig.headers['Authorization'] = `Bearer ${data.accessToken}`;

        return apiClient.request(originalConfig);
      } catch (reissueError) {
        console.error('토큰 재발급 실패:', reissueError);
        sessionStorage.clear();
      }
    } else if (error.response && error.response.status === 401) {
      sessionStorage.clear();
    }

    return Promise.reject(error);
  },
);

export default apiClient;
