sap.ui.define([
	"com/itcActivitybook/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("com.itcActivitybook.controller.launchpad", {

		
		navToDailyActivity: function(oEvent) {
			this.getRouter().navTo("activies");
		},
		
			navToReports: function(oEvent) {
			this.getRouter().navTo("reports");
		},
		
		navToEditActivity: function(oEvent){
			this.getRouter().navTo("booklist");
		},
		
		onATEPress: function(){
			sap.m.URLHelper.redirect("http://alturki.com/Main.aspx", true);
		}
	});
});