const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    const { order_data, order_date, email } = req.body;

    if (!order_data || !order_date || !email) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        // Insert order_date at the beginning of order_data array
        order_data.splice(0, 0, { Order_date: order_date });

        // Check if the email already exists in the database
        let eId = await Order.findOne({ 'email': email });

        if (eId === null) {
            // If email does not exist, create a new order
            await Order.create({
                email,
                order_data: [order_data]
            });
            res.json({ success: true });
        } else {
            // If email exists, update the order_data
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data: order_data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, message: "Server Error", error: error.message });
    }
});

router.post('/myOrderData', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
        let eId = await Order.findOne({ 'email': email });

        if (eId) {
            res.json({ success: true, orderData: eId });
        } else {
            res.status(404).json({ success: false, message: "Order not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, message: "Server Error", error: error.message });
    }
});

module.exports = router;
