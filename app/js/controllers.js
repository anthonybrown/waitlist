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
		.controller('AuthController', ['$scope','$firebaseSimpleLogin', '$location', 'FIREBASE_URL',
			function ($scope,$firebaseSimpleLogin, $location, FIREBASE_URL ) {
				var authRef = new Firebase(FIREBASE_URL);
				var auth = $firebaseSimpleLogin(authRef);

				$scope.user = {email: '', password: ''};

				$scope.register = function () {
					auth.$createUser($scope.user.email, $scope.user.password)
						.then(function (data) {
							console.log(data);
							// the authentication is done through
							// the our own authentication in the
							// login method

							// auth.$login('password', $scope.user);
							$scope.login();
							// I'd like the page to redirect
							// to the login page not directly to the waitlist


					});
				};

				$scope.login = function () {
					auth.$login('password', $scope.user)
						.then(function (data) {
							console.log(data);
							// redirect users to /waitlist
							$location.path('/waitlist');
					});
				};

				$scope.logout = function () {
					auth.$logout();
					// redirect users to the landing page
					$location.path('/');
				};

		}]);

