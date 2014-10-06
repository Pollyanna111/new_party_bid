'use strict';

angular.module('testApp')
    .controller('Bid_statistics_Ctrl', function ($scope,$location,$routeParams) {
        var bid_id = JSON.parse($routeParams.bid_id);
        var activity_id = JSON.parse($routeParams.activity_id);
        $scope.back_to_bid_list_page = function(){
            $location.path('bid_list/'+activity_id);
        };
        $scope.the_id_of_bid = bid_id;
        $scope.number_of_bid = $routeParams.number_of_bid;
        $scope.go_to_bid_result_page = function(){
            $location.path('bid_result/'+activity_id+'/'+bid_id+'/'+$routeParams.number_of_bid + '/' + '竞价统计');
        };
        $scope.bid_prices = Bidder.get_bid_price_for_bid_statistics(activity_id,bid_id);
        $scope.winner = Bidder.get_winner_of_bid(activity_id,bid_id);
    });