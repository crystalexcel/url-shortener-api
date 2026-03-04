const app = require('./app');
const { loadEnv } = require('./config/env');

const env = loadEnv();
const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`URL Shortener API listening on port ${PORT}`);
});
