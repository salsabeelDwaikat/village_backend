const Admin = require('../models/Admin');

const resolverAdmin = {
  Query: {
    // Fetch all admins
    admins: async () => {
      try {
        return await Admin.find();
      } catch (err) {
        throw new Error('Failed to fetch admins: ' + err.message);
      }
    },

    // Fetch a single admin by ID
    admin: async (_, { id }) => {
      try {
        const admin = await Admin.findById(id);
        if (!admin) {
          throw new Error('Admin not found');
        }
        return admin;
      } catch (err) {
        throw new Error('Failed to fetch admin: ' + err.message);
      }
    },
  },

  Mutation: {
    // Add a new admin
    addAdmin: async (_, { input }) => {
      try {
        const newAdmin = new Admin(input);
        await newAdmin.save();
        return newAdmin;
      } catch (err) {
        throw new Error('Failed to add admin: ' + err.message);
      }
    },

    // Update an existing admin by ID
    updateAdmin: async (_, { id, input }) => {
      try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, input, { new: true });
        if (!updatedAdmin) {
          throw new Error('Admin not found');
        }
        return updatedAdmin;
      } catch (err) {
        throw new Error('Failed to update admin: ' + err.message);
      }
    },

    // Delete an admin by ID
    deleteAdmin: async (_, { id }) => {
      try {
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
          throw new Error('Admin not found');
        }
        return deletedAdmin;
      } catch (err) {
        throw new Error('Failed to delete admin: ' + err.message);
      }
    },
  },
};

module.exports = resolverAdmin;