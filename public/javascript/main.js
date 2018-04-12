(function() {
    var url = '/api/nav.json';
    fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                navigation(data);
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

    function navigation(data) {
    	var count = data.items.length,
        	container= document.getElementById('menu-navigation'),
        	parent =  "",
			subMenu = "";
        // for for first menu parents
        for(var i=0 ; i < count ; i++) {
			var item = data.items[i],
				childCount = item.items.length;

    		if(childCount > 0) {
    			// for for childrends in menu
    			for(var j=0 ; j < childCount ; j++) {
					child = item.items[j];
					subMenu += '<li><a href="'+child.url+'" target="_blank">'+child.label+'</a></li>';
		        	childCount--;
	    		}
                // if childrends concat html
    			parent += '<li class="principal"><a href="#">'+item.label+'</a><span class="down"></span><ul class="sub-menu">'+subMenu+'</ul></li>';

    		} else {
    			// if no childrens concact html
    			parent += '<li class="principal"><a href="'+item.url+'" target="_blank">'+item.label+'</a></li>';

    		}
    	}

        // inner html in navigation
    	document.getElementById("menu-navigation").innerHTML = parent;
        // run clickELement for event click listener
        clickElement();
        mobile();
    };

    function clickElement(){
        var items = document.getElementsByClassName("principal");

        var myFunction = function() {
            // li element with a class principal found
            var page = document.getElementById("mask");

            // if need close with a other click in the same menu bottom
            if(this.className == 'active') {
                this.setAttribute("class", "");
                page.setAttribute("class", "");
            } else {
                // else get all active and get a first element and is unique
                var active = document.getElementsByClassName("active")[0];
                // if active exist
                if (active != undefined) {
                    // set class for ""
                    active.setAttribute("class", "");
                } else {
                    // else set active li
                    this.setAttribute("class", "active");
                    var child = document.getElementsByClassName("active")[0].getElementsByTagName("a");
                    // mask when menu have child
                    if(child.length > 1) {
                        page.setAttribute("class", "allContent");
                        page.addEventListener('click', unMenu, false);
                    }
                }
            }
            // mobile action icon
            if(this.getElementsByClassName("down")[0]){
                this.getElementsByClassName("down")[0].setAttribute("class", "up");
            } else if(this.getElementsByClassName("up")[0]){
                this.getElementsByClassName("up")[0].setAttribute("class", "down");

            }
        };

        var unMenu = function() {
            // get first active and unique
            var items = document.getElementsByClassName("active")[0],
                page = document.getElementById("mask");
            if(items) {
                // if exist set "" at active and mask
                items.setAttribute("class", "");
                page.setAttribute("class", "");
            }
        };

        // loop for set event listener click al menu
        for(var i=0; i<items.length; i++){
            items[i].addEventListener('click', myFunction, false);
        }
    };

    function mobile() {
        var open = document.getElementById("toggleOpen"),
            copy = document.getElementsByClassName("copy")[0],
            slide = document.getElementById("menu-navigation"),
            content = document.getElementById("content"),
            logo = document.getElementById("name");

        function toggleOpen() {

            content.setAttribute("class", "content");
            logo.setAttribute("style", "display: inline-block;")
            copy.setAttribute("class", "visibility");
            open.setAttribute("style", "visibility: none;");
            slide.setAttribute("name", "open");

            var close = document.getElementById("toggleClose");
            close.addEventListener('click', toggleClose, false);
            close.setAttribute("style", "visibility: visible;");
        }

        function toggleClose() {
            var open = document.getElementById("toggleOpen");
            content.setAttribute("class", "");
            logo.setAttribute("style", "display: none;")
            copy.setAttribute("class", "visibility-hidden");
            open.setAttribute("style", "visibility: visible;");
            slide.setAttribute("name", "");

            var open = document.getElementById("toggleOpen"),
                close = document.getElementById("toggleClose");
            close.setAttribute("style", "visibility: hidden;");
            open.addEventListener('click', toggleOpen, false);
        }

        window.onresize = function(event) {
            var open = document.getElementById("toggleOpen"),
                close = document.getElementById("toggleClose");
            if(window.innerWidth >= 768) {
                toggleClose();
                logo.setAttribute("style", "display: inline-block;")
            } else {
                if(!slide.hasAttribute("name", "open")) {
                    logo.setAttribute("style", "display: none;");
                    open.setAttribute("style", "visibility: visible;");
                    close.setAttribute("style", "visibility: hidden;");
                } else {
                    toggleOpen();
                    logo.setAttribute("style", "display: inline-block;");
                    open.setAttribute("style", "visibility: hidden;");
                    close.setAttribute("style", "visibility: visible;");
                }
            }
        };

        open.addEventListener('click', toggleOpen, false);
        open.setAttribute("style", "visibility: visible;");
    }
})();

