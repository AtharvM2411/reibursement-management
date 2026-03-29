const service = require("./approval.service");

const getPending = async (req, res, next) => {
  try {
    const data = await service.getPendingApprovals(req.user.userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const approve = async (req, res, next) => {
  try {
    const data = await service.approveExpense(
      req.params.id,
      req.user.userId
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const reject = async (req, res, next) => {
  try {
    const data = await service.rejectExpense(
      req.params.id,
      req.user.userId
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { getPending, approve, reject };