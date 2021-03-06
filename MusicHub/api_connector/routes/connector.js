var express = require('express');
var ConnectorController = require('../controllers/connector-controller');

var router = express.Router();

/**
 * Manage the User connecion on APIs
 *
 * req.session.email : should be defined
 */
//TODO ajouter un parametre url de redirection en fin de processus
router.get('/connection/:api/:action', function(req, res, next) {
    var connectorController = new ConnectorController();
    connectorController.executeAction(req,res);
});

/**
 * Get the User Settings
 *
 * req.session.email : should be defined
 */
router.get('/settings', function(req, res, next) {
    var connectorController = new ConnectorController();
    connectorController.sendSettings(req,res);
});

/**
 * Search tracks corresponding to query param
 *
 * req.session.email : should be defined
 */
router.get('/search/:query', function(req, res, next) {
    var connectorController = new ConnectorController();
    connectorController.search(req,res);
});


/**
 * Get track corresponding to api and musicId param
 *
 * req.session.email : should be defined
 */
router.get('/track/:api/:musicId', function(req, res, next) {
    var connectorController = new ConnectorController();
    connectorController.findTrack(req,res);
});




module.exports = router;