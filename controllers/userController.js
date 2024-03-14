const User = require('../models/User'); // Importar o modelo de usuário

const UserController = {
  // Criar um novo usuário
  async createUser(req, res) {
    try {
      // Lógica para criar um novo usuário
      const { name, email, password } = req.body;
      const user = new User({ name, email, password });
      await user.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Retrieve user details by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const foundUser = await User.findById(id);

      if (!foundUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ user: foundUser });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
},

  async updateUserById(req, res) {
    try {
      const { id: userId } = req.params;
      const { name, email, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, { name, email, password }, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ user: updatedUser });
    } catch (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
},

  async deleteUserById(req, res) {
    try {
      const { id: userId } = req.params;
      await User.findByIdAndRemove(userId);

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
};

module.exports = UserController;
