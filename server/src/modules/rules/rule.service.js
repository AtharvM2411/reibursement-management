const Rule = require('./rule.model');

const ruleService = {
  getAllRules: async () => {
    return await Rule.find().sort({ priority: -1 });
  },

  getRuleById: async (id) => {
    const rule = await Rule.findById(id);
    if (!rule) {
      throw { status: 404, message: 'Rule not found' };
    }
    return rule;
  },

  createRule: async (ruleData) => {
    const rule = new Rule(ruleData);
    await rule.save();
    return rule;
  },

  updateRule: async (id, updateData) => {
    const rule = await Rule.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!rule) {
      throw { status: 404, message: 'Rule not found' };
    }
    return rule;
  },

  deleteRule: async (id) => {
    const rule = await Rule.findByIdAndDelete(id);
    if (!rule) {
      throw { status: 404, message: 'Rule not found' };
    }
  },
};

module.exports = ruleService;
