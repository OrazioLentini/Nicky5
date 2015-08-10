angular.module('starter.services')

    .factory('LearningService', function () {

	return {
		getVideos: function(){ 
				  videos = [
						{ title: 'How does solar power work?', id: 1, url:'https://www.youtube.com/embed/dHVZ6jEf8To?autoplay=true', course: 'solar energy' },
						{ title: 'What are the enviromental benefits?', id: 2, url:'https://www.youtube.com/embed/ZtS-AYWHetg?autoplay=true', course: 'solar energy' },
						{ title: 'The history of solar technology', id: 3,  url:'https://www.youtube.com/embed/bZvJh_hAltg?autoplay=true', course: 'solar energy' },
						{ title: 'The history of nuclear power', id: 4,  url:'https://www.youtube.com/embed/WiPcn02kJNM?autoplay=true', course: 'nuclear reactors' },
						{ title: 'How nuclear power plants work', id: 5,  url:'https://www.youtube.com/embed/_UwexvaCMWA?autoplay=true', course: 'nuclear reactors' },
						{ title: 'Chernobly', id: 6,  url:'https://www.youtube.com/embed/dS3WvKKSpKI?autoplay=true', course: 'nuclear reactors' }
				  ];
				return videos;
		},
		getMultipleChoice: function(id){
				  multipleChoice = [
						{ question: 'Why isn\'t the world using more solar energy?', id: 1, A: 'Because Sun doesn\'t shine at night', B: 'Because solar energy is still too expensive energy option for many people', C: 'Because oil is much better energy choice ', D: 'Because there\'s not enough solar panels ', correct: 'D', course: 'solar energy'  },
						{ question: 'Solar Energy is _______', id: 2, A: 'Non-renewable', B: 'An unlimited energy source', C: 'Not Efficient', D: 'The best energy source in the world', correct: 'B', course: 'solar energy'  }	,
						{ question: 'Which of the following may not need a control rod?', id: 3, A: 'Liquid metal cooled reactor', B: 'Fast breeder reactor', C: 'None of these', D: 'Candu reactor', correct: 'C', course: 'nuclear reactors'  },
						{ question: 'Thorium-232 is converted into uranium-233 in a/an __________ nuclear reactor.', id: 4, A: 'heavy water moderated', B: 'thermal', C: 'fast breeder', D: 'enriched uranium', correct: 'C', course: 'nuclear reactors'  },
						{ question: 'An electron has a mass that is approximately __________ that of the proton.', id: 5, A: '1/1836 (approximately)', B: '∞', C: '1836 (approximately)', D: '1', correct: 'A', course: 'nuclear reactors'  }				
				  ];
				  return multipleChoice
		},
		getQuestions: function(id){
				  questions = [
						{ question: 'What is photovoltaics (solar electricity) or "PV"?', id: 1, image: 'http://app.nicky3.com/AppApis/images/pcells.jpg' ,answer: 'The word itself helps to explain how photovoltaic (PV) or solar electric technologies work. First used in about 1890, the word has two parts: photo, a stem derived from the Greek phos, which means light, and volt, a measurement unit named for Alessandro Volta (1745-1827), a pioneer in the study of electricity. So, photovoltaics could literally be translated as light-electricity. And that\'s just what photovoltaic materials and devices do; they convert light energy to electricity, as Edmond Becquerel and others discovered in the 18th Century.' , course: 'solar energy'},
						{ question: 'What are the components of a photovoltaic (PV) system?', id: 2, image: '', answer: 'A PV system is made up of different components. These include PV modules (groups of PV cells), which are commonly called PV panels; one or more batteries; a charge regulator or controller for a stand-alone system; an inverter for a utility-grid-connected system and when alternating current (ac) rather than direct current (dc) is required; wiring; and mounting hardware or a framework.', course: 'solar energy' },
						{ question: 'Do we really need nuclear in order to deal with global warming?', id: 3, image: '', answer: 'Preventing dangerous warming of the planet due to human emissions of greenhouse gases will require that we cut our emissions by 80 percent over the next 40 years at the same time that global energy demand is expected to double or triple. Doing so will require that we produce vast amounts of zero carbon energy. At present, the only way we know how to do that is with nuclear energy.', course: 'nuclear reactors' },	
						{ question: 'Is nuclear power vital to ensuring the security of energy supply?', id: 4, image: '', answer: 'Our civilisation depends, in much of the world, on energy. Nuclear power offers large amounts of electricity, and is not available only intermittently like some renewables. That steady supply is very useful but of course if the reactors have to be shut down, they leave a very a big gap to fill. Renewables are intermittent and continent-scale grids (which are starting to be built) and better storage will be needed to balance supplies. But renewables can be distributed more widely and are more resilient to accidents or engineering problems. CCS-enabled coal or gas plants could provide baseload. Lastly, nuclear power is not truly renewable, and for nations without their own uranium deposits, ensuring access to the fuel is an issue. The sun will always shine and the wind will always blow somewhere.', course: 'nuclear reactors' },	
						{ question: 'Can the full costs of nuclear truly be calculated?', id: 5, image: '', answer: 'Nuclear can, in some perfectly reasonable analyses, appear fairly affordable if not "too cheap to meter". But that usually assumes that the technical problems of the past have been solved in the latest plant designs, which are largely untested at commercial scale. Do you believe engineers have abolished the vast cost overruns of existing generations of reactors? Will the new reactors prevent the accidents, large and small, that pile on costs? Will the temptation to operate plants well beyond their initial design lifetimes be resisted in the future?', course: 'nuclear reactors' }		
				  ];
				  return questions
		},  
	}
});
