(function(){
	var module = angular.module("angularCalendar");
	function controller($scope,$http){
			var rowModel = this;
			rowModel.day="";
			rowModel.calendarData=[];
			rowModel.alert = new Array(31);
			rowModel.alert.fill(false);
			rowModel.$onInit = function(){
				$http.get("/calendar.json").then((response)=>{
					rowModel.calendarData = response.data;
				});				
			};

			rowModel.handleClick = function(day){
				console.log(day);
				rowModel.day = day;
				day = parseInt(day);
				$scope.$on("eventInChild",function(e,data){
					console.log(data);
					rowModel.alert[data.day] = data.bool;
				});
			}
			rowModel.dayTonull = function(){
				rowModel.day = "";
				rowModel.alert.fill(false,0,31);
			}


			rowModel.month="January";
			rowModel.year="2018";
			rowModel.yearRange = [2014,2015,2016,2017,2018];
			rowModel.ranges= {
				"31":[[1,2,3,4,5,6,7], [8,9,10,11,12,13,14],[15,16,17,18,19,20,21], [22,23,24,25,26,27,28], [29,30,31]],
				"28":[[1,2,3,4,5,6,7], [8,9,10,11,12,13,14],[15,16,17,18,19,20,21], [22,23,24,25,26,27,28]],
				"30":[[1,2,3,4,5,6,7], [8,9,10,11,12,13,14],[15,16,17,18,19,20,21], [22,23,24,25,26,27,28], [29,30]]
			};
		}
	module.component("rowCalendar", {
		templateUrl: "/angularCalendar/row-calendar.html",
		controller: ["$scope","$http", controller],
		controllerAs: "rowModel",
	});

}());