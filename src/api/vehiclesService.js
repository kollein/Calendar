import axios from 'axios';

const process = {
  env: {
    VUE_APP_API_URL:
      'https://kia-netherlands-configurator.rd.gforcesinternal.co.uk/',
    VUE_APP_X_API_KEY: 'MCsgKfmL6W99if8zlZ5ns7Uzu1SosA7jueZzUOa9',
  },
};

export default axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
  timeout: 27000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': `${process.env.VUE_APP_X_API_KEY}`,
  },
});
