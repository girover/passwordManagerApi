const { get } = require('config');
const Password = require('../models/Password');

/**
 * Passwords Repository object
 *
 * */
module.exports = {

    getAll: async() => {
        return await Password
        .find()
        .select('_id name username password site category')
        .populate('category');
    },

    getById: async(id) => {
        return await Password.findById(id)
                            .select('_id name username password site category')
                            .populate('category');
    },

    getByCategory: async(categoryId) => {
        return await Password.find({ category: categoryId })
                            .select('_id name username password site category')
                            .populate('category');
    },

    getByName: async(name) => {
        return await Password.find({ name: { $regex: new RegExp(name, 'i') } })
                            .select('_id name username password site category')
                            .populate('category');
    
    },

    getBySiteName: async(site) => {
        return await Password.find({ site: site })
                            .select('_id name username password site category')
                            .populate('category');
    
    },

    create: async(Password) => {
        return await Password.save();
    },

    update: async(Password) => {
        return await Password.save();
    },

    delete: async(id) => {
        return await Password.deleteOne({ _id: id });
    }
};