const Company = require('./company.model');

const companyService = {
  getCompanyInfo: async () => {
    return await Company.findOne();
  },

  updateCompanyInfo: async (companyData) => {
    const company = await Company.findOneAndUpdate({}, companyData, {
      new: true,
      upsert: true,
    });
    return company;
  },
};

module.exports = companyService;
