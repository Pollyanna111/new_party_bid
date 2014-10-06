'use strict';

angular.module('testApp')
  .controller('Activity_list_Ctrl', function ($scope,$location) {
        (function initial(){
            if(Activity.get_activity_list().length === 0){
                $location.path('/create_activity');
            }
        })();
        $scope.create_button_is_disabled = create_button_is_disabled();
        $scope.go_to_sign_page = function(activity_id){
            $location.path('/sign/'+activity_id);
        };
        $scope.go_to_create_activity_page = function () {
            $location.path('/create_activity');
        };
        $scope.activity_list = Activity.get_activity_list().reverse();
        $scope.should_activity_be_yellow = function (activity_id){
            return Activity.should_activity_be_yellow(activity_id);
        };
  });


