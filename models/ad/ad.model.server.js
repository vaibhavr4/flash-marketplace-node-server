var mongoose = require('mongoose');
var adSchema = require('./ad.schema.server');
var adModel = mongoose.model('AdModel', adSchema);

// function findUserById(userId) {
//   return userModel.findById(userId);
// }

function createAd(ad) {
    return adModel.create(ad);
}

function findAllAds() {
    return adModel.find();
}
function findAdsForUser(userId) {
    return adModel
        .find({seller: userId})
        .exec();
}

function deleteAdForUser(userId)
{
    return adModel.find({seller:userId}).remove().exec();
}

function findAdById(adId) {
    return adModel.findById(adId);
}

function deleteAdById(adId)
{
    return adModel.find({_id:adId}).remove().exec();
}
var api = {
    createAd: createAd,
    findAllAds: findAllAds,
    findAdsForUser: findAdsForUser,
    deleteAdForUser: deleteAdForUser,
    deleteAdById: deleteAdById,
    findAdById: findAdById
    // findUserById: findUserById
};

module.exports = api;