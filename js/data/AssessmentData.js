var Promise = require('es6-promise').Promise;
var Ajax = require('../utils/Ajax');
var Config = require('../config');

module.exports = {
	getData: function(){
		var userId = Ajax.getUrlVars(window.location.href)['user'];
		return Ajax.sendRequest(Config.url.createPath({action_name: 'getAssessment', user: userId}));
	}
}
