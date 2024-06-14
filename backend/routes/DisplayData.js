const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        // Check if the global variables are defined
        if (!global.collection1 || !global.foodCateg) {
            throw new Error("Data not yet loaded");
        }
        console.log([global.collection1]);
        res.send([global.collection1, global.foodCateg]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
