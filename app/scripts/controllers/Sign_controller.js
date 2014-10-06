'use strict';

angular.module('testApp')
    .controller('Sign_Ctrl', function ($scope,$location,$routeParams) {
        $scope.back_to_activities_list_page = function() {
            $location.path('/activity_list');
        };
        var activity_id = JSON.parse($routeParams.activity_id);
        $scope.button_is_not_available = sign_button_is_not_available(activity_id);
        $scope.state_button_of_sign = state_button_of_sign(activity_id);
        $scope.show_number_of_person = show_number_of_person(activity_id);
        $scope.change_state_of_sign=function(){
            $scope.show_number_of_person = true;
            var current_activity = Activity.find_by_id(activity_id);
            if($scope.state_button_of_sign === '结束' && confirm('确定要结束报名吗？') ){
                current_activity.deal_with_end_situation();
                $scope.state_button_of_sign = '开始';
                return $location.path('/bid_list/'+activity_id);
            }
            current_activity.deal_with_begin_situation();
            $scope.state_button_of_sign = '结束';
        };
        $scope.data_refresh = function(){
            $scope.signers = get_current_activity_signers(activity_id).reverse() || [];
            $scope.number_of_signers = $scope.signers.length;
        };
        $scope.data_refresh();
        $scope.go_to_bid_page = function(){
            $location.path('/bid_list/'+activity_id);
        };
    });
