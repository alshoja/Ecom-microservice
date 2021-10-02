/* eslint-disable no-console */
import app from '../app';

const PORT = 3001;

app.listen(PORT, () => {
  console.log('Starting car-service on port ' + PORT);
});
