import express from 'express'
import connect from './db/index.js'
import dotenv from 'dotenv'
import {app} from './app.js'
dotenv.config({
  path:'./.env'
})


const port = process.env.PORT || 7000
connect().
then(()=>{
  app.listen(port, () => {
            console.log(`app listening on port ${port}`)
        })
}).catch((err) => {
  console.error('Database connection failed:', err)
})



