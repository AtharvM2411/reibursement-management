const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    condition: mongoose.Schema.Types.Mixed,
    action: mongoose.Schema.Types.Mixed,
    active: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Rule', ruleSchema);
