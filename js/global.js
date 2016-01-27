var apple = (function() {
    return {
        //object containing all the models defined in the project.
        //ex: login.js has loginmodel i.e apple.models.loginmodel...
        models: {

        },
        //object containing all the models defined in the project.
        //ex: login.js has loginmodel i.e apple.models.loginmodel...
        controllers: {

        },
        //called when broser completes loading the page, this will load the buddy.json file where data is 
        //stubbed to simulate as if data is coming from some server response.
        getbuddiesList: function() {
            currentModel = this;
            var buddyModel = JSON.parse(sessionStorage.getItem("buddydata"));
            if (!buddyModel) {
                return $.ajax({
                    url: "/buddy.json",
                    cache: true,
                    dataType: "json",
                }).promise();
            }else{
                currentModel.customMethods.runTheApplication();
                return null;
            }
        },
        //intiliazing the application occurs here
        //jquery ajax returns promise handler
        //to make multiple syncronus call I used jquery deffered / prmoise
        //call success callback on successful load of JSON stub
        initApp: function() {
            currentModel = this;
            var promise = currentModel.getbuddiesList();
            if(promise){
               promise.done(function(response){
                currentModel.customMethods.buddyLoadsuccess(response);
               });
               promise.done(currentModel.customMethods.runTheApplication); 
            }
        },
        customMethods: {
            //call back which stores the json data into sessionstorage
            buddyLoadsuccess: function(data) {
                sessionStorage.setItem("buddydata", JSON.stringify(data));
            },
            buddyLoadfail:function(){
                sessionStorage.setItem("buddydata", null);
            },
            //initially load loginmodel into DOM if path is login.html
            //else load buddymodel
            runTheApplication: function(){
                     if(location.pathname == "/login.html"){
                          apple.models.loginModel.modeltoView.renderUI();
                     }else{
                          apple.models.buddyModel.modeltoView.renderUI();
                          apple.models.footerModel.modeltoView.renderUI();
                          apple.models.addbuddy.modeltoView.onAfterLoad();
                     }
                //small animation to title
                $(".titleinitial").addClass("scale");
                setTimeout(function(){
                    $(".buddysection>div:nth-child(1)").css({
                        height:(window.innerHeight-100-50)+"px",
                        "overflow-y":"auto",
                        "overflow-x":"hidden"
                    });
                    $(".buddysection>div:nth-child(2)").css({
                        height:(window.innerHeight-100-50)+"px",
                        "overflow-y":"auto",
                        "overflow-x":"hidden"
                    });
                },50);
			}
        },
        utils: {
            //load the html template from cache,and bind the model to template and populate the html and load
            // the generated html into corresponding DOM node.
            modelTohtml: function(onlyRendering) {
                var currentModel = this;
                if(!onlyRendering)
                    currentModel.onbeforeLoad();
                var x = $.get($.trim(currentModel.templateAT.split("#")[0])).promise();
                x.done(function(template){
                    var itemplate = $(template).filter('#' + $.trim(currentModel.templateAT.split("#")[1])).html();
                    Mustache.to_html(itemplate, currentModel.thisModel, "", function(result) {
                        document.getElementById(currentModel.domEl).innerHTML = result;
                    });
                });
                if(!onlyRendering)
                    x.done(function(){
                        currentModel.onAfterLoad();
                    });
            },
            //all models contains events
            //this will loop thru the array of events defined for a object
            //bind events to call backs i.e adding eventlistens
            eventbinders: function(val) {
                var eventsList = val["events"] || [];
                var ref = this;
                eventsList.forEach(function(val) {
                   $("body").on(val.type,val.selector,val.callback.bind(ref));
    			});
            },
            //model contains different objects, for instance login model has different input elemnts , buttons 
            //which all comes under model...
            //this method helps in looping through all objects and registers events using eventbinders method
            //defined above
            eventHandlers: function() {
                var currentModel = this;
	    		$.each(currentModel.thisModel, function(key,valueObj){
	    			if(valueObj.constructor == Array){
	    				valueObj.forEach(function(val,i){
	    					apple.utils.eventbinders(val);
	    				});
	    			}
	    			else{
	    				    apple.utils.eventbinders(valueObj);
	    			}
	    		});
            }
        }
    };
})();
window.addEventListener('load', function(e) {
    //load the data to browser cache
    //this will be helpful in quick loading of page and offilne loading as well.
    window.applicationCache.addEventListener('updateready', function(e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            if (confirm('Do you want to load new version of this app??')) {
                window.location.reload();
            }
        } else {
            // Manifest didn't changed. Nothing new to server.
        }
    }, false);
    //call init method, starting point of the application
    apple.initApp();
}, false);