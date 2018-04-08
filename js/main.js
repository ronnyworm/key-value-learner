jQuery(document).ready(function($){
	Object.size = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	};

	function getURLParameter(name){
	  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)','i').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}

	function round(number){
		//return (Math.round(number * 100) / 100.0);
		return Math.round(number);
	}

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
			window.correct += 1;
		}
		else{
			document.getElementById(id).style.color = 'white';
			document.getElementById(id).style.border = '2px solid orange';
			window.correct -= 1;
			window.wrong += 1;
		}
		$("#correct").html(round(window.correct * 100/ (window.correct + window.wrong)));
		$("#wrong").html(round(window.wrong * 100 / (window.correct + window.wrong)));
		$("#total").html(window.correct + window.wrong);

		$("#correctspan").css("font-size", "" + (0.1 + window.correct * 1.5 / (window.correct + window.wrong)) + "em");
		$("#wrongspan").css("font-size", "" + (0.1 + window.wrong * 1.5 / (window.correct + window.wrong)) + "em");
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
			result += "<div onclick='window.showhide(" + nummer + ")' id='" + nummer + "' style='color:white' class='cell solution' data-title='" + headers[1] + "'>" + pairs[indices[i]][1] + "</div>";
			result += "<div onclick='window.customfunc(\"" + pairs[indices[i]][1].replace("'", "\\'") + "\")' class='cell' data-title='" + headers[2] + "'>" + window.moresymbol + "</div>";


			result += "</div>";

			nummer += 1;
		}

		return result;
	}

	pairSet = getURLParameter("pairs");
	if((pairSet == null || !(pairSet in window.pairs)) && Object.size(window.pairs) != 1 ){
		$("#askdiv").hide();
		Object.keys(window.pairs).forEach(function (key) { 
		    $("#select").append("<div class='row'><div class='cell'><a href='?pairs=" + key + "'>" + key + "</a></div></div>");
		});
		$("#selectdiv").show();
	}
	else{
		if(Object.size(window.pairs) == 1){
			pairSet = Object.keys(window.pairs)[0];
		}
		window.correct = 0;
		window.wrong = 0;

		$("#headline").html(pairSet);
		$("#headers").append(generateHeaders(window.headers));
	    var value = window.pairs[pairSet];
	    $(generateRows(window.headers, value)).insertAfter("#headers");	
	}

});