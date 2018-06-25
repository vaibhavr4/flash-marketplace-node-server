var multer = require('multer');
module.exports = function (app) {

    app.get('/api/acd', findAdsForUser);
    app.delete('/api/delad/:adId', deleteAdById);
    app.get('/api/myad/:adId',findAdById);
    app.post('/api/scrape',scrapedetails);
    app.post('/api/post-ad', createAd);
    app.get('/api/user/:userId/content', findAdsForUserid);
    var request = require('request');
    var cheerio = require('cheerio');
    var DIR = './uploads/';
    var crypto = require("crypto");
    var mime = require("mime");
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images')
        },
        filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
            });
        }
    });
    var upload = multer({storage: storage});
    app.post('/api/upload',upload.single('photo'),uploadFile);

    var adModel = require('../models/ad/ad.model.server');

    function uploadFile(req,res,err)
    {
        console.log("In upload file server");
        var path = "";
            path = req.file.path;
            return res.send(path);

    }

    function deleteAdById(req,res)
    {

        var id = req.params['adId'];
        console.log("In server del ad"+id);
        adModel.deleteAdById(id)
            .then(function(ads)
            {
                res.json(ads);
            })
    }

    function findAdById(req,res)    {

        var id = req.params['adId'];
        console.log("In server get ad"+id);
        adModel.findAdById(id)
            .then(function(ads)
            {
                res.json(ads);
            })
    }

    function findAdsForUserid(req,res)
    {
        var userId = req.params['userId'];
        adModel
            .findAdsForUser(userId)
            .then(function (ads) {
                res.json(ads);
            })
    }
    function findAdsForUser(req,res)
    {

        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        console.log("In user ad server"+userId);
        adModel
            .findAdsForUser(userId)
            .then(function (ads) {
                res.json(ads);
            });

    }

    function createAd(req, res) {
        var ad = req.body;
        //console.log("BODY:"+JSON.stringify(req.body));
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;


        ad["seller"] = userId;
        adModel.createAd(ad)
            .then(function (ad) {
                // req.session['currentUser'] = user;
                // console.log("SERVR USR:"+user);
                res.send(ad);
            })
    }


    function scrapedetails(req, res){

        req_url = req.body.about;
        console.log("URL:"+req_url);

        // url = 'https://boston.craigslist.org/gbs/sys/d/great-ibm-t400-laptop-intel/6612434051.html';

        request(req_url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                var title, description;
                var price=0;
                var links=[];
                var json = { title : "",price:0, description : "", links:[]};

                $('#titletextonly').filter(function(){
                    var data = $(this);
                    title = data.text();
                    json.title = title;
                });

                $('#postingbody').filter(function(){
                    var data = $(this);
                    description = data.contents().text();
                    description = description.replace('QR Code Link to This Post','');
                    json.description = description;
                });
                $('.thumb').each( (index, value) => {
                    var link = $(value).attr('href');
                    console.log("LINK:"+link);
                    links.push(link);
                    json.links=links;
                    console.log("LINKSSSS:"+links);
                });

                $('.price').filter(function(){
                    var data = $(this);
                    price = data.text();
                    json.price = price;
                });

                res.send(json);
            }
        })
    }

}