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

	function generateRows(headers, pairs) {
		result = "";

		nummer = 0;
		for(var i = 0, l = pairs.length; i < l; i++){
			result += "<div class='row'>";
			result += "<div class='cell' data-title='" + headers[0] + "'>" + pairs[i][0] + "</div>";
			result += "<div onclick='window.show(" + nummer + ")' id='" + nummer + "' style='color:white' class='cell' data-title='" + headers[1] + "'>" + pairs[i][1] + "</div>";
			result += "</div>";

			nummer += 1;
		}

		return result;
	}


	$("#headers").append(generateHeaders(window.headers));
	$(generateRows(window.headers, window.pairs)).insertAfter("#headers");
});