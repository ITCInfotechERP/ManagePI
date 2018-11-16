sap.ui.define([
	"com/itcActivitybook/controller/BaseController",
	"sap/m/MessageToast"
], function(BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("com.itcActivitybook.controller.Activitydetails", {

		onInit: function() {
			
	    	this.getView().setModel(this.getOwnerComponent().getModel("jsonData"));
		//	this.getView().setModel(this.getOwnerComponent().getModel("json"));
			this.getSplitAppObj().setHomeIcon({
				"phone": "phone-icon.png",
				"tablet": "tablet-icon.png",
				"icon": "desktop.ico"
			});
			
		
		

		

			//navigate to a specific subsection on open
			this.oObjectPageLayout = this.byId("ObjectPageLayout");
			this.oTargetSubSection = this.byId("paymentSubSection");
			this.oTargetSubSection.setMode("Expanded");

			this.oObjectPageLayout.addEventDelegate({
				onAfterRendering: function () {
					//need to wait for the scrollEnablement to be active
					jQuery.sap.delayedCall(500, this.oObjectPageLayout, this.oObjectPageLayout.scrollToSection, [this.oTargetSubSection.getId()]);
				}.bind(this)
			});
			
			
			
			
			
			
			
			
			
			
			
			
			
		},
		onPressNavToDetail: function(oEvent) {

			this.getSplitAppObj().to(this.createId("detailDetail"));
		

			
			
		},
		
		navToNextPage: function(oEvent){
		this.getSplitAppObj().to(this.createId("detail2"));
		this.getSplitAppObj().toMaster(this.createId("master2"));
		},
		
		
         incentivesView: function(){
         	this.getSplitAppObj().to(this.createId("detail3"));
         	this.getSplitAppObj().toMaster(this.createId("master2"));
         },
         
         activityBook5: function(){
         		this.getSplitAppObj().to(this.createId("detail4"));
         		this.getSplitAppObj().toMaster(this.createId("master2"));
         		
         },
         
         activityBook6: function(){
         		this.getSplitAppObj().to(this.createId("detail5"));
         		this.getSplitAppObj().toMaster(this.createId("master2"));
         		
         },

			
	
		onPressDetailBack: function() {

			this.getSplitAppObj().backDetail();
			
			
			this.getSplitAppObj().backMaster();
	
			this.getView().byId("saveButton").setVisible(false);
			this.getView().byId("cancelTwo").setVisible(false);
			this.getView().byId("cancelOne").setVisible(true);
		},
		
		backToActivityDetail: function(){
		this.getSplitAppObj().backDetail();
		},
		
		
		/* <!------------------Click List Footer Button --> Master Page 1, Detail Page 1 --------------------------------------> */
	    	backToAddActivityView: function(){
			this.getSplitAppObj().backMaster();
			this.getSplitAppObj().to(this.createId("detailDetail"));
		},

		getSplitAppObj: function() {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		},
		
		
	
		// <! ~~~~~~~~~~~~~~~~~~~~~Show data to detail View, on click of listItems ~~~~~~~~~~~~~~~~>
		showDetails: function(oEvent) {
			var oModelContext = oEvent.getParameter("listItem").getBindingContext().getObject();

			var oArray = [];
			oArray.push(oModelContext);
			var dialogModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(dialogModel, "DialogModel");
			this.getView().getModel("DialogModel").setProperty("/ActivitySelected", oArray);
		},
		
		
		/* <!--~~~~~~~~~~~~~~~~~~ Confirm Dialog Yes Or No ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>*/
		
			onEscapePreventDialog: function() {
			if (!this.escapePreventDialog) {
				this.escapePreventDialog = new sap.m.Dialog({
				icon : sap.ui.core.IconPool.getIconURI("message-information"),
					title : "Submit",
								content : [
									new sap.m.Text({
										text : "Are you sure, Activity Book is entered for all \n Employees?"
									})
								],
								type : sap.m.DialogType.Message,
					buttons : [
									new sap.m.Button({
										text : "Yes",
										press : function() {
										this.getRouter().navTo("appHome");
								        var msg = "Activity Book Submitted Successfully";
		                            	MessageToast.show(msg);
		                          
	                            
										}.bind(this)
										
                                  
									}),
											// press: function(oEvent) {
			        //               this.getRouter().navTo("activityDetail");
	          //                                 	}
								
									new sap.m.Button({
										text : "No"
										// press : function() {
										// 	this.confirmEscapePreventDialog.close();
										// 	oPromise.reject();
										// }.bind(this)
									})
								]
				
					
				});
			}

			this.escapePreventDialog.open();
		}

	});
});