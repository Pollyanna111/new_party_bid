'use strict';

var get_current_bid = function(){
    return JSON.parse(localStorage.getItem('current_bid'));
};

var save_current_bid = function(activity_id,bid_id){
    localStorage.setItem('current_bid',JSON.stringify({activity_id:activity_id,bid_id:bid_id}))
};

var Is_sign_state_is_ongoing = function(){
    return _(Activity.get_activity_list()).findWhere({sign_state: "正在进行"});
};

var Is_bid_state_is_ongoing = function(){
    return _(Activity.get_activity_list()).findWhere({bid_state: "正在进行"});
};

var sign_button_is_not_available = function(activity_id){
    var this_activity_is_not_signing =! ((Activity.get_activity_list())[activity_id-1].sign_state==='正在进行');
    return this_activity_is_not_signing && (Is_bid_state_is_ongoing() || Is_sign_state_is_ongoing());
};

var bid_button_is_not_available = function(activity_id) {
    var signers = Signer.get_signers();
    if (Is_sign_state_is_ongoing() || Is_bid_state_is_ongoing() || signers.length == 0) {
        return true;
    }
    return (signers.length != 0 && _(signers).findWhere({activity_id: activity_id}) === undefined);
};

var state_button_of_sign= function(activity_id){
    return get_current_sign_state(activity_id)==='正在进行' ? '结束' : '开始';
};

var show_number_of_person = function(activity_id){
    return !(get_current_sign_state(activity_id) === '尚未开始');
};

var get_current_sign_state = function(activity_id){
    return Activity.get_activity_list()[activity_id-1].sign_state;
};

var save_current_sign = function(activity_id){
    localStorage.setItem('current_sign',JSON.stringify({activity_id:activity_id}));
};

var get_current_sign = function(){
    return JSON.parse(localStorage.getItem('current_sign'));
};

var create_button_is_disabled = function(){
    return Is_sign_state_is_ongoing() || Is_bid_state_is_ongoing();
};

var Data_Refresh = function(page_jump_or_not) {
    if (page_jump_or_not) {
        var scope = angular.element(page_jump_or_not).scope();
        scope.$apply(function () {
            scope.data_refresh();
        })
    }
};

var get_current_activity_signers = function(activity_id){
    return _(Signer.get_signers()).where({activity_id: activity_id});
};

var bid_button_is_disabled = function(bid_id){
    return !(get_current_bid().bid_id === bid_id )
};

var sign_or_bid = function(participant){
    participant.message = participant.message.replace(/[ ]/g,"");
    if(participant.message[0]=='b'||participant.message[0]=='B'  && participant.message[1]=='m'||participant.message[1]=='M'){
       return check_sign_state(participant);
    }
    if(participant.message[0]=='j'||participant.message[0]=='J' && participant.message[1]=='j'||participant.message[1]=='J'){
        var bid_state = Activity.check_current_bid_state();
       return Activity.process_bid_by_bid_state(participant,bid_state);
    }
};

var check_sign_state = function(participant){
    var current_sign = get_current_sign();
    var current_sign_state = {
       '尚未开始':'报名尚未开始',
       '正在进行':Signer.Is_participant_qualified(participant),
       '已经结束':'报名已经结束'
    };
    return current_sign_state[get_current_sign_state(current_sign.activity_id)];
};

var message = {
    '没有报名':'对不起，您没有报名，不能参与竞价',
    '已经竞价':'您已经参与竞价，请勿重复竞价',
    '已经报名':'您已经参与报名，请勿重复报名',
    '竞价成功':'恭喜你，竞价成功！^-^',
    '报名成功':'恭喜你，报名成功！^-^',
    '报名尚未开始':'对不起，报名还没开始。T^T',
    '竞价尚未开始':'对不起，竞价还没开始。T^T',
    '竞价已经结束':'对不起，竞价已经结束了。T^T',
    '报名已经结束':'对不起，报名已经结束了。T^T'
};
