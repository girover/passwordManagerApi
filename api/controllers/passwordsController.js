const { getBySiteName } = require('../../core/repositories/passwordsRepository');
const passwordsService = require('../../core/services/passwordsService');

/**
 * Students Controller
 */
module.exports = {

    /**
     * Get all students
     */
    get: async(req, res, next) => {
        try {
            const result = await passwordsService.getAll();
            res.status(result.status).json(result);            
        } catch (error) { next(error); }
    },

    /**
     * Get student by id
     */
    getById: async(req, res, next) => {
        try {
            let result = await passwordsService.getById(req.params.id);
            res.status(result.status).json(result);
        } catch (error) {next(error);}
    },

    getByName: async(req, res, next) => {
        try {
            let name = req.params.name;
            let result = await passwordsService.getByName(name);
            res.status(result.status).json(result);
        } catch (error) { next(error)}
    },

    getBySiteName: async(req, res, next) => {
        try {
            let result = await passwordsService.getBySiteName(req.query.search);
            res.status(result.status).json(result);
        } catch (error) { next(error)}
    },

    /**
     * Create new student
     */
    create: async(req, res, next) => {
        try {
            let result = await passwordsService.create(req.body);            
            res.status(result.status).json(result);         
        } catch (error) { next(error) };
    },

    /**
     * Update student by id
     */
    update: async(req, res, next) => {
        try {
            let result = await passwordsService.update(req.params.id, req.body);
            res.status(result.status).json(result);
        } catch (error) { next(error)}
    },

    /**
     * Remove a student by id
     */
    delete: async(req, res, next) => {
        try {
            let result = await passwordsService.delete(req.params.id);
            res.status(result.status).json(result);
        } catch (error) { next(error)}
    },
}