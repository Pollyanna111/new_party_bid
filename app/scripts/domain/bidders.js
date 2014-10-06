'use strict';

function Bidder (activity_id,bid_id,name,phone,price,bidder_number) {
    this.activity_id = activity_id;
    this.bid_id = bid_id;
    this.name =name;
    this.phone = phone;
    this.price = price;
    this.bidder_number = bidder_number;
}

Bidder.get_bidders = function(){
    return JSON.parse(localStorage.getItem('bidders')) || [];
};

Bidder.save_bidders = function(bidders){
    localStorage.setItem('bidders',JSON.stringify(bidders));
};

Bidder.get_current_bidders = function(activity_id,bid_id){
    return _(Bidder.get_bidders()).where({activity_id: activity_id,bid_id:bid_id}) || [];
};

Bidder.Is_participant_qualified = function(bidder){
    if(!Bidder.find_bidder(bidder)) {
        return '没有报名';
    }
    if(Bidder.bidder_has_bid(bidder) === '已经竞价') {
        return '已经竞价';
    }
    return Bidder.bid_succeed(bidder);
};

Bidder.bid_succeed = function(bidder){
    var price = Number(bidder.message.slice(2,bidder.message.length));
    if( price <= 0 || isNaN(price)){
        return;
    }
    var name = Signer.get_name_of_signer(bidder);
    var bidder_number = Bidder.get_number_of_bidders()+1;
    var current_bidder = new Bidder(get_current_bid().activity_id,get_current_bid().bid_id,name,bidder.phone,price,bidder_number);
    current_bidder.save_information_of_bidders();
    var page_jump_or_not = document.getElementById('bidder');
    Data_Refresh(page_jump_or_not);
    return '竞价成功';
};

Bidder.find_bidder = function(bidder){
    var current_bid = get_current_bid();
    return _(Signer.get_signers()).findWhere({activity_id: current_bid.activity_id,phone:bidder.phone});
};

Bidder.bidder_has_bid = function(bidder){
    var current_bid = get_current_bid();
    var bidders = Bidder.get_bidders();
    return (_(bidders).findWhere({activity_id: current_bid.activity_id,bid_id:current_bid.bid_id,phone:bidder.phone})) ? '已经竞价' : '没有竞价';
};

Bidder.prototype.save_information_of_bidders = function(){
    var bidders = Bidder.get_bidders();
    bidders.push(this);
    Bidder.save_bidders(bidders);
};

Bidder.get_number_of_bidders = function(){
    var current_bid = get_current_bid();
    return _(Bidder.get_bidders()).where({activity_id: current_bid.activity_id,bid_id:current_bid.bid_id}).length;
};

Bidder.get_bidders_for_bid_result = function(activity_id,bid_id){
    var current_bidders = Bidder.get_current_bidders(activity_id,bid_id);
    var ordered_current_bidders = _(current_bidders).sortBy(function(element){
        return element.price;
    });
    return  _(ordered_current_bidders).map(function(current_bidder){
        var i = _(ordered_current_bidders).indexOf(current_bidder);
        current_bidder.bidder_number = i+1;
        return  current_bidder;
    }) || [];
};

Bidder.get_bid_price_for_bid_statistics = function(activity_id,bid_id){
    var current_bidders = Bidder.get_bidders_for_bid_result(activity_id,bid_id);
    var prices =_(_(current_bidders).pluck('price')).uniq();
    var bid_prices =new Array(0);
    _(prices).each(function(price){
        var count = 0;
        _(current_bidders).each(function(bidder){
            if(bidder.price === price){
                count = count + 1;
            }
        });
        bid_prices.push({price:price,number_of_bidders:count});
    });
    return bid_prices || [];
};

Bidder.get_winner_of_bid = function(activity_id,bid_id){
    var current_bidders = Bidder.get_bidders_for_bid_result(activity_id,bid_id);
    if(current_bidders == []){
        return null;
    }
    var ordered_price = _(current_bidders).groupBy(function (each_bidder) {
        return each_bidder.price;
    });
    var uniq = [] , values = _(ordered_price).values();
    _(values).each(function (price) {
        if(price.length === 1){
            uniq.push(price);
        }
    });
    return uniq.shift()[0];
};