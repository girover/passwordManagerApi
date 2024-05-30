const mongoose = require('mongoose');
const passwordsRepository = require('../repositories/passwordsRepository');
const Result = require('../Http/result');
const Password = require('../models/Password');
const validator = require('../validation/validator');

/**
 * Passwords Service
 * contains all the business logic for the password resource.
 */
const passwordsService = {

    getAll: async function() {

        const passwords = await passwordsRepository.getAll();   
        
        return Result.ok('List of passwords', passwords);
    },

    getById: async function(id) {
        const password = await passwordsRepository.getById(id);

        if(!password){
            return Result.notFound('Password not found', {});
        }
        
        return Result.ok('Password retrieved', password);
    },

    getByName: async function(name) {

        const password = await passwordsRepository.getByName(name);

        if(!password){
            return Result.notFound('Password not found', {});
        }
        
        return Result.ok('Password retrieved', password);
    },

    getBySiteName: async function(site) {

        if(!site.includes('http://') && !site.includes('https://')) {
            site = `https://${site}`;
        }
        let url = new URL(site);
        var siteWithoutProtocol = `${url.hostname}`;
        var siteWithProtocol = `${url.protocol}//${url.hostname}`;
        //site = `${url.protocol}//${url.hostname}`;
        
        var password = await passwordsRepository.getBySiteName(siteWithoutProtocol);
        
        if(!password || password.length === 0){
            password = await passwordsRepository.getBySiteName(siteWithProtocol);
            if(!password)
                return Result.notFound('Password not found', {});
        }
        
        return Result.ok('Retrieved password', password[0]);
    },

    create: async function(password) {

        let newPassword = new Password({
            _id: new mongoose.Types.ObjectId(),
            name: password.name,
            username: password.username,
            password: password.password,
            site: password.site,
            category: password.category
        });

        let validateErrors = newPassword.validateSync();
        
        if(validateErrors){
            return Result.badRequest('Validation error', validator.validationErrors(validateErrors));
        }
       
        const createdPassword = await passwordsRepository.create(newPassword);

        return Result.ok('Password created', createdPassword, 201);
    },

    update: async function(id, password) {
        
        let retrievedPassword = await passwordsRepository.getById(id);
        
        if(!retrievedPassword){
            return Result.notFound('Password not found', {field: 'id', message: 'Password not found'});
        }
        
        retrievedPassword.name = password.name ?? retrievedPassword.name;
        retrievedPassword.username = password.username ?? retrievedPassword.username;
        retrievedPassword.password = password.password ?? retrievedPassword.password;
        retrievedPassword.site = password.site ?? retrievedPassword.site;
        retrievedPassword.category = password.category ?? retrievedPassword.category;
        
        let validateErrors = retrievedPassword.validateSync();
        
        if(validateErrors){
            return Result.badRequest('Validation error', validator.validationErrors(validateErrors));
        }
        
        const updatedPassword = await passwordsRepository.update(retrievedPassword);
        
        return Result.ok('Password updated', updatedPassword);
    },

    delete: async function(id) {
        let password = await passwordsRepository.getById(id);

        if(!password){
            return Result.notFound('Password not found', {});
        }
        
        return  Result.ok('Password deleted', await passwordsRepository.delete(id));
    }
}

module.exports = passwordsService;