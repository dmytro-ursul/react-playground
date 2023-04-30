const AppSettings = {
  apiUrl:
    process.env.NODE_ENV === 'test'
      ? process.env.REACT_APP_MOCK_API_URL
      : process.env.REACT_APP_API_URL,
};

export default AppSettings;
