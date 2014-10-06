'use strict';

function Signer (name,phone,activity_id){
    this.name = name;
    this.phone = phone;
    this.activity_id = activity_id;

}

Signer.get_signers = function(){
    return JSON.parse(localStorage.getItem('signers')) || [];
};

Signer.save_signers = function(signer){
    localStorage.setItem('signers',JSON.stringify(signer));
};

Signer.Is_participant_qualified = function (signer){
    signer.message=signer.message.slice(2,signer.message.length);
    return Signer.signer_has_signed(signer) ? '已经报名' : Signer.sign_succeed(signer);
};

Signer.sign_succeed = function(signer){
    var c_activity =new Signer(signer.message, signer.phone, get_current_sign().activity_id);
    c_activity.save_information_of_signer(signer);
    var page_jump_or_not = document.getElementById('signer');
    Data_Refresh(page_jump_or_not);
    return '报名成功';
};

Signer.signer_has_signed = function(participant){
    var signer = Signer.get_signers();
    var current_sign = get_current_sign();
    return _.findWhere(signer, {activity_id: current_sign.activity_id,phone:participant.phone})
};

Signer.prototype.save_information_of_signer = function(){
    var signer = Signer.get_signers();
    signer.push(this);
    Signer.save_signers(signer);
};

Signer.get_name_of_signer = function(participant){
    var sign_information = Bidder.find_bidder(participant);
    var signer = Signer.get_signers();
    return _(signer).findWhere(sign_information).name;
};