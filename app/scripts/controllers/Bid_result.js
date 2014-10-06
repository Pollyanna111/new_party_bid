'use strict';


angular.module('testApp')
    .controller('Bid_result_Ctrl', function ($scope,$location,$routeParams) {
        var bid_id = JSON.parse($routeParams.bid_id);
        var activity_id = JSON.parse($routeParams.activity_id);
        $scope.back_to_bid_list_page = function(){
            $location.path('bid_list/'+activity_id);
        };
        $scope.id_of_bid = bid_id;
        $scope.number_of_bid = $routeParams.number_of_bid;
        $scope.go_to_bid_statistics_page = function(){
            $location.path('bid_statistics/'+activity_id+'/'+bid_id+'/'+$routeParams.number_of_bid);
        };
        $scope.bidders = Bidder.get_bidders_for_bid_result(activity_id,bid_id);
        $scope.winner = Bidder.get_winner_of_bid(activity_id,bid_id);
        $scope.close_modal = function(){
            $scope.Is_it_come_from_biders_page = false;
        };
        $scope.bid_result = !($routeParams.last_page == '竞价列表');
        if($routeParams.last_page == '竞价列表'){
            $('#myModal').modal("show");
            setTimeout(function(){
                    $('#myModal').modal('hide');
                    $scope.bid_result = true;$scope.$apply();}
                ,3000);
        }
        $scope.show_bid_result = function(){
            $scope.bid_result = true;
        }
    });

