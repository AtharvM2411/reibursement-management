// Rule evaluation engine
const Rule = require('../modules/rules/rule.model');

const ruleEvaluator = {
  evaluateRules: async (expense) => {
    /**
     * Evaluate expense against all active rules
     * Returns: list of triggered rules and actions
     */
    try {
      const rules = await Rule.find({ active: true }).sort({ priority: -1 });
      
      const triggeredRules = [];
      
      for (const rule of rules) {
        if (ruleEvaluator.matchesCondition(expense, rule.condition)) {
          triggeredRules.push(rule);
        }
      }

      return triggeredRules;
    } catch (error) {
      throw error;
    }
  },

  matchesCondition: (expense, condition) => {
    /**
     * Check if expense matches rule condition
     * Condition format: { field: 'amount', operator: '>', value: 1000 }
     */
    try {
      if (!condition) return true;

      const { field, operator, value } = condition;
      const expenseValue = expense[field];

      switch (operator) {
        case '>':
          return expenseValue > value;
        case '<':
          return expenseValue < value;
        case '=':
          return expenseValue === value;
        case '>=':
          return expenseValue >= value;
        case '<=':
          return expenseValue <= value;
        default:
          return false;
      }
    } catch (error) {
      return false;
    }
  },
};

module.exports = ruleEvaluator;
