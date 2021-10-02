/* eslint-disable no-console */
import app from '../app';

const PORT = 3002;

app.listen(PORT, () => {
  console.log('Starting product-service  on port ' + PORT);
});
