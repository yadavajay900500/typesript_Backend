import express, { Express, Request, Response } from 'express';
const app: Express = express();
import server from './server'
const PORT = process.env.PORT || 5050;






server.listen(PORT, () => {
  console.log(`Server Start at PORT: ${PORT}`)
})







