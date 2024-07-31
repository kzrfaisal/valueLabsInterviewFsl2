// two number as param, add them and send , add validation, authentication middleware

import express from 'express';
// import {} from 'middlewares'

const validateInputs = (req, res, next) => {
  const { a, b } = req.query;
  if (!(a && b)) {
    res.send('Invalid Inputs');
  }
  next();
};

const verifyToken = () => {
  // verify Token
  return true;
};

const authenticateUser = (req, res, next) => {
  const auth = req.header('Authorization');
  const token = ''; // auth.split(' ')[1]; in case of Bearer token
  if (verifyToken(token)) {
    next();
  } else {
    res.send(401, 'Unauthorized');
  }
};

const app = express();
const port = 4010;

app.use(authenticateUser);
app.use(validateInputs);

app.get('/', (req, res) => {
  let { a, b } = req.query;
  a = +a;
  b = +b;
  const sum = a + b;
  return res.send(`Sum of the a=${a} and b=${b} is ${sum}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
