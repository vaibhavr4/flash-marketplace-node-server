var mongoose = require('mongoose');
var searchSchema = require('./search.schema.server');
var searchModel = mongoose.model('SearchModel', searchSchema);


function createSearch(search) {
    test =  {"title":"Senior Full-stack Engineer (Python) (menlopark)",
        "about":"https://sfbay.craigslist.org/pen/sof/d/senior-full-stack-engineer/6616016971.html",
        "desc":"Senior Fullstack Engineer (Pythonand Django) \nAbout You \nYou're an experienced full stack engineer, comfortable across the entire stack, end to end. You're no stranger to context switching, capable of diving deep into model design one minute, and fl ..."};

    return test;
}



var api = {
    createSearch: createSearch
};

module.exports = api;