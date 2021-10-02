/* eslint-disable no-console */
import app from '../app';

const PORT = 3001;

app.listen(PORT, () => {
  console.log('Starting cart-service on port ' + PORT);
});
