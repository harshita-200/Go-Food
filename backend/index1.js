const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const Razorpay=require('razorpay');
const app = express();
const port = 5000;
const LogInCollection = require("./db");


// Set up CORS middleware
app.use(cors({
  origin: ['http://localhost:3000','https://go-food-front-rosy.vercel.app'], // Allow requests from these origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id:'rzp_test_DTCs5mydIhBI8p',
      key_secret:'W2bREnCs1QKq1MhEJl9f95HV',
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});
app.post('/order/validate',async(req,res)=>{
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
  
  const sha=crypto.createname("sha256",W2bREnCs1QKq1MhEJl9f95HV);
  sha.update(`${razorpay_order_id} | ${razorpay_payment_id}`);
  const digest=sha.digest("hex");
  if(digest!==razorpay_signature)
    return res.status(400).json({msg:"Transaction Failed"});
  res.json({
       msg:"success",
       orderId:razorpay_order_id,
       paymentId:razorpay_payment_id
  });
});
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));

app.get('/', (req, res) => {
  res.send('Hello World!')
}); 

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Page Not Found' });
});

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
