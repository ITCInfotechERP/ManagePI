sap.ui.define([
"com/itcActivitybook/controller/BaseController",
"sap/ui/core/UIComponent",
	"sap/m/MessageToast"
], function(BaseController, UIComponent, MessageToast) {
	"use strict";

	return BaseController.extend("com.itcActivitybook.controller.Dailyactivity", {
		
		onInit: function () {
			
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
             oRouter.getRoute("activies").attachMatched(this._onRouteMatched, this);
 		}, 
 		
 	// Get Data from selected list item from activityBookList	
 		
 		_onRouteMatched: function(oEvent) {
       var sObjectId = oEvent.getParameter("arguments").row;
       var a = JSON.parse(sObjectId);          //We cannot pass object and array directly, need to convert them in json data.
                                               // Single value or string can be passed without converting in json data.
        	var oArray = [];
			oArray.push(a);
			var dialogModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(dialogModel, "DialogModel");
			this.getView().getModel("DialogModel").setProperty("/ActivitySelected", oArray);
        
       },
 


		
		
			navToActivitydetails: function(oEvent) {
			this.getRouter().navTo("activityDetail");
		}
		
	
});
});