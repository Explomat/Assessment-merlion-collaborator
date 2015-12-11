var React = require('react');
var AssessmentAPI = require('./api/AssessmentAPI');
var AssessmentView = require('./components/AssessmentView');
var AssessmentActions = require('./actions/AssessmentActions');

window.onload = function(){
	/*AssessmentActions.receiveData({ collaborators: [
		{
		  "id": 2,
		  "cols": ["Петров Михаил Валерьевич", "50"],
		  "children": [
		    {
		      "id": 4,
		      "cols": ["Иванов Иван Иванович", "50"]
		    },
		    {
		      "id": 5,
		      "cols": ["Александров Александр Александрович", "50"]
		    },
		    {
		      "id": 44,
		      "cols": ["Петров Петр Петрович", "50"]
		    },
		    {
		      "id": 55,
		      "cols": ["Беловоденко Кирилл Вадимович", "20"]
		    },
		    {
		      "id": 665,
		      "cols": ["Шумнов Сергей Валерьевич", "60"]
		    },
		    {
		      "id": 776,
		      "cols": ["Умнобородов Михаил Александрович", "20"]
		    }
		  ]
		},
	    {
	      "id": 6,
	      "cols": ["Иванов Александр Алексеевич", "50"],
	      "children": [
	        {
	          "id": 7,
	          "cols": ["Чегрин Иван Васильевич", "33"]
	        },
	        {
	          "id": 8,
	          "cols": ["Мазуренко Сергей Вадимович", "66"]
	        },
	        {
	          "id": 10016,
	          "cols": ["Жеребцов Андрей Николаевич", "60"]
	        }
	      ]
	    },
	    {
	      "id": 9,
	      "cols": ["Степанов Артем Васильевич", "50"],
	      "children": [
	        {
	          "id": 10,
	          "cols": ["Шешенев Роман Викторович", "60"]
	        },
	        {
	          "id": 11,
	          "cols": ["Полтавский Артем Витальевич", "20"]
	        },
	        {
	          "id": 12,
	          "cols": ["Передерий Наталья Владимировна", "66"]
	        }
	      ]
	    },
	    {
	      "id": 19,
	      "cols": ["Матвеев Алексей Васильевич", "50"],
	      "children": [
	        {
	          "id": 110,
	          "cols": ["Шешенев Роман Викторович", "60"]
	        },
	        {
	          "id": 111,
	          "cols": ["Крупенин Артем Витальевич", "20"]
	        },
	        {
	          "id": 112,
	          "cols": ["Передерий Наталья Владимировна", "60"]
	        }
	      ]
	    },
	    {
	      "id": 29,
	      "cols": ["Стрекаловский Андрей Васильевич", "50"],
	      "children": [
	        {
	          "id": 210,
	          "cols": ["Шешенев Роман Викторович", "66"]
	        },
	        {
	          "id": 211,
	          "cols": ["Полтавский Артем Витальевич", "0"]
	        },
	        {
	          "id": 212,
	          "cols": ["Непийвода Наталья Владимировна", "60"]
	        }
	      ]
	    }
	]});
	React.render(React.createElement(AssessmentView), app);*/

	try {
		AssessmentAPI.getData().then(function(data){
			AssessmentActions.receiveData(data);
			React.render(React.createElement(AssessmentView), app);
		});
	}
	catch(e){ console.log(e); }
}


