apple.models.buddyModel= (function() {

//	private variable declaration - defualts
	var buddyModel={
                        list:{
                               name:"",
                               values:[],
                               selectedResult:[],
                               events:
                               [{
                                   type:"change",
                                   selector:".checker",
                                   callback:function(event){
                                       apple.controllers.buddyModel.setSelectedData.call(this,event);
                                   }
                               }]
                             },
                        search:{
                               name:"Search by first name",
                               values:[],
                               id:"filterfname",
                               selectedResult:[],
                               events:
                               [{
                                   type:"click",
                                   selector:"#filterfname",
                                   callback:function(event){
                                     apple.controllers.buddyModel.FilterBuddies.call(this,event,"fname",$("#searchfname").val());
                                   }
                               }]
                             },
                        checkList:{
                               name:"",
                               values:[],
                               selectedResult:[],
                               events:
                               [{
                                   type:"click",
                                   selector:".budlst",
                                   callback:function(event){
                                       apple.controllers.buddyModel.showbuddyInfo.call(this,event);
                                   }
                               }]
                             }
	                 };

//	public methods and variables // can be accessed by outside world	
	return {
		modeltoView:{
			thisModel :buddyModel,
			domEl : "buddieslist",
			templateAT:"./html/buddieslist.html #target", 
			onbeforeLoad : function(){
                buddyModel.list.values = JSON.parse(sessionStorage.getItem("buddydata")).buddy;
			},
			renderUI : apple.utils.modelTohtml,
			onAfterLoad : function(){
				apple.utils.eventHandlers.call(this);
			}
		}
	};   
})(); // module javascirpt pattern // anonymus function
