apple.controllers.loginModel= (function() {
	var thisModel = apple.models.loginModel.modeltoView.thisModel;
	return{
          showError:function(id,msg,num){
                  var classMethod = msg =="" || msg=="clear" ? "removeClass" :"addClass";
                  $("#"+id)[classMethod]("error");
                  $("#"+id).next("span")[classMethod]("showerrorText").text(msg);
                  thisModel.formElements[num].result = msg!="" || msg=="clear" ? "" : $("#"+id).val();
          },
		  validate:function(event){
              var num = Number(event.currentTarget.dataset.num);
              var validity = event.currentTarget.validity;
              var value = event.currentTarget.value;
              var keycode = (typeof event.which == "number") ? event.which : event.keyCode; 
              if(keycode == 13){
                  apple.controllers.loginModel.submit(event);
              }else{
                 apple.controllers.loginModel.showError(
                  thisModel.formElements[num].name,
                  event.currentTarget.required ? 
                  validity.valueMissing?thisModel.formElements[num].placholder+" is required":validity.patternMismatch?thisModel.formElements[num].error:""
                   : "",num);
              
                if(thisModel.formElements[num].name=='confmpassword' && value != thisModel.formElements[num-1].result ){
                    apple.controllers.loginModel.showError(
                      thisModel.formElements[num].name
                        ,"Password and confirm password must match",num);
                } 
              }
          },
          clear:function(event){
              if(confirm('Are you sure to clear the form ?')){
                  thisModel.formElements.forEach(function(val,index){
                        apple.controllers.loginModel.showError(val.name,"clear",index);
                  });
                  apple.models.loginModel.modeltoView.renderUI(true);
              }
          },
         submit:function(event,nav){
                  var flag = true;
                  var buddyObject = {};
                  for(var i=0;i<thisModel.formElements.length;i++){
                      var val = thisModel.formElements[i];
                      if(val.required == "required" &&
                          val.result =="" || $("#"+val.name).hasClass("error")){
                          flag = false;
                          apple.controllers.loginModel.showError(val.name,val.error,i);
                          break;
                      }else{
                          if(val.name=="dob"){
                              buddyObject["isodate"] = new Date(val.result).toISOString();
                          }
                              buddyObject[val.name] = val.result;
                      }
                  }
                  if(flag){
                      var buddyModel = JSON.parse(sessionStorage.getItem("buddydata"));
                      buddyObject.lastseen="today";
                      buddyObject.status="online";
                      buddyObject.id="_"+new Date().getTime();
                      buddyObject.priority=nav ? $("#priority").val() : "High";
                      buddyModel.buddy.unshift(buddyObject);
                      sessionStorage.setItem("buddydata",JSON.stringify(buddyModel));
                      if(nav){
                          $("#addbuddy").hide();
                          $("input").val("")
                          $("#addbuddy").removeClass("scale");
                          $(".toblur").removeClass("blurme");
                          apple.models.buddyModel.modeltoView.thisModel.list.values = buddyModel.buddy;
                          apple.models.buddyModel.modeltoView.renderUI(true);
                      }
                      else
                         window.location="/index.html";
                  }
          }
	};
})();