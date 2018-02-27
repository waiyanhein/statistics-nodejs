app.controller('LoginController', function ($scope,$routeParams, $http, $window) {
	$scope.email = ""
	$scope.password = ""

	$scope.alerts = [
	 	
	];

	$scope.form_errors = [ ];

	$scope.submitLoginForm = function(){
		$scope.alerts = [];
		$scope.form_errors = [];
		$http.post('/account/login', { email: $scope.email, password: $scope.password }).then(function(res){
			if(res.data.status){
				$window.location.href = "/";;
			}else{
				if(res.data.errors && res.data.errors.length>0){
					$scope.form_errors.push(res.data.errors[0].msg);
				}else if(res.data.form_error){
					$scope.form_errors.push(res.data.form_error);
				}else{
					$scope.form_errors.push("Unknown validation error");
				}
			}
		}, function(res){
			alert('Opps! Something went wrong...');
		});
	}
});