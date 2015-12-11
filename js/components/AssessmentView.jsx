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
		data.isExpand = false;
		return data;
	},

	handleExpandAll: function(){
		this.setState({isExpand: !this.state.isExpand});
	},

	render:function () {
		var isExpandTitle = this.state.isExpand ? "Скрыть всех" : "Раскрыть всех";
		var isExpandClass = this.state.isExpand ? "glyphicon glyphicon-minus" : "glyphicon glyphicon-plus";
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<button title={isExpandTitle} type="button" className="btn btn-primary btn-sm" onClick={this.handleExpandAll}>
						<span className={isExpandClass}></span>
					</button>
				</div>
				<div className="panel-body">
					<TableTreeView data={this.state.collaborators} isExpand={this.state.isExpand} header={['Название', 'Оценка']} />
				</div>
			</div>
		);
	}
});
module.exports = AssessmentView;


