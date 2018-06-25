module.exports = function (app) {
    app.get('/api/search/:search',searchCraigs);

    var searchModel = require('../models/search/search.model.server');


    function searchCraigs(req, res) {
        // test =  {title:"Senior Full-stack Engineer (Python) (menlopark)",
        //     about:"https://sfbay.craigslist.org/pen/sof/d/senior-full-stack-engineer/6616016971.html",
        //     desc:"Senior Fullstack Engineer (Pythonand Django) \nAbout You \nYou're an experienced full stack engineer, comfortable across the entire stack, end to end. You're no stranger to context switching, capable of diving deep into model design one minute, and fl ..."};

        var search = req.params['search'];
        console.log("Search in server:"+search);
        //console.log("SVR JSON:"+JSON.stringify(test));
        //console.log(res.json(test));
        res.send({title:"Senior Full-stack Engineer (Python) (menlopark)",
            about:"https://sfbay.craigslist.org/pen/sof/d/senior-full-stack-engineer/6616016971.html",
            desc:"Senior Fullstack Engineer (Pythonand Django) \nAbout You \nYou're an experienced full stack engineer, comfortable across the entire stack, end to end. You're no stranger to context switching, capable of diving deep into model design one minute, and fl ..."}
    );
        // userModel.findUserById(id)
        //     .then(function (user) {
        //         res.json(user);
        //     })
    }
}
