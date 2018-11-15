sap.ui.define([

		"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History"
	],

	function (Controller, History) {
		"use strict";
		return Controller.extend("com.itcActivitybook.controller.BaseController", {

			getRouter: function () {
				return sap.ui.core.UIComponent.getRouterFor(this);

			},

			homeButton: function (oEvent) {
				this.getRouter().navTo("appHome");
			},
			onNavBack: function (oEvent) {
				var oHistory, sPreviousHash;
				oHistory = History.getInstance();
				sPreviousHash = oHistory.getPreviousHash();
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("first", {}, true /*no history*/ );
				}
			}

		});
	});