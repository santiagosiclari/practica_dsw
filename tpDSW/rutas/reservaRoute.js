import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.status(201).json({msg: "Todo ok"});
});

export default router;