const prisma = require("../../config/db");
const getUsers = async (req, res) => {
  try {
    console.log("GET USERS CALLED");
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // optional: prevent deleting yourself
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ message: "Cannot delete yourself" });
    }

    // check if user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // delete user
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
module.exports={ getUsers, deleteUser }