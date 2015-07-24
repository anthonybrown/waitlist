'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('LandingPageController', [function () {

	}])
	.controller('WaitlistController', ['$scope','$firebase',  function ($scope, $firebase) {
		// connect $scope.parties to live firebase data.
		var partiesRef = new Firebase('https://waitlist-tonybrown.firebaseio.com/parties');
		//$scope.testVariable = 'tony';
		$scope.parties = $firebase(partiesRef);

		// Object to store data from form
		$scope.newParty = { name: '',	phone: '', size: '' }

		// Function to save a new party to the list.
		$scope.saveParty = function () {
			$scope.parties.$add($scope.newParty);
			$scope.newParty = {name: '', phone: '', size: ''}
		};

		// function to send text messages to parties
		$scope.sendTextMsg = function (party) {
			var textMessageRef = new Firebase('https://waitlist-tonybrown.firebaseio.com/textMessages');
			var textMessages = $firebase(textMessageRef);
			var newTextMessage = {
				phoneNumber: party.phone,
				size: party.size,
				name: party.name
			}
			textMessages.$add(newTextMessage);
		}

	}]);

