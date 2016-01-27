apple.models.addbuddy= (function() {
//	private variable declaration - defualts
    apple.models.loginModel.modeltoView.thisModel.formElements.splice(3,2);
    var index=0;
	var addbuddy={
                 index: function() {
                                return index++;
                           },
                        buttons:[
                             {
                                               name:"Add",
                                               values:[],
                                               id:"addform",
                                               selectedResult:[],
                                               events:
                                               [{
                                                   type:"click",
                                                   selector:"#addform",
                                                   callback:function(event){
                                                       apple.controllers.loginModel.submit.call(this,event,true);
                                                   }
                                               }]
                                          },
                                      {
                                               name:"Close",
                                               values:[],
                                               id:"closeform",
                                               selectedResult:[],
                                               events:
                                               [{
                                                   type:"click",
                                                   selector:"#closeform",
                                                   callback:function(event){
                                                       apple.controllers.addbuddy.closeBuddy.call(this,event);
                                                   }
                                               }]
                                         }, 
                        ],
                        formElements:apple.models.loginModel.modeltoView.thisModel.formElements,
                        priority:[{
                               name:"priority",
                               result:"",
                               values:[
                                   {name:"high" , value:"high",},
	                        	   {name:"medium" , value:"medium"},
                                   {name:"none" , value:"none"}],
                       }],
    };
    return {
		modeltoView:{
			thisModel :addbuddy,
			domEl : "addbuddy",
			templateAT:"./html/login.html #target", 
			onbeforeLoad : function(){
			},
			renderUI : apple.utils.modelTohtml,
			onAfterLoad : function(){
                    $("#addbuddy").show();
                
                	apple.utils.eventHandlers.call(this);
			}
		}
	};  
})();