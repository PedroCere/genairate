const apiClient = {
  get: async (url) => {

    console.warn('apiClient.get called with url:', url);
    return { data: {} };
  },
  post: async (url, body) => {

    console.warn('apiClient.post called with url:', url, 'body:', body);
    return { data: { rewrittenText: 'Rewritten text placeholder' } };
  },
  patch: async (url, body) => {
  
    console.warn('apiClient.patch called with url:', url, 'body:', body);
    return { data: {} };
  }
};

export default apiClient;
