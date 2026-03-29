const prisma = require("../../config/db");

const getRules = async (req, res) => {
  try {
    const rules = await prisma.rule.findMany({
      include: {
        approver: true,
      },
    });

    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rules" });
  }
};

const createRule = async (req, res) => {
  try {
    const { type, value, approverId } = req.body;

    const rule = await prisma.rule.create({
      data: {
        type,
        value,
        approverId,
      },
    });

    res.json(rule);
  } catch (error) {
    res.status(500).json({ message: "Error creating rule" });
  }
};

module.exports = {
  getRules,
  createRule,
};