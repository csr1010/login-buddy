apple.controllers.buddyModel= (function() {
	var thisModel = apple.models.buddyModel.modeltoView.thisModel;
    var sortOrder = false;
	return{
        //setting selected checkboxes to a list
        //if checkbox is true add to list else remove frrom list
		 setSelectedData:function(event){
             var currentId = event.currentTarget.id;
             if(event.currentTarget.checked)
                thisModel.list.selectedResult.push(currentId);
             else{
                 var index = thisModel.list.selectedResult.indexOf(currentId);
                 thisModel.list.selectedResult.splice(index,1);
             }
         },
         //hightlight footer buttons when selected on it.
         highlitButton:function(event){
             $("footer button").removeClass("active");
             $(event.currentTarget).addClass("active");
         },
         //if buddies are selected ,  and user confirmed to delete
          // delete buddies from list and store new buddylist into object and 
         //store in session
         deleteBuddies:function(event){
             apple.controllers.buddyModel.highlitButton(event);
              var selectedBuddies = thisModel.list.selectedResult;
             if (selectedBuddies.length > 0 && confirm('Are you sure to delete selected values ?')) {
                var buddiesList = thisModel.list.values;
                  var newValues = buddiesList.filter(function (val,index){
                        return selectedBuddies.indexOf(val.id) == -1;
                  });
               thisModel.list.values = newValues;
               var buddyModel = JSON.parse(sessionStorage.getItem("buddydata"));
               buddyModel.buddy = newValues;
               sessionStorage.setItem("buddydata",JSON.stringify(buddyModel));
               apple.models.buddyModel.modeltoView.renderUI(true);
                 thisModel.list.selectedResult=[];
               $("#buddyinfo").empty();  
             }
         },
          /*show a dialog whne user clicks on add button */
         addbuddydialog:function(event){
               apple.controllers.buddyModel.highlitButton(event); 
               if(!$("#addbuddy").hasClass("rendered"))
               apple.models.addbuddy.modeltoView.renderUI(true);
               $("#addbuddy").show();
               setTimeout(function(){
                    $("#addbuddy").addClass("scale rendered");
               },200);
               $(".toblur").addClass("blurme");
         },
      /*   when user clicks on a buddy ,get corresponding object info and
        render further information onf the right side view*/
        showbuddyInfo:function(event){
             $(".budlst ").removeClass("active");
             var currentId = event ? event.currentTarget.dataset.id : "";
             var buddiesList = thisModel.list.values;
                  var selectedValuetoShow = buddiesList.filter(function(val,index){
                        return val.id == currentId;
                  });
             apple.models.buddyinfo.modeltoView.thisModel.info =  selectedValuetoShow[0] || {};
             apple.models.buddyinfo.modeltoView.renderUI(true);
             setTimeout(function(){
                 if(event && !selectedValuetoShow[0].show)
                    $("#lastseen").hide();
                    $("#"+currentId).closest('li').addClass('active');
             },10);
        },
        sortBuddies:function(event,prop,order){
            apple.controllers.buddyModel.highlitButton(event);
             var buddiesList = thisModel.list.values;
                 buddiesList.sort(function(a,b){
                         order = order ? order : sortOrder;
                         if (a[prop] > b[prop]) {
                            if(order)
                                return 1;
                                return -1;
                          }
                          if (a[prop] < b[prop]) {
                              if(order)
                                return -1;
                                return 1;
                          }
                          return 0;
                 });
              sortOrder = sortOrder ? false : true;
              thisModel.list.values = buddiesList;
              apple.models.buddyModel.modeltoView.renderUI(true);
         },
        FilterBuddies:function(event,prop,value){
              apple.controllers.buddyModel.highlitButton(event);
              var buddiesList = JSON.parse(sessionStorage.getItem("buddydata")).buddy;
              var newValues = buddiesList.filter(function (val,index){
                  if(prop == "dob")
                       return  Number(val[prop].split("/")[2]) <= value; 
                  else
                    return  val[prop].indexOf(value) > -1; 
              });
              thisModel.list.values = newValues;
              apple.models.buddyModel.modeltoView.renderUI(true);
         },
        removeFilters:function(event){
              apple.controllers.buddyModel.highlitButton(event);
              var buddiesList = JSON.parse(sessionStorage.getItem("buddydata"));
                thisModel.list.values = buddiesList.buddy;
              apple.models.buddyModel.modeltoView.renderUI(true);
         }
	};
})();