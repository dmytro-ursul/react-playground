import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('An alligator approaches!');
});

app.listen(3003, () => console.log('Gator app listening on port 3000!'));
