const receiptService = require('./receipt.service');

const receiptController = {
  uploadReceipt: async (req, res, next) => {
    try {
      // Handle file upload logic
      const receipt = await receiptService.saveReceipt(req.file, req.user?.id);
      res.status(201).json(receipt);
    } catch (error) {
      next(error);
    }
  },

  extractOCR: async (req, res, next) => {
    try {
      const ocrData = await receiptService.extractOCR(req.params.receiptId);
      res.status(200).json(ocrData);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = receiptController;
