import express, { Express, Request, Response } from 'express';
const app: Express = express();
import server from './server'
const PORT: number =5050;






server.listen(PORT, () => {
  console.log(`Server Start in PORT ${PORT}`)
})







