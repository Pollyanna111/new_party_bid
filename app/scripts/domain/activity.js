'use strict';

function Activity (activity_name, activity_id, sign_state, bid_state, bid_number){
    this.activity_name = activity_name;
    this.activity_id = activity_id;
    this.sign_state = sign_state || '尚未开始';
    this.bid_state = bid_state || '尚未开始';
    this.bid_number = bid_number || 0;
}


Activity.get_activity_list = function(){
    return JSON.parse(localStorage.getItem('activity_list')) || [];
};

Activity.save_activity_list = function(activity_list){
    localStorage.setItem('activity_list',JSON.stringify(activity_list));
};

Activity.should_activity_be_yellow = function(activity_id){
    return (get_current_sign_state(activity_id) === '正在进行' || Activity.activity_bid_state(activity_id) === '正在进行')
};

Activity.activity_bid_state = function(activity_id){
    var activity_list = Activity.get_activity_list();
    return _(activity_list).findWhere({activity_id:activity_id}).bid_state;
};

Activity.activity_name_is_duplicated = function(activity_name) {
    var activity_list = Activity.get_activity_list();
    return (_(activity_list).findWhere({activity_name: activity_name}))
};

Activity.prototype.deal_with_end_situation = function(){
    this.sign_state='已经结束';
    Activity.sync_activity_list(this);
    save_current_bid(this.activity_id,null);
};

Activity.prototype.deal_with_begin_situation = function(){
    this.sign_state = '正在进行';
    Activity.sync_activity_list(this);
    save_current_sign(this.activity_id);
    save_current_bid(this.activity_id,null);
};

Activity.sync_activity_list = function(current_activity){
    var activity_list = Activity.get_activity_list();
    var i = _(activity_list).findWhere({activity_id: current_activity.activity_id}).activity_id;
    activity_list[i-1] = current_activity;
    Activity.save_activity_list(activity_list);
};

Activity.prototype.save_a_new_activity = function(){
    var activity_list = Activity.get_activity_list();
    activity_list.push(this);
    save_current_sign(activity_list.length);
    Activity.save_activity_list(activity_list);
};

Activity.find_by_id = function(id) {
  var found_activity = _(Activity.get_activity_list()).findWhere({activity_id: id});
  return new Activity(found_activity.activity_name, found_activity.activity_id, found_activity.sign_state,found_activity.bid_state,found_activity.bid_number);
};

Activity.check_current_bid_state = function(){
    var activity_list = Activity.get_activity_list();
    var current_bid = get_current_bid();
    return _(activity_list).findWhere({activity_id:current_bid.activity_id}).bid_state;
};

Activity.process_bid_by_bid_state = function(participant,bid_state){
    if(bid_state === '正在进行'){
        return Bidder.Is_participant_qualified(participant);
    }
    return bid_state === '已经结束' ? '竞价已经结束' : '竞价尚未开始';
};

Activity.get_current_bid_list = function(activity_id){
    var bid_number = _((Activity.get_activity_list())).findWhere({activity_id:activity_id}).bid_number;
    var bid_list = [];
    _(bid_number).times(function(i){
        bid_list[i] = i + 1;
    });
    return bid_list;
};

Activity.prototype.save_a_new_bid = function(){
    this.bid_state = '正在进行';
    this.bid_number++;
    save_current_bid(this.activity_id,this.bid_number);
    Activity.sync_activity_list(this);
};

Activity.new_a_activity_for_bid = function(activity_id){
    var activity_list = Activity.get_activity_list();
    var c = _(activity_list).findWhere({activity_id:activity_id});
    return (new Activity(c.activity_name, c.activity_id, c.sign_state, c.bid_state, c.bid_number));
};

Activity.state_button_of_bid = function(activity_id,bid_id){
    return Activity.get_current_bid_state(activity_id,bid_id) === '正在进行' ? '结束' : '开始' ;
};

Activity.get_current_bid_state = function(activity_id,bid_id){
    var activity_list = Activity.get_activity_list();
    var c = _(activity_list).findWhere({activity_id:activity_id});
    return bid_id === c.bid_number ? c.bid_state : '已经结束';
};

Activity.show_button_of_bid = function(activity_id,bid_id){
    return Activity.get_current_bid_state(activity_id,bid_id) == '已经结束' ? false:true;
};

Activity.prototype.deal_with_bid_end_situation = function(){
    this.bid_state = '已经结束';
    Activity.sync_activity_list(this);
    save_current_bid(this.activity_id,this.bid_id);
};
