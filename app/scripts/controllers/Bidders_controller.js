'use strict';

angular.module('testApp')
    .controller('Bidders_Ctrl', function($scope,$location,$routeParams) {
        $scope.back_to_bid_list_page= function() {
            $location.path('/bid_list/'+$routeParams.activity_id);
        };
        var bid_id = JSON.parse($routeParams.bid_id);
        var activity_id = JSON.parse($routeParams.activity_id);
        $scope.the_id_of_bid = bid_id;
        $scope.state_button_of_bid = Activity.state_button_of_bid(activity_id,bid_id);
        $scope.show_button_of_bid = Activity.show_button_of_bid(activity_id,bid_id);
        $scope.change_state_of_bid = function(){
            if(confirm('确定要结束竞价吗？')){
                var c_bid = Activity.new_a_activity_for_bid(activity_id);
                c_bid.deal_with_bid_end_situation();
                $scope.show_button_of_bid = Activity.show_button_of_bid(activity_id,bid_id);
                $location.path('bid_result/'+activity_id+'/'+bid_id+'/'+$scope.number_of_bid + '/' + '竞价列表');
            }
        };
        $scope.data_refresh = function(){
            $scope.bidders = Bidder.get_current_bidders(activity_id,bid_id) || [];
            $scope.number_of_bid = $scope.bidders.length;
        };
        $scope.data_refresh();
        $scope.bid_button_is_disabled = bid_button_is_disabled(bid_id);
    });