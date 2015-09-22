var Promise = require('es6-promise').Promise;
var Ajax = require('../utils/Ajax');
var Config = require('../config');

module.exports = {
	getData: function(){
		return Ajax.sendRequest(Config.url.createPath({action_name: 'getAssessment'}));
	}
}
