
apple.controllers.addbuddy= (function() {
	var thisModel = apple.models.addbuddy.modeltoView.thisModel;
	return{
        // closes the dialog opened 
        //  set the model to empty
        //clear all form input fields
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

