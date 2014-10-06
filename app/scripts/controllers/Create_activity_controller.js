'use strict';

angular.module('testApp')
    .controller('Create_activity_Ctrl', function ($scope,$location) {
        $scope.show_the_return_button = Activity.get_activity_list().length === 0 ? false : true;
        $scope.back_to_activity_list = function () {
            $location.path('/activity_list');
        };
        $scope.has_duplication = false;
        $scope.save_activity = function () {
            if (Activity.activity_name_is_duplicated($scope.activity_name)) {
                $scope.has_duplication = true;
            }
            else {
                var activity = new Activity($scope.activity_name,Activity.get_activity_list().length+1);
                activity.save_a_new_activity();
                $location.path('/sign/'+activity.activity_id);
           }
        };
        $scope.remove_warning = function(){
            $scope.has_duplication = false;
        }
   });

