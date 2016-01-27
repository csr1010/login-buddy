var apple = (function() {
    return {

        models: {

        },
        controllers: {

        },

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
            buddyLoadsuccess: function(data) {
                sessionStorage.setItem("buddydata", JSON.stringify(data));
            },
            buddyLoadfail:function(){
                sessionStorage.setItem("buddydata", null);
            },
            runTheApplication: function(){
                     if(location.pathname == "/login.html"){
                          apple.models.loginModel.modeltoView.renderUI();
                     }else{
                          apple.models.buddyModel.modeltoView.renderUI();
                          apple.models.footerModel.modeltoView.renderUI();
                          apple.models.addbuddy.modeltoView.onAfterLoad();
                     }
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
            eventbinders: function(val) {
                var eventsList = val["events"] || [];
                var ref = this;
                eventsList.forEach(function(val) {
                   $("body").on(val.type,val.selector,val.callback.bind(ref));
    			});
            },
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

    window.applicationCache.addEventListener('updateready', function(e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            if (confirm('Do you want to load new version of this app??')) {
                window.location.reload();
            }
        } else {
            // Manifest didn't changed. Nothing new to server.
        }
    }, false);
    apple.initApp();
}, false);