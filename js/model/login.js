apple.models.loginModel= (function() {
//	private variable declaration - defualts
    var index=0;
	var loginModel={
                  index: function() {
                        return index++;
                   },
                  buttons:[
                     {
                               name:"Submit",
                               values:[],
                               id:"submitform",
                               selectedResult:[],
                               events:
                               [{
                                   type:"click",
                                   selector:"#submitform",
                                   callback:function(event){
                                       apple.controllers.loginModel.submit.call(this,event);
                                   }
                               }]
                          },
                      {
                               name:"Clear",
                               values:[],
                               id:"clearform",
                               selectedResult:[],
                               events:
                               [{
                                   type:"click",
                                   selector:"#clearform",
                                   callback:function(event){
                                       apple.controllers.loginModel.clear.call(this,event);
                                   }
                               }]
                         }, 
                  ],
                  formElements:[
                      {
                               name:"fname",
                               type:"text",
                               pattern:"^[a-zA-Z ]{1,50}$",
                               error:"Please enter valid fname",
                               maxlength:50,
                               placholder:"first name",
                               required:"required",
                               result:"",
                               events:
                               [{
                                   type:"keyup",
                                   selector:"#fname",
                                   callback:function(event){
                                       apple.controllers.loginModel.validate.call(this,event);
                                   }
                               }]
                      },
                      {
                               name:"lname",
                               type:"text",
                               pattern:"^[a-zA-Z ]{1,50}$",
                               error:"Please enter valid lname",
                               maxlength:50,
                               placholder:"Last name",
                               required:"",result:"",
                               events:
                               [{
                                   type:"keyup",
                                   selector:"#lname",
                                   callback:function(event){
                                       apple.controllers.loginModel.validate.call(this,event );
                                   }
                               }]
                      },
                      /*{
                               name:"appleid",
                               type:"text",
                               pattern:"^.{6,100}$",
                               error:"Please enter valid appeid",
                               maxlength:100,
                               placholder:"Appleid",
                               required:"required",result:"",
                               events:
                               [{
                                   type:"keyup",
                                   selector:"#appleid",
                                   callback:function(event){
                                       apple.controllers.loginModel.validate.call(this,event );
                                   }
                               }]
                      },*/
                      {
                               name:"email",
                               type:"email",
                               pattern:"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",
                               error:"Please enter valid email",
                               maxlength:56,
                               placholder:"User name-Email address",
                               required:"required",result:"",
                               events:
                               [{
                                   type:"keyup",
                                   selector:"#email",
                                   callback:function(event){
                                       apple.controllers.loginModel.validate.call(this,event );
                                   }
                               }]
                      },
                      {
                               name:"password",
                               type:"password",
                               maxlength:100,
                               pattern:"^.{6,100}$",
                               error:"Password must be minimum 6 characters",
                               placholder:"Password",
                               required:"required",result:"",
                               events:
                               [{
                                   type:"keyup",
                                   selector:"#password",
                                   callback:function(event){
                                       apple.controllers.loginModel.validate.call(this,event );
                                   }
                               }]
                      },
                      {
                               name:"confmpassword",
                               type:"password",
                               maxlength:100,
                               pattern:"^.{6,100}$",
                               error:"Password must be minimum 6 characters",
                               placholder:"Confirm Password",
                               required:"required",result:"",
                               events:
                               [{
                                   type:"keyup",
                                   selector:"#confmpassword",
                                   callback:function(event){
                                       apple.controllers.loginModel.validate.call(this,event );
                                   }
                               }]
                      },
                      {
                               name:"dob",
                               type:"text",
                               maxlength:20,
                               placholder:"Date of Birth - mm/dd/yyyy",
                               error:"Please enter valid Date in mm/dd/yyyy , NOTE: you must be born between 1866 - 2002",
                               pattern:"^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](?:(18)[7-9][0-9]|(186)[6-9]|(19)[0-9]{2}|(200)[0-2]))*$",
                               required:"required",result:"",
                               events:
                               [{
                                   type:"keyup",
                                   selector:"#dob",
                                   callback:function(event){
                                       apple.controllers.loginModel.validate.call(this,event );
                                   }
                               }]
                      },
                      {
                               name:"bio",
                               type:"text",
                               pattern:"^.{6,100}$",
                               error:"Please enter valid bio",
                               maxlength:200,
                               placholder:"bio",
                               required:"required",result:"",
                               events:
                               [{
                                   type:"keyup",
                                   selector:"#bio",
                                   callback:function(event){
                                       apple.controllers.loginModel.validate.call(this,event );
                                   }
                               }]
                      },
                  ]
    };
    return {
		modeltoView:{
			thisModel :loginModel,
			domEl : "content",
			templateAT:"./html/login.html #target", 
			onbeforeLoad : function(){
			},
			renderUI : apple.utils.modelTohtml,
			onAfterLoad : function(){
                apple.utils.eventHandlers.call(this);
			}
		}
	};  
})();
