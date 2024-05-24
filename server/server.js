// ===== IMPORT PACKAGES ====== //
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const morgan = require('morgan');

// ===== SERVER SETUP ====== //
const port = process.env.PORT || 5575;

// Apply logging middleware using Morgan in 'dev' mode
server.use(morgan('tiny'));
server.use(middlewares); // Use default middlewares
server.use(router); // Use router for request handling 
server.listen(port, () => {
    console.log(`JSON Server is running on Port ${port}`);
})