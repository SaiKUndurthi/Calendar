(function(){
	var module = angular.module("angularCalendar");
	function controller($scope){
			var eventModel = this;
			eventModel.events = [];
			eventModel.alert = new Array(31);
			eventModel.alert.fill(false);
			var obj ={};
			//eventModel.day = "";
			eventModel.addEvent=function(month,day,year,desc){
				eventModel.events.push({
					id: month+day+year,
					month: month,
					day: day,
					year: year,
					desc: desc
				});
				eventModel.desc="";
				day = parseInt(day);
				obj["day"] = day;
				obj["bool"] = true;
				//eventModel.alert[day] = true;
				$scope.$emit("eventInChild",obj);
			}
			eventModel.removeEvent = function(id,date){
				for(var i = 0; i<eventModel.events.length; i++){
					if(eventModel.events[i].id === id){
						eventModel.events.splice(i,1);
					}
				}
				obj["day"] = date;
				obj["bool"] = false;
				$scope.$emit("eventInChild",obj);
			}
	}

	module.component("eventCalendar",{
		templateUrl:"/angularCalendar/event-calendar.html",
		bindings: {
    		month: '<',
    		day: '<',
    		year: '<'
  		},
		controller: ["$scope", controller],
		controllerAs: "eventModel"
	});
}());