angular.module('starter.services')

    .factory('LearningService', function () {

	return {
		getVideos: function(){ 
				  videos = [
						{ title: 'How does solar power work', id: 1, url:'https://www.youtube.com/embed/dHVZ6jEf8To?autoplay=true' },
						{ title: 'What are the enviromental benefits?', id: 2, url:'https://www.youtube.com/embed/ZtS-AYWHetg?autoplay=true' },
						{ title: 'The history of solar technology', id: 3,  url:'https://www.youtube.com/embed/bZvJh_hAltg?autoplay=true' }
				  ];
				return videos;
		},
		getMultipleChoice: function(id){
				  multipleChoice = [
						{ question: 'Why the world isn\'t using more solar energy?', id: 1, A: 'Because Sun doesn\'t shine at night', B: 'Because solar energy is still too expensive energy option for many people', C: 'Because oil is much better energy choice ', D: 'Because there\'s not enough solar panels ', correct: 'D'  },
						{ question: 'Solar Energy is _______', id: 2, A: 'Non-renewable', B: 'An unlimited energy source', C: 'Not Efficient', D: 'The best energy source in the world', correct: 'B'  }				
				  ];
				  return multipleChoice
		},
		getQuestions: function(id){
				  questions = [
						{ question: 'What is photovoltaics (solar electricity) or "PV"?', id: 1, image: 'http://patty5.com/AppApis/images/pcells.jpg' ,answer: 'The word itself helps to explain how photovoltaic (PV) or solar electric technologies work. First used in about 1890, the word has two parts: photo, a stem derived from the Greek phos, which means light, and volt, a measurement unit named for Alessandro Volta (1745-1827), a pioneer in the study of electricity. So, photovoltaics could literally be translated as light-electricity. And that\'s just what photovoltaic materials and devices do; they convert light energy to electricity, as Edmond Becquerel and others discovered in the 18th Century.'},
						{ question: 'What are the components of a photovoltaic (PV) system?', id: 2, image: '', answer: 'A PV system is made up of different components. These include PV modules (groups of PV cells), which are commonly called PV panels; one or more batteries; a charge regulator or controller for a stand-alone system; an inverter for a utility-grid-connected system and when alternating current (ac) rather than direct current (dc) is required; wiring; and mounting hardware or a framework.' }				
				  ];
				  return questions
		},  
	}
});
