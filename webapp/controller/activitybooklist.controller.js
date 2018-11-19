sap.ui.define([
	"jQuery.sap.global"
	"com/itcActivitybook/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/Filter"
], function (jQuery, BaseController, MessageToast, Filter) {
	"use strict";

	return BaseController.extend("com.itcActivitybook.controller.activitybooklist", {
		onInit: function () {

			this.getView().setModel(this.getOwnerComponent().getModel("jsonData"));
			//	this.getView().setModel(this.getOwnerComponent().getModel("json"));

		},

		navToDailyActivity: function (oEvent) {
			this.getRouter().navTo("activies");
		},

		navToActivitydetails: function (oEvent) {
			this.getRouter().navTo("activityDetail");
		},

		// <! ~~~~~~~~~~~~~~~~~~~~~Show data to detail View, on click of listItems ~~~~~~~~~~~~~~~~>
		showDetails: function (oEvent) {
			var oModelContext = oEvent.getParameter("listItem").getBindingContext().getObject();

			var oArray = [];
			oArray.push(oModelContext);
			var dialogModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(dialogModel, "DialogModel");
			this.getView().getModel("DialogModel").setProperty("/ActivitySelected", oArray);
		},
		onFilterProducts: function (oEvent) {
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("PSID", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			var list = this.getView().byId("List1");
			var binding = list.getBinding("items");
			binding.filter(aFilters);
		},
		onSearch: function (oEvent) {
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("EmployeeID", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			var list = this.getView().byId("idProductsTable");
			var binding = list.getBinding("items");
			binding.filter(aFilters);
		}

	});
});