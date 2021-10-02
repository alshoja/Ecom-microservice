/* eslint-disable no-console */
import app from '../app ';

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Starting auth-service on port ' + PORT);
});
