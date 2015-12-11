<%
var KNOLEDGE_TYPE = 1; //знание

var startSourcePercent = 50;

function getDestPersent(_startPercent, _startSourcePercent){
	_startPercent = Int(_startPercent);
	_startSourcePercent = _startSourcePercent == undefined ? startSourcePercent : Int(_startSourcePercent);
	if (_startPercent < 50) return 0;
	var diff = _startPercent - _startSourcePercent;
	return diff * 2;
}

function stringifyWT(obj) {
	var type = DataType(obj);
	var curObj = obj;
	var outStr = '';

	if (obj == null || obj == undefined) 
		return 'null';
	if (type == 'string' || type == 'integer')
		return '\"' + obj + '\"'  
	if (type == 'bool')
		return obj;

	if (IsArray(obj)) {
		var temp = '';
		for (prop in obj) {
			temp += stringifyWT(prop) + ',';
		}
		temp = temp.substr(0, temp.length - 1);
		outStr += '[' + temp +']';
	}
	else {
		var temp = '';
		for (prop in obj) {
			temp += '"' + prop + '":' + stringifyWT(obj[prop]) + ',';
		}
		temp = temp.substr(0, temp.length - 1);
		outStr +='{' + temp + '}';
	}
	return outStr;
}

function getAssessment(queryObjects){
	var userId = queryObjects.GetOptProperty('user');
	userId = userId == 'undefined' || userId == undefined ? curUserID : userId;
	var pa = ArrayOptFirstElem(XQuery("sql:select pas.id from pas where pas.person_id=" + userId));
	var outCompentences = [];
	if (pa == undefined) return stringifyWT({ collaborators: outCompentences});

	var competences = OpenDoc(UrlFromDocID(Int(pa.id))).TopElem.competences;
	for (c in competences){
		compName = OpenDoc(UrlFromDocID(Int(c.competence_id))).TopElem.name;
		compObj = { id: c.competence_id + '', cols: [compName + ''], children: [] };
		compValue = 0;
		for (i in c.indicators) {
			indDoc = OpenDoc(UrlFromDocID(Int(i.indicator_id)));
			markValue = i.mark_value == null ? 0 : i.mark_value;
			compValue = compValue + (indDoc.TopElem.type == KNOLEDGE_TYPE ? getDestPersent(markValue) : markValue);
			compObj.children.push({ id: i.indicator_id + '', cols: [ StrReplace(indDoc.TopElem.name + '', '"', ''), Int(markValue) ] });
		}
		compValue = compValue / ArrayCount(c.indicators);
		compObj.cols.push(Int(compValue) + '');
		outCompentences.push(compObj);
	}
	return stringifyWT({ collaborators: outCompentences});
}

%>