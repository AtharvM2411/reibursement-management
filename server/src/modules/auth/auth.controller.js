const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../users/user.model");
const Company = require("../company/company.model");

exports.register = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Company
    const company = await Company.create({
      name: companyName,
    });

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      companyId: company.id,
    });

    res.json({
      message: "User & Company created",
      user,
      company,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, companyId: user.companyId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login success",
      token,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};