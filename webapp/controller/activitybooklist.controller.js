sap.ui.define([
	"com/itcActivitybook/controller/BaseController",
	"sap/m/MessageToast"
], function(BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("com.itcActivitybook.controller.activitybooklist", {
		onInit: function() {

			this.getView().setModel(this.getOwnerComponent().getModel("jsonData"));
			//	this.getView().setModel(this.getOwnerComponent().getModel("json"));
			
		},

    	navToDailyActivity: function(oEvent) {
			this.getRouter().navTo("activies");
		},

		// <! ~~~~~~~~~~~~~~~~~~~~~Show data to detail View, on click of listItems ~~~~~~~~~~~~~~~~>
		showDetails: function(oEvent) {
			var oModelContext = oEvent.getParameter("listItem").getBindingContext().getObject();

			var oArray = [];
			oArray.push(oModelContext);
			var dialogModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(dialogModel, "DialogModel");
			this.getView().getModel("DialogModel").setProperty("/ActivitySelected", oArray);
		}

	});
});