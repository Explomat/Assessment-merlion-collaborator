var React = require('react/addons');

var Node = React.createClass({

	render: function(){
		return(
			<li className={this.props.classes}>
				<span>{this.props.value}</span>
			</li>
		);
	}
});


var TreeNode = React.createClass({

	expandNode: function() {
		this.setState({children: this.props.data.children});
	},

	turnNode: function(){
		this.setState({ children: null });
	},

	getInitialState: function(){
		return {
			children: this.props.data.children || []
		}
	},

	componentWillReceiveProps: function(nextProps) {
	  this.setState({children: nextProps.children});
	  if (nextProps.isExpand !== this.props.isExpand){
	  	if (nextProps.isExpand)
	  		this.expandNode();
	  	else
	  		this.turnNode();
	  }
	},

    componentDidMount: function(){
    	if (this.props.isExpand)
	    	this.expandNode();
	    else
	    	this.turnNode();
    },

    onChildDisplayToggle: function(e){
    	if (this.state.children.length === 0)
    		this.expandNode();
    	else
    		this.turnNode();
    	e.preventDefault();
	    e.stopPropagation();
    },

    render: function () {
    	if (!this.state.children) this.state.children = [];

    	var classes = React.addons.classSet({
            'has-children': (this.props.data.children ? true : false),
            'open': (this.state.children.length ? true : false),
            'closed': (this.state.children ? false : true)
        });

    	var name = this.props.data.cols[0];
    	var len = this.props.data.cols.length;
    	var elems = [];

    	for (var i = 1; i < len; i++) {
			elems.push(<Node key={i} classes={classes + " data" + (i + 2)} value={this.props.data.cols[i]}/>);
		}

        return (
        	<div className="raiting-table__body">
        		<ul className="raiting-table__row">
        			<li key={0} className={classes + " data1"} onClick={this.onChildDisplayToggle}><span>{name}</span></li>
		            {elems}
	            </ul>
                <div>
                	{this.state.children.map(function(c, i){
						return <TreeNode key={c.id + i + Math.random(0, 1)} data={c} isExpand={this.props.isExpand} />
					}.bind(this))}
                </div>
            </div>
        );
    }
});

var CategoryTree = React.createClass({

    getDefaultProps: function() {
    	return {
    		isExpand: false,
    		data: []
    	}
    },

    render: function() {
        return (
        	<div className="table-container">
        		<div className="header">
					<ul className="raiting-table__header">
						{this.props.header.map(function(h, index){
							return <li key={"hli" + index} className={"data" + (index + 1)}><span>{h}</span></li>
						})}
					</ul>
				</div>
				<div className="raiting-table--scroll category-tree">
	            	{this.props.data.map(function(tree) {
			    		return <TreeNode key={tree.id} data={tree} isExpand={this.props.isExpand}/>
			    	}.bind(this))}
			    </div>
	        </div>
        );
    }
});
module.exports = CategoryTree;


