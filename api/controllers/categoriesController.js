const categoriesService = require('../../core/services/categoriesService');

/**
 * Students Controller
 */
module.exports = {

    /**
     * Get all students
     */
    get: async(req, res, next) => {
        try {
            const result = await categoriesService.getAll();
            res.status(result.status).json(result);            
        } catch (error) { next(error); }
    },

    /**
     * Get student by id
     */
    getById: async(req, res, next) => {
        try {
            let result = await categoriesService.getById(req.params.id);
            res.status(result.status).json(result);
        } catch (error) {next(error);}
    },

    /**
     * Create new student
     */
    create: async(req, res, next) => {
        try {
            let result = await categoriesService.create(req.body);            
            res.status(result.status).json(result);         
        } catch (error) { next(error) };
    },

    /**
     * Update student by id
     */
    update: async(req, res, next) => {
        try {
            let result = await categoriesService.update(req.params.id, req.body);
            res.status(result.status).json(result);
        } catch (error) { next(error)}
    },

    /**
     * Remove a student by id
     */
    delete: async(req, res, next) => {
        try {
            let result = await categoriesService.delete(req.params.id);
            res.status(result.status).json(result);
        } catch (error) { next(error)}
    },
}