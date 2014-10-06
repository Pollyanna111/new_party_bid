'use strict';

angular.module('testApp')
    .controller('Bid_list_Ctrl', function($scope,$location,$routeParams) {
        $scope.back_to_activities_list_page = function() {
            $location.path('/activity_list');
        };
        var activity_id = JSON.parse($routeParams.activity_id);
        $scope.bid_state = function(bid_id){
            return Activity.get_current_bid_state(activity_id,bid_id) === '正在进行';
        };
        $scope.bid_list = Activity.get_current_bid_list(activity_id).reverse();
        $scope.go_to_bidders_page = function(bid_id){
            $location.path('/bidders/'+activity_id+'/'+bid_id);
        };
        $scope.go_to_sign_page = function() {
            $location.path('/sign/'+activity_id);
        };
        $scope.button_is_not_available = bid_button_is_not_available(activity_id);
        $scope.create_a_new_bid = function(){
            var c_bid = Activity.new_a_activity_for_bid(activity_id);
            c_bid.save_a_new_bid();
            $location.path('/bidders/'+activity_id+'/'+c_bid.bid_number);
        };
    });




