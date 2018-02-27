

//var HomeController = require('./controllers/HomeController');
var accountController = require('./controllers/account_controller');
var statisticsController = require('./controllers/statistics_controller');
var testController = require('./controllers/test_controller');

// Routes
module.exports.register = function(app){
     
    // Main Routes
     
    //app.get('/', HomeController.Index);
    //app.get('/other', HomeController.Other); 


    app.get('/account/register' ,accountController.register);
    app.post('/account/register', accountController.postRegister);
    app.get('/account/login', accountController.login);
    app.post('/account/login', accountController.postLogin);
    app.get('/get-user', accountController.getUserByEmail);


    app.post('/account/sign-up', accountController.signUp);
    app.post('/account/sign-in', accountController.signIn);

    app.get('/statistics/test', statisticsController.testing);
    app.post('/statistics/save-outcome', statisticsController.saveOutcome);
    app.get('/statistics/outcomes', statisticsController.getUserOutcomes);
    app.post('/statistics/save-income', statisticsController.saveIncome);
    app.get('/statistics/outcome/:id', statisticsController.getOutcome);

    app.get('/test/video-thumb', testController.createVideoThumbnail);
    app.post('/test-post', testController.testPost);
    app.get('/test/convert', testController.convertFile);
    app.get('/test/create-file', testController.createFile);
};
