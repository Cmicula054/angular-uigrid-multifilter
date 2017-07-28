var myApp = angular.module("myApp.bootstrap",["ngAnimate",
 "ui.bootstrap", "ui.grid", "ui.grid.moveColumns", "ui.grid.edit",
 "ui.grid.selection", "ui.grid.resizeColumns", "ui.grid.exporter",
 "ui.grid.pagination", "ui.grid.pinning", "angularjs-dropdown-multiselect"]);

myApp.controller('mainCtrl', ['$scope','$http', 'uiGridConstants', function ($scope, $http,uiGridConstants) {

	$scope.example1model = []; 
	$scope.dataLoaded = false;
	var columnDefs=[];
    $scope.example1settings = {
		scrollableHeight: '300px',
		scrollable: true,
		enableSearch: true,
		checkBoxes: true
	};


	$scope.gridOptions = {
		enableFiltering: true,
		enableFullRowSelection: true,
		enableSelectAll: true,
		enableGridMenu: true,
		paginationPageSizes: [25,45,65],
   		paginationPageSize: 45,
   		enableSorting: true,
   		enableHorizontalScrollbar: 1,
		columnDefs:columnDefs
	};



 /*=========GRID OPTION========*/
	$scope.gridOptions.multiSelect = true;
 /*=========GRID OPTION=========*/


$http.get('data.json').then( function (response) {

	$scope.myData = response.data;

	$scope.gridOptions.data = response.data

$scope.example1data  = [];
var names = [];
var i =0;
for (var k = 0; k<$scope.gridOptions.data.length;k++) {
	if (names.indexOf($scope.gridOptions.data[k].firstName) == -1) {
    names.push($scope.gridOptions.data[k].firstName);
}
}

for (var j =0; j < names.length; j ++ ) {
	$scope.example1data.push({id:i,label:names[j]});
	i++;
}

 columnDefs.push(
		{field: 'firstName', minWidth: 250, headerCellClass: 'blue',filterHeaderTemplate:'<div class="ui-grid-filter-container">\
		<button class="btn-btn success"ng-click="grid.appScope.runFunc()">Filter</button><div ng-dropdown-multiselect="" options="grid.appScope.example1data" \
		selected-model="grid.appScope.example1model" checkboxes="true" extra-settings="grid.appScope.example1settings"></div><div></div>'},
			{field: 'lastName', minWidth: 250, headerCellClass: 'blue'},
			{field: 'company', minWidth: 250, headerCellClass: 'blue'},
			{field: 'employed', minWidth: 250, headerCellClass: 'blue'},
			{field: 'gender', minWidth: 250, headerCellClass: 'blue', 
				 filter: {
		         term: '1',
		         type: uiGridConstants.filter.SELECT,
		         selectOptions: [ { value: '1', label: 'male' }, { value: '2', label: 'female' }]
		    },
		    cellFilter: 'mapGender'},
			{field: 'country', minWidth: 250, headerCellClass: 'blue'},
			{field: 'dob', minWidth: 250, headerCellClass: 'blue'},
			{field: 'age', minWidth: 250, headerCellClass: 'blue'}
		);

		$scope.myData.forEach( function addDates( row, index ){
        row.gender = row.gender==='male' ? '1' : '2';
      });

 $scope.dataLoaded = true;

},
function (error) {
	}
);

  $scope.runFunc = function() {
  	var tempArr  = [];
  	for (var m = 0; m < $scope.example1model.length; m++) {
  		tempArr.push($scope.example1data[$scope.example1model[m].id]);
  	}

   var tempgridData  = [];
   for (var p = 0; p < tempArr.length; p ++ ) {
  	for (var n = 0;n < $scope.myData.length; n ++) {
  		if ($scope.myData[n].firstName == tempArr[p].label) {
  			tempgridData.push($scope.myData[n]);
  		}
  	}
}
 console.log($scope.gridOptions.data);
$scope.gridOptions.data = tempgridData;
  console.log($scope.example1model);
  console.log($scope.gridOptions.data);
  console.log($scope.example1data);
  console.log(tempArr);
  console.log(tempgridData);
}

}]);

myApp.filter('mapGender', function() {
  var genderHash = {
    1: 'male',
    2: 'female'
  };
 
  return function(input) {
    if (!input){
      return '';
                                                                                                                                                                      } else {
      return genderHash[input];
    }
  };
});
