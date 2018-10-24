sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.itcActivitybook.controller.launchpad", {

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		navToDailyActivity: function(oEvent) {
			this.getRouter().navTo("activies");
		}
	});
});