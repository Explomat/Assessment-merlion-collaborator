var React = require('react/addons');
var AssessmentStore = require('../stores/AssessmentStore');
var TableTreeView = require('./modules/TableTreeView');

function  getData() {
	return {
		collaborators: AssessmentStore.getCollaborators()
	}
}

var AssessmentView = React.createClass({

	componentDidMount: function() {
		AssessmentStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AssessmentStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getData);
	},

	getInitialState: function () {
		var data = getData(); 
		data.isExpand = true;
		return data;
	},

	handleExpandAll: function(){
		this.setState({isExpand: !this.state.isExpand});
	},

	render:function () {
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<TableTreeView data={this.state.collaborators} isExpand={this.state.isExpand} header={['Название', 'Вес']} />
				</div>
			</div>
		);
	}
});
module.exports = AssessmentView;


