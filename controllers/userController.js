const userModel = require('../models/userModel');
const EmailService = require('../service/emailService');

const userController = {
    async createUser(req, res) {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
    
        try {
            const newUser = new userModel({ username, email, password });
            const savedUser = await newUser.save();

            await EmailService.sendWelcomeEmail(email, username);

            res.status(201).json({ message: 'User created successfully', user: savedUser });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
  async getUserById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const foundUser = await userModel.findById(id);
      if (!foundUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json({ user: foundUser });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAllUsers(req, res) {
    try {
        console.log('Endpoint getAllUsers acessado'); 
      const users = await userModel.find();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateUserById(req, res) {
    const { id: userId } = req.params;
    const { username, email, password } = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const updatedUser = await userModel.findByIdAndUpdate(userId, { username, email, password }, { new: true });
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteUserById(req, res) {
    const { id: userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = userController;



