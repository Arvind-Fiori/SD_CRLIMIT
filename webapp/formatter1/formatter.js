sap.ui.define([], function() {

	var Formatter = {

		status1 :  function (sStatus) {
            debugger;
            if (sStatus === "Available") {
				return "Success";
			} else if (sStatus === "Out of Stock") {
				return "Warning";
			} else if (sStatus === "Not Available"){
				return "Error";
			} else {
				return "None";
			}
		},
        decimal : function(d){
            debugger;
             return parseFloat(d).toFixed(2);// if value is string
            // if number use below statement
            // return d.toFixed(2)
        },
		intBoolRandomizer: function(iRandom) {
			return iRandom % 2 === 0;
		},
		favorite: function(sStatus) {
			return sStatus.length % 2 === 0;
		}
	};


	return Formatter;

}, /* bExport= */ true);
