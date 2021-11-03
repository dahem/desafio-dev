import express from 'express';
import authPermission from '../middleware/auth.js';
import * as cnabController from '../controllers/cnab.js';
const router = express.Router();

router.post('/upload', authPermission, async (req, res) => {
  try {
    const file = req.files.file;
    const userId = req.user.sub; 
    if(file.name !== 'CNAB.txt') {
      res.status(500).json({
        status: "error",
        data: 'Wrong file',
      });
      return;
    }
    await cnabController.uploadCNAB(file, userId);
    res.json({ data: true, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      data: error.message,
    });
  } 
});

router.get('/', authPermission, async (req, res) => {
  try {
    const userId = req.user.sub;
    const data = await cnabController.listCNAB(userId);
    res.json({ data, status: "success" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error.message,
    });
  } 
});

export default router;