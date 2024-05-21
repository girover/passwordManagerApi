const mongoose = require('mongoose');
const categoriesRepository = require('../repositories/categoriesRepository');
const Result = require('../Http/result');
const Category = require('../models/Category');
const validator = require('../validation/validator');

/**
 * Passwords Service
 * contains all the business logic for the category resource.
 */
const categoriesService = {

    getAll: async function() {

        const categories = await categoriesRepository.getAll();   
        
        return Result.ok('List of categories', categories);
    },

    getById: async function(id) {
        const category = await categoriesRepository.getById(id);

        if(!category){
            return Result.notFound('Category not found', {});
        }
        
        return Result.ok('Category retrieved', category);
    },

    // getByEducation: async function(educationId) {
    //     const edu = await educationsRepository.getById(educationId);
    //     const categories = await categoriesRepository.getByEducation(educationId);
        
    //     if(!edu){
    //         return Result.notFound('Education not found', {});
    //     }
        
    //     //const data = this.addActionsToPasswords(categories);
    //     const data = {education: edu, categories: categories};
        
    //     return Result.ok('List of categories', data);
    // },

    create: async function(category) {

        let newCategory = new Category({
            _id: new mongoose.Types.ObjectId(),
            name: category.name
        });

        let validateErrors = newCategory.validateSync();
        
        if(validateErrors){
            return Result.badRequest('Validation error', validator.validationErrors(validateErrors));
        }
       
        const createdCategory = await categoriesRepository.create(newCategory);

        return Result.ok('Category created', createdCategory, 201);
    },

    update: async function(id, category) {
        
        let retrievedCategory = await categoriesRepository.getById(id);
        
        if(!retrievedCategory){
            return Result.notFound('Category not found', {field: 'id', message: 'Password not found'});
        }
        
        retrievedCategory.name = category.name;
        
        let validateErrors = retrievedCategory.validateSync();
        
        if(validateErrors){
            return Result.badRequest('Validation error', validator.validationErrors(validateErrors));
        }
        
        const updatedCategory = await categoriesRepository.update(retrievedCategory);
        
        return Result.ok('Category updated', updatedCategory);
    },

    delete: async function(id) {
        let category = await categoriesRepository.getById(id);

        if(!category){
            return Result.notFound('Category not found', {});
        }
        
        return  Result.ok('Category deleted', await categoriesRepository.delete(id));
    }
}

module.exports = categoriesService;