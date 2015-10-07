<%
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

function getAssessment(){
	var pa = ArrayOptFirstElem(XQuery("sql:select pas.id from pas where pas.person_id="+curUserID));
	var outCompentences = [];
	if (pa == undefined) return stringifyWT({ collaborators: outCompentences});

	var competences = OpenDoc(UrlFromDocID(Int(pa.id))).TopElem.competences;
	for (c in competences){
		compName = OpenDoc(UrlFromDocID(Int(c.competence_id))).TopElem.name;
		compObj = { id: c.competence_id + '', cols: [compName + ''], children: [] }
		for (i in c.indicators) {
			indName = OpenDoc(UrlFromDocID(Int(i.indicator_id))).TopElem.name;
			compObj.children.push({ id: i.indicator_id + '', cols: [ indName+'', i.weight + '' ] });
		}
		outCompentences.push(compObj);
	}
	return stringifyWT({ collaborators: outCompentences});
}

%>