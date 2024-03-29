'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('LandingPageController', [function () {

	}])
		.controller('WaitlistController', ['$scope','$firebase', 'FIREBASE_URL',
		function ($scope, $firebase, FIREBASE_URL) {
			// connect $scope.parties to live firebase data.
			var partiesRef = new Firebase(FIREBASE_URL + 'parties');
			//$scope.testVariable = 'tony';
			$scope.parties = $firebase(partiesRef);

			// Object to store data from form
			$scope.newParty = { name: '',	phone: '', size: '', done: false, notified: 'No' }

			// Function to save a new party to the list.
			$scope.saveParty = function () {
				$scope.parties.$add($scope.newParty);
				$scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No' }
			};

			// function to send text messages to parties
			$scope.sendTextMsg = function (party) {
				var textMessageRef = new Firebase(FIREBASE_URL + 'textMessages');
				var textMessages = $firebase(textMessageRef);
				var newTextMessage = {
					phoneNumber: party.phone,
					size: party.size,
					name: party.name
				}
				textMessages.$add(newTextMessage);
				// notified code
				party.notified = 'Yes'
				$scope.parties.$save(party.$id);
			};

		}])
		.controller('AuthController', ['$scope','$firebaseSimpleLogin', '$location', 'FIREBASE_URL', 'authService',
			function ($scope,$firebaseSimpleLogin, $location, FIREBASE_URL, authService ) {
				var authRef = new Firebase(FIREBASE_URL);
				var auth = $firebaseSimpleLogin(authRef);

				$scope.user = {email: '', password: ''};

				$scope.register = function () {
					auth.$createUser($scope.user.email, $scope.user.password)
						.then(function (data) {
							console.log(data);
							$scope.login();
					});
				};

				$scope.login = function () {
					authService.login($scope.user);
				};

				$scope.logout = function () {
					auth.$logout();
					// redirect users to the landing page
					$location.path('/');
				};

		}]);

