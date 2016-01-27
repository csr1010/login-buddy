Folder structure

- Index.html/login.html

-JS
    -- Controllers
        --addbuddy.js
            clears the form elements and close the buddy dialog
        --buddieslist.js
            sorts / filters / adds / delete the array of objects
        --buddyinfo.js
        --footer.js
        --login.js
            validate / submit / clear data in form, these methods are reused for addbuddy in challenge-2
    -- Libs
        --jquery.js
        --mustache.js
    -- model
        --addbuddy.js // extendeing properties of loginmodel
        --buddieslist.js //model containing information about list of buddies,populated from JSON
        --buddyinfo.js //model containing extra information about buddyinformation.
        --footer.js // model containing information about footer buttons in challenge-2, like sort/add/delete and event listenrs
        --login.js // model containing information about login page, like formelements / buttons and their event listenrs
    --global.js // initializes the applications/starting point of the application.
    
-html
        --addbuddy.html
        --buddieslist.html
        --buddyinfo.html
        --footer.html
        --login.html
-css
    --app.css // contains css of the application
-buddy.json
-appcache