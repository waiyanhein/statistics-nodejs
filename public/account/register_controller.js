app.controller('RegisterController', function ($scope,$routeParams, $http, $window) {
	$scope.name = ""
	$scope.email = ""
	$scope.password = ""

	$scope.alerts = [
	 	
	];

	$scope.form_errors = [ ];

	$scope.submitRegisterForm = function(){
		$scope.alerts = [];
		$scope.form_errors = [];
		$http.post('/account/register', { name: $scope.name, email: $scope.email, password: $scope.password }).then(function(res){
			if(res.data.status){
				$window.location.href = "/";
			}
			else{
				if(res.data.errors!=null && res.data.errors.length>0){
					for(var i=0; i<res.data.errors.length; i++){
						$scope.form_errors.push(res.data.errors[i]);
					}
				}else{
					alert("Something went wrong!");
				}
			}
		}, function(res){
			alert('Opps! Something went wrong...');
		});
	}
});