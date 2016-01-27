apple.models.footerModel= (function() {
//	private variable declaration - defualts
	var footerModel={
                        delete:{
                               name:"Delete",
                               values:[],
                               selectedResult:[],
                               events:
                               [{
                                   type:"click",
                                   selector:"#delete",
                                   callback:function(event){
                                       apple.controllers.buddyModel.deleteBuddies.call(this,event);
                                   }
                               }]
                             },
                         add:{
                               name:"Add",
                               values:[],
                               selectedResult:[],
                               events:
                               [{
                                   type:"click",
                                   selector:"#addnew",
                                   callback:function(event){
                                       apple.controllers.buddyModel.addbuddydialog.call(this,event);
                                   }
                               }]
                             },
                        filter:[{
                               name:"Sort - lastname",
                               values:[],
                               selectedResult:[],
                               id:"sortlname",
                               events:
                               [{
                                   type:"click",
                                   selector:"#sortlname",
                                   callback:function(event){
                                       apple.controllers.buddyModel.sortBuddies.call(this,event,"lname");
                                   }
                               }]
                             },{
                               name:"Sort - status",
                               values:[],
                               selectedResult:[],
                               id:"sortstats",
                               events:
                               [{
                                   type:"click",
                                   selector:"#sortstats",
                                   callback:function(event){
                                       apple.controllers.buddyModel.sortBuddies.call(this,event,"status");
                                   }
                               }]
                             },{
                               name:"Prioritize",
                               values:[],
                               selectedResult:[],
                               id:"Prioritize",
                               events:
                               [{
                                   type:"click",
                                   selector:"#Prioritize",
                                   callback:function(event){
                                       apple.controllers.buddyModel.sortBuddies.call(this,event,"priority",true);
                                   }
                               }]
                             },{
                               name:"Filter - Online",
                               values:[],
                            id:"filteroln",
                               selectedResult:[],
                               events:
                               [{
                                   type:"click",
                                   selector:"#filteroln",
                                   callback:function(event){
                                       apple.controllers.buddyModel.FilterBuddies.call(this,event,"status","online");
                                   }
                               }]
                             },{
                               name:"Filter - age>30",
                               values:[],
                                id:"filterage",
                               selectedResult:[],
                               events:
                               [{
                                   type:"click",
                                   selector:"#filterage",
                                   callback:function(event){
                                       apple.controllers.buddyModel.FilterBuddies.call(this,event,"dob",1986);
                                   }
                               }]
                             },{
                               name:"Reset List",
                               values:[],
                                id:"rmvfiltr",
                               selectedResult:[],
                               events:
                               [{
                                   type:"click",
                                   selector:"#rmvfiltr",
                                   callback:function(event){
                                       apple.controllers.buddyModel.removeFilters.call(this,event);
                                   }
                               }]
                             }]
    };
    return {
		modeltoView:{
			thisModel :footerModel,
			domEl : "footer",
			templateAT:"./html/footer.html #target", 
			onbeforeLoad : function(){
			},
			renderUI : apple.utils.modelTohtml,
			onAfterLoad : function(){
				apple.utils.eventHandlers.call(this);
			}
		}
	};  
})();