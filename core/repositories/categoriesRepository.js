const Category = require('../models/Category');

/**
 * Categorys Repository object
 *
 * */
module.exports = {

    getAll: async() => {
        return await Category
        .find()
        .select('_id name');
    },

    getById: async(id) => {
        return await Category.findById(id)
                            .select('_id name');
    },

    getByCategory: async(categoryId) => {
        return await Category.find({ category: categoryId })
                            .select('_id name');
    },

    create: async(Category) => {
        return await Category.save();
    },

    update: async(Category) => {
        return await Category.save();
    },

    delete: async(id) => {
        return await Category.deleteOne({ _id: id });
    }
};