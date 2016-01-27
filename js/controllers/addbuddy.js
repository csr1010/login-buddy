
apple.controllers.addbuddy= (function() {
	var thisModel = apple.models.addbuddy.modeltoView.thisModel;
	return{
        addBuddy:function(event){
             var currentVals = apple.models.buddyModel.modeltoView.thisModel.list.values;
             var replica = {
                    "fname": $("#fname").val(),
                    "lname": $("#lname").val(),
                    "appleid": "cs@apple.com",
                    "status": {
                        "lastseen": "today at 11:16am",
                        "status": "online"
                    },
                    "id":"_"+new Date().getTime()+currentVals.length,
                    "dob": "04/2/1990",
                    "email": "cs@cs.com",
                    "bio": "I am from abcd , blha blha blha  content - "
                };
             currentVals.unshift(replica);
             apple.models.buddyModel.modeltoView.renderUI(true);
        },
        closeBuddy:function(){
            $("#addbuddy").hide();
            $("#addbuddy").removeClass("scale");
            $(".toblur").removeClass("blurme");
            thisModel.formElements.forEach(function(val,index){
                       val.result = "";
            });
            $("input").val("");
        }
	};
})();

