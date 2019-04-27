const Company = require('../models/company.model');
const HTTP = require('http-status');


exports.createCompany = async (req, res, next) => {
    try {
        const company = new Company(req.body);
        if (!company) {
            res.status(HTTP.BAD_REQUEST).send('')
        }
        const result = await company.save();
        res.status(HTTP.OK).send({
            title: 'companies',
            message: 'company successfully inserted'
        });
        return next();
    } catch (e) {
        res.send(e);
        return next()
    }
}

exports.getCompanies = async (req, res, next) => {
    try {
        const result = await Company.find();
        if (!result) {
            res.status(HTTP.NO_CONTENT).send({
                message: 'No data available'
            })
        }
        res.status(HTTP.OK).send({
            title: 'companies',
            data: {
                data:result
            }
        });
        return next()
    } catch (e) {
        return next();
    }
}

exports.updateCompany = async (req, res, next) => {
    try {
        const movie = await Company.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        if (!movie) {
            res.status(HTTP.NOT_FOUND).send({
                message: 'No record found with given ID'
            });
        }
        const result = await movie.save();
        res.status(HTTP.OK).send({
            message: 'Record successfylly updated'
        });
        return next();
    } catch (e) {
        res.send(e);
        return next();
    }
}

exports.deleteCompany = async (req, res, next) => {
    try {
        const movie = await Company.findByIdAndDelete(req.params.id);
        if (!movie) {
            res.status(HTTP.NOT_FOUND).send({
                message: 'No record found with given ID'
            });
        }
        res.status(HTTP.OK).send({
            message: 'Record successfully deleted'
        });
        return next();
    } catch (e) {
        res.send(e);
        return next();
    }
}