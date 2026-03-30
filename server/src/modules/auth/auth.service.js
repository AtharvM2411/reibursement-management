const prisma = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async ({ name, email, password, role }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // RULE 1: Admin must exist before Manager
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (role === "MANAGER" && !admin) {
    throw new Error("Cannot create manager without admin in system");
  }

  // find manager for employee
  const manager = await prisma.user.findFirst({
    where: { role: "MANAGER" },
  });

  if (role === "EMPLOYEE" && !manager) {
    throw new Error("No manager available in system");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      managerId: role === "EMPLOYEE" ? manager.id : null,
    },
  });

  return user;
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { user, token };
};

module.exports = { signup, login };