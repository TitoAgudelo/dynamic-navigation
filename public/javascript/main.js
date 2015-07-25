(function() {
    $.ajax({
        url: '/api/nav.json',
        dataType: "json",
        type: 'GET',
        success: function (data) {
            navigation(data);
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });

    function navigation(data) {
    	var count = data.items.length,
        	container= document.getElementById('menu-navigation'),
        	parent =  "",
			subMenu = "";
        // for for first menu parents
        for(var i=0 ; i<count ; i++) {
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
    			parent += '<li class="principal"><a href="'+item.url+'" target="_blank">'+item.label+'</a><ul class="sub-menu">'+subMenu+'</ul></li>';

    		} else {
    			// if no childrens concact html
    			parent += '<li class="principal"><a href="'+item.url+'" target="_blank">'+item.label+'</a></li>';
    		
    		}
    	}
    	
        // inner html in navigation
    	document.getElementById("menu-navigation").innerHTML = parent;
        // run clickELement for event click listener 
        clickElement();
        if($(window).width() < 768) {
            mobile();
        }
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
        var open = document.getElementById("toggleOpen");

        var toggleOpen =  function() {
            var copy = document.getElementsByClassName("copy")[0],
                slide = document.getElementById("menu-navigation"),
                content = document.getElementById("content");
            content.setAttribute("class", "content");
            slide.setAttribute("class", "slide");
            copy.setAttribute("class", "display");
            open.setAttribute("class", "displayNone");

            var close = document.getElementById("toggleClose");
            close.addEventListener('click', toggleClose, false);
            close.setAttribute("class", "display");

        }

        var close = function() {

        }

        open.addEventListener('click', toggleOpen, false);
    }


})();

