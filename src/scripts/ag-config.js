var app = angular.module("app", []);
app.controller("MainCtrl", ["$scope",
    function($scope) {
        $scope.friends = [{
            name: 'Emma Eley',
            birthday: "01/18",
            niceBirthday:"18th January"
        }, {
            name: 'Lauren Henley',
            birthday: "02/13",
            niceBirthday:"13th February"
        }, {
            name: 'Zakariya Desai',
            birthday: "02/16",
            niceBirthday:"16th February"
        }, {
            name: 'Adam Kellett',
            birthday: "03/2",
            niceBirthday:"2nd March"
        }, {
            name: 'Michael Foster',
            birthday: "03/16",
            niceBirthday:"16th March"            
        }, {
            name: 'Hannah Ratcliffe',
            birthday: "04/14",
            niceBirthday:"14th April"
        }, {
            name: 'Lauren Kirby',
            birthday: "06/13",
            niceBirthday:"13th June"
        }, {
            name: "Hannah Dell'Armi",
            birthday: "06/18",
            niceBirthday:"18th June"
        }, {
            name: 'Stuart Jameson',
            birthday: "07/23",
            niceBirthday:"23rd July"
        }, {
            name: 'Jon Hunter',
            birthday: "08/2",
            niceBirthday:"2nd August"
        }, {
            name: 'Simon Clayton',
            birthday: "08/31",
            niceBirthday:"31st August"
        }, {
            name: 'Chris Green',
            birthday: "09/5",
            niceBirthday:"5th September"
        }, {
            name: 'Heath Reidy',
            birthday: "09/6",
            niceBirthday:"6th September"
        }, {
            name: 'Luke Rossall',
            birthday: "10/24",
            niceBirthday:"24th October"
        }, {
            name: 'Joanna Marshall',
            birthday: "11/2",
            niceBirthday:"2nd November"
        }, {
            name: 'David Vesty',
            birthday: "11/18",
            niceBirthday:"18th November"
        }, {
            name: 'Chris Lomax',
            birthday: "11/24",
            niceBirthday:"24th November"
        }, {
            name: 'Chris Worthington',
            birthday: "11/25",
            niceBirthday:"25th November"
        }, {
            name: 'Karl Draper-Firth',
            birthday: "12/27",
            niceBirthday:"27th December"
        }]
        
		$scope.friends.forEach(function(data) {
            var day = data.birthday.split("/")
            var currentYear = new Date().getFullYear();
            var birthdayDate = new Date(currentYear, day[0] - 1,
                day[1])
            var now = new Date().valueOf();
            if (birthdayDate.valueOf() < now) {
                birthdayDate.setFullYear(currentYear + 1)
            }
            data.fromNow = birthdayDate.valueOf() - now;
            data.birthDate = new Date(data.birthday);
        })
      
      $scope.todayBirthday = true;
      
      $scope.onlyToday = function(friend) {
        var today = new Date();
        var currentDay = ("0" + today.getDate()).slice(-2);
        var currentMonth = ("0" + (today.getMonth() + 1)).slice(-2);
        
        var month = friend.birthday.split('/')[0];
        var day = friend.birthday.split('/')[1];
        
        if(day == currentDay && month == currentMonth)
          return true;
        else
          return false;
      }
    }
]);