jQuery(document).ready(function($){
	function generateHeaders(arr) {
		result = "";

		for(var i = 0, l = arr.length; i < l; i++){
			result += "<div class='cell'>" + arr[i] + "</div>";
		}

		return result;
	}


	window.show = function(id){
		$("#" + id).css('color', 'black');
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
			result += "<div class='cell' data-title='" + headers[0] + "'>" + pairs[indices[i]][0] + "</div>";
			result += "<div onclick='window.show(" + nummer + ")' id='" + nummer + "' style='color:white' class='cell solution' data-title='" + headers[1] + "'>" + pairs[indices[i]][1] + "</div>";
			result += "</div>";

			nummer += 1;
		}

		return result;
	}


	$("#headers").append(generateHeaders(window.headers));
	$(generateRows(window.headers, window.pairs)).insertAfter("#headers");
});