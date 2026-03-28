const express = require('express');
const ruleController = require('./rule.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', ruleController.getAllRules);
router.get('/:id', ruleController.getRuleById);
router.post('/', roleMiddleware(['admin']), ruleController.createRule);
router.put('/:id', roleMiddleware(['admin']), ruleController.updateRule);
router.delete('/:id', roleMiddleware(['admin']), ruleController.deleteRule);

module.exports = router;
