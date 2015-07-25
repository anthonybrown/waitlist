'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
	// you can create a service in many different ways
	// .service() is one, don't worry about the many
	// ways to create them. Use .value and .factory for
	// now
	//.value('FIREBASE_URL', 'https://waitlist-tonybrown.firebaseio.com/')
	// this factory method is the equivalent to line 9.
	.factory('FIREBASE_URL', function() {
		return 'https://waitlist-tonybrown.firebaseio.com/';
	})
	.factory('authService', function ($firebaseSimpleLogin, $location, FIREBASE_URL) {
		var authRef = new Firebase(FIREBASE_URL);
		var auth = $firebaseSimpleLogin(authRef);

		return {
			login: function (user) {
				auth.$login('password', user)
					.then(function (data) {
						console.log(data);
						// redirect users to /waitlist
					$location.path('/waitlist');
				});
			}
		};
	});
