var AppDispatcher = require('../dispatcher/AppDispatcher');
var AssessmentConstants = require('../constants/AssessmentConstants');

var AssessmentActions = {

	receiveData: function(data) {
		AppDispatcher.handleData({
			actionType: AssessmentConstants.RECEIVE_DATA,
			data: data
		});
	}
}

module.exports = AssessmentActions;