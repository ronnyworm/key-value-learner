jQuery(document).ready(function($){
	Object.size = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	};

	function generateHeaders(arr) {
		result = "";

		for(var i = 0, l = arr.length; i < l; i++){
			result += "<div class='cell'>" + arr[i] + "</div>";
		}

		return result;
	}

	window.showhide = function (id) {
		if(document.getElementById(id).style.color == 'white') {
			document.getElementById(id).style.color = 'black';
		}
		else{
			document.getElementById(id).style.color = 'white';
		}
	}

	window.mark = function (id) {
		document.getElementById(id).style.border = '2px solid orange';
	}

	Math.seedrandom(new Date().getTime());

	function shuffle(a) {
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	}

	function generateRows(headers, pairs) {
		result = "";

		indices = Array.apply(null, Array(pairs.length)).map(function (_, i) {return i;});
		shuffle(indices);

		nummer = 0;
		for(var i = 0, l = pairs.length; i < l; i++){
			result += "<div class='row'>";

			if(pairs[indices[i]][3] != undefined)
				hint = " (" + pairs[indices[i]][3] + ")";
			else
				hint = "";

			result += "<div class='cell' data-title='" + headers[0] + "'>" + pairs[indices[i]][0] + hint + "</div>";
			result += "<div onclick='window.showhide(" + nummer + ")' ondblclick='window.mark(" + nummer + ")' id='" + nummer + "' style='color:white' class='cell solution' data-title='" + headers[1] + "'>" + pairs[indices[i]][1] + "</div>";


			result += "</div>";

			nummer += 1;
		}

		return result;
	}


	$("#headers").append(generateHeaders(window.headers));

	if(Object.size(window.pairs) == 1){
		Object.keys(window.pairs).forEach(function (key) { 
			$("#headline").html(key);
		    var value = window.pairs[key];
		    $(generateRows(window.headers, value)).insertAfter("#headers");
		})	
	}
});