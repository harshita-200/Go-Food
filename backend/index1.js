
const express = require('express');
const connectDB=require('./db');
const cors=require('cors');
const app = express();
const port = 5000;
const LogInCollection = require("./db")

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","https://go-food-zeta.vercel.app/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})
app.use(cors());
app.use(express.json());
app.use('/api',require("./routes/CreateUser"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrderData"));
app.get('/', (req, res) => {
  res.send('Hello World!')
}); 
const startServer = async () => {
  await connectDB()
  app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
  })
}


startServer();