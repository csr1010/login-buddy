apple.models.buddyinfo= (function() {
//	private variable declaration - defualts
	var buddyinfo={
                    info:{}
    };
    return {
		modeltoView:{
			thisModel :buddyinfo,
			domEl : "buddyinfo",
			templateAT:"./html/buddyinfo.html #target", 
			onbeforeLoad : function(){
			},
			renderUI : apple.utils.modelTohtml,
			onAfterLoad : function(){
			}
		}
	};  
})();