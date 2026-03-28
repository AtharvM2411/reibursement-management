const ruleService = require('./rule.service');

const ruleController = {
  getAllRules: async (req, res, next) => {
    try {
      const rules = await ruleService.getAllRules();
      res.status(200).json(rules);
    } catch (error) {
      next(error);
    }
  },

  getRuleById: async (req, res, next) => {
    try {
      const rule = await ruleService.getRuleById(req.params.id);
      res.status(200).json(rule);
    } catch (error) {
      next(error);
    }
  },

  createRule: async (req, res, next) => {
    try {
      const rule = await ruleService.createRule(req.body);
      res.status(201).json(rule);
    } catch (error) {
      next(error);
    }
  },

  updateRule: async (req, res, next) => {
    try {
      const rule = await ruleService.updateRule(req.params.id, req.body);
      res.status(200).json(rule);
    } catch (error) {
      next(error);
    }
  },

  deleteRule: async (req, res, next) => {
    try {
      await ruleService.deleteRule(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ruleController;
