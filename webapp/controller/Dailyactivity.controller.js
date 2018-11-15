sap.ui.define([
"com/itcActivitybook/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("com.itcActivitybook.controller.Dailyactivity", {
		
		
			navToActivitydetails: function(oEvent) {
			this.getRouter().navTo("activityDetail");
		}
		
	
});
});