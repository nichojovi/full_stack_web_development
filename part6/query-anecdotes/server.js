import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const validateAnecdote = (req, res, next) => {
  if (req.method === 'POST') {
    const { content } = req.body;
    if (!content || content.length < 5) {
      return res.status(400).json({
        error: 'Anecdote is too short (min 5 characters).'
      });
    }
  }
  next();
};

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(validateAnecdote);
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
