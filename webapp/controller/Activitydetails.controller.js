sap.ui.define([
	"com/itcActivitybook/controller/BaseController",
	"sap/m/MessageToast",
		"sap/ui/model/Filter",
	"sap/ui/model/Sorter"
], function(BaseController, MessageToast, Filter, Sorter) {
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
		/*	this.oObjectPageLayout = this.byId("ObjectPageLayout");
			this.oTargetSubSection = this.byId("paymentSubSection");
			this.oTargetSubSection.setMode("Expanded");

			this.oObjectPageLayout.addEventDelegate({
				onAfterRendering: function() {
					//need to wait for the scrollEnablement to be active
					jQuery.sap.delayedCall(500, this.oObjectPageLayout, this.oObjectPageLayout.scrollToSection, [this.oTargetSubSection.getId()]);
				}.bind(this)
			});*/

         
       	this.mGroupFunctions = {
				PayrollType: function(oContext) {
					var name = oContext.getProperty("PayrollType");
					return {
						key: name,
						text: name
					};
				},
				
					Name: function(oContext) {
					var name = oContext.getProperty("Name");
					return {
						key: name,
						text: name
					};
				},
				Hours: function(oContext) {
					var hours = oContext.getProperty("Hours");
				//	var currencyCode = oContext.getProperty("Category");
					var key, text;
					if (hours <= 5) {
						key = "LE5";
						text = "5 " + "" + "or less";
					} else if (hours <= 8) {
						key = "BT5-8";
						text = "Between 5 and 8" ;
					} else {
						key = "GT10";
						text = "More than 10 ";
					}
					return {
						key: key,
						text: text
					};
				}
		
			};

		},
		
		
		// Navigate to Dailtactivity View
		
			navToDailyActivity: function(oEvent) {
			this.getRouter().navTo("activies");
		},
		
		onPressNavToDetailPageOne: function(oEvent) {

			this.getSplitAppObj().to(this.createId("ActivityBookDetailPage1"));
			this.getView().byId("saveButtonOne").setVisible(true);
			this.getView().byId("cancelButtonTwo").setVisible(true);
			
			//Hide the Buttons which are not useful in this view
			
			
			this.getView().byId("cancelButtonOne").setVisible(false);
			this.getView().byId("saveButtonThree").setVisible(false);
		    this.getView().byId("cancelButtonFour").setVisible(false);
		   	this.getView().byId("editButton").setVisible(false);
		   	this.getView().byId("submitButtonTwo").setVisible(false);
		   	this.getView().byId("cancelButtonThree").setVisible(false);
		   	this.getView().byId("cancelButtonFive").setVisible(false);
		   		this.getView().byId("saveButtonTwo").setVisible(false);
		
			
			

		},

		// Navigate to Detail Page 2

		navToActivityBookDetailPage2: function(oEvent) {
			this.getSplitAppObj().to(this.createId("ActivityBookDetailPage2"));
			this.getSplitAppObj().toMaster(this.createId("master2"));

			this.getView().byId("submitButtonOne").setVisible(true);
			this.getView().byId("cancelButtonOne").setVisible(true);
			this.getView().byId("saveButtonTwo").setVisible(true);

			//Hide the Buttons which are not useful in this view
			this.getView().byId("saveButtonOne").setVisible(false);
			this.getView().byId("cancelButtonTwo").setVisible(false);

		},



   
		// Navigate to Detail Page 3
		
		
		ActivityBookDetailPage3: function() {
			this.getSplitAppObj().to(this.createId("detail3"));
			this.getSplitAppObj().toMaster(this.createId("master2"));
			
			
	    	this.getView().byId("submitButtonOne").setVisible(true);
	     	this.getView().byId("saveButtonTwo").setVisible(true);
			this.getView().byId("cancelButtonThree").setVisible(true);

			//Hide the Buttons which are not useful in this view
			this.getView().byId("saveButtonOne").setVisible(false);
			this.getView().byId("cancelButtonTwo").setVisible(false);
			this.getView().byId("cancelButtonOne").setVisible(false);
			this.getView().byId("saveButtonThree").setVisible(false);
		    this.getView().byId("cancelButtonFour").setVisible(false);
		   	this.getView().byId("editButton").setVisible(false);
		   	this.getView().byId("submitButtonTwo").setVisible(false);
		},
		
		// Navigate to detail page three, click on edit button selected one row in the table
		
		ActivityBookDetailPage3Advance: function() {
			this.getSplitAppObj().to(this.createId("detail3"));
			this.getSplitAppObj().toMaster(this.createId("master2"));
			
			
	    	this.getView().byId("submitButtonOne").setVisible(true);
	     	this.getView().byId("saveButtonTwo").setVisible(true);
		
			
			//Hide the Buttons which are not useful in this view
			this.getView().byId("saveButtonOne").setVisible(false);
			this.getView().byId("cancelButtonTwo").setVisible(false);
			this.getView().byId("cancelButtonOne").setVisible(false);
			this.getView().byId("saveButtonThree").setVisible(false);
		    this.getView().byId("cancelButtonFour").setVisible(false);
		   	this.getView().byId("editButton").setVisible(false);
		   	this.getView().byId("submitButtonTwo").setVisible(false);
		   	this.getView().byId("cancelButtonThree").setVisible(false);
		   	this.getView().byId("cancelButtonFive").setVisible(false);
			
		},

		activityBook5: function() {
			this.getSplitAppObj().to(this.createId("detail4"));
			this.getSplitAppObj().toMaster(this.createId("master2"));
			
			
			this.getView().byId("submitButtonOne").setVisible(true);
	     	this.getView().byId("saveButtonThree").setVisible(true);
			this.getView().byId("cancelButtonFour").setVisible(true);

			//Hide the Buttons which are not useful in this view
			this.getView().byId("saveButtonOne").setVisible(false);
			this.getView().byId("cancelButtonTwo").setVisible(false);
			this.getView().byId("cancelButtonOne").setVisible(false);
			this.getView().byId("saveButtonTwo").setVisible(false);
		    this.getView().byId("cancelButtonThree").setVisible(false);

		},

		activityBook6: function() {
			this.getSplitAppObj().to(this.createId("detail5"));
			this.getSplitAppObj().toMaster(this.createId("master2"));
			
			
			this.getView().byId("submitButtonTwo").setVisible(true);
	     	this.getView().byId("editButton").setVisible(true);
			this.getView().byId("saveButtonTwo").setVisible(true);
			this.getView().byId("cancelButtonFive").setVisible(true);
			
			//Hide the Buttons which are not useful in this view
			this.getView().byId("saveButtonOne").setVisible(false);
			this.getView().byId("cancelButtonTwo").setVisible(false);
			this.getView().byId("cancelButtonOne").setVisible(false);
			this.getView().byId("saveButtonThree").setVisible(false);
		    this.getView().byId("cancelButtonFour").setVisible(false);
		   	this.getView().byId("submitButtonOne").setVisible(false);
			
			
			

		},




		//Get back to the Activity Page One By Clicking On Cancel Button on Activity Page 2
	    	onPressDetailBack: function() {

			this.getSplitAppObj().backDetail();

			this.getSplitAppObj().backMaster();

			this.getView().byId("submitButtonOne").setVisible(false);
			this.getView().byId("cancelButtonOne").setVisible(false);
			this.getView().byId("saveButtonTwo").setVisible(false);

			// On back navigation make save and cancel buttons visible 
			this.getView().byId("saveButtonOne").setVisible(true);
			this.getView().byId("cancelButtonTwo").setVisible(true);

		},

		backToActivityDetail: function() {
			this.getSplitAppObj().backDetail();
			this.getView().byId("cancelButtonFour").setVisible(false);
			this.getView().byId("cancelButtonThree").setVisible(false);
			// On back navigation make save and cancel buttons visible 
			this.getView().byId("saveButtonTwo").setVisible(true);
			this.getView().byId("cancelButtonOne").setVisible(true);
			
			
		},

       	backToActivityDetailOne: function() {
			this.getSplitAppObj().backDetail();
		
			this.getView().byId("cancelButtonFour").setVisible(false);
			this.getView().byId("saveButtonThree").setVisible(false);
			// On back navigation make save and cancel buttons visible 
		    this.getView().byId("submitButtonOne").setVisible(true);
	     	this.getView().byId("saveButtonTwo").setVisible(true);
			this.getView().byId("cancelButtonThree").setVisible(true);
		},
		
			backToActivityDetailTwo: function() {
			this.getSplitAppObj().backDetail();
		
			this.getView().byId("submitButtonTwo").setVisible(false);
	     	this.getView().byId("editButton").setVisible(false);
			this.getView().byId("saveButtonTwo").setVisible(false);
			this.getView().byId("cancelButtonFive").setVisible(false);
		
			// On back navigation make save and cancel buttons visible 
		   	this.getView().byId("submitButtonOne").setVisible(true);
	     	this.getView().byId("saveButtonThree").setVisible(true);
			this.getView().byId("cancelButtonFour").setVisible(true);
		},
		
		
		
		
		
		
		
		/* <!------------------Click List Footer Button --> Master Page 1, Detail Page 1 --------------------------------------> */
		
		backToAddActivityView: function() {
			this.getSplitAppObj().backMaster();
			this.getSplitAppObj().to(this.createId("ActivityBookDetailPage1"));
			
			
			this.getView().byId("submitButtonTwo").setVisible(false);
	     	this.getView().byId("editButton").setVisible(false);
			this.getView().byId("cancelButtonFive").setVisible(false);
			this.getView().byId("submitButtonOne").setVisible(false);
			this.getView().byId("cancelButtonOne").setVisible(false);
			this.getView().byId("saveButtonTwo").setVisible(false);

			// On back navigation make save and cancel buttons visible 
			this.getView().byId("saveButtonOne").setVisible(true);
			this.getView().byId("cancelButtonTwo").setVisible(true);
			
			
			
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
		
		
			// <! ~~~~~~~~~~~~~~~~~~~~~ Search Bar filter for Table items  ~~~~~~~~~~~~~~~~>
		onSearchTableItems: function (oEvent) {
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("EmployeeID", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			var list = this.getView().byId("idProductsTable");
			var binding = list.getBinding("items");
			binding.filter(aFilters);

		},
		
			openDialog: function (oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.itcActivitybook.view.SecondDialog", this);
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
			this.getView().getModel().setProperty("/oDialog", this._oDialog);
		},
		
		
			handleConfirm: function(oEvent) {
           
			var oView = this.getView();
			var oList = oView.byId("idProductsTable");
            //EmployeeIDvar oDialog = this.getView().getModel().getProperty("/oDialog");
			var mParams = oEvent.getParameters();
			var oBinding = oList.getBinding("items");

			// apply sorter to binding
			// (grouping comes before sorting)
			var sPath;
			var bDescending;
			var vGroup;
			var aSorters = [];
			if (mParams.groupItem) {
				sPath = mParams.groupItem.getKey();
				bDescending = mParams.groupDescending;
				vGroup = this.mGroupFunctions[sPath];
				aSorters.push(new Sorter(sPath, bDescending, vGroup));
			}
			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));
			oBinding.sort(aSorters);

			// apply filters to binding
			var aFilters = [];
			jQuery.each(mParams.filterItems, function (i, oItem) {
				var aSplit = oItem.getKey().split("___");
				var sPath1 = aSplit[0];
				var sOperator = aSplit[1];
				var sValue1 = aSplit[2];
				var sValue2 = aSplit[3];
				var oFilter = new Filter(sPath1, sOperator, sValue1, sValue2);
				aFilters.push(oFilter);
			});
			oBinding.filter(aFilters);

        // update filter bar
        if(aFilters.length > 0 || aSorters.length > 0){
        		
        			this.getView().byId("filterButton").setType("Emphasized");
        		
        }
       // var s = oDialog.getSelectedFilterString();
        //	oView.byId("filterButton").setText(s);
     // oView.byId("vsdFilterLabel").setVisible(aFilters.length > 0);
     

		
		},

		/* <!--~~~~~~~~~~~~~~~~~~ Confirm Dialog Yes Or No ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>*/

		onEscapePreventDialog: function() {
			if (!this.escapePreventDialog) {
				this.escapePreventDialog = new sap.m.Dialog({
					icon: sap.ui.core.IconPool.getIconURI("message-information"),
					title: "Submit",
					content: [
						new sap.m.Text({
							text: "Are you sure, Activity Book is entered for all \n Employees?"
						})
					],
					type: sap.m.DialogType.Message,
					buttons: [
						new sap.m.Button({
							text: "Yes",
							press: function() {
								this.getRouter().navTo("appHome");
								var msg = "Activity Book Submitted Successfully";
								MessageToast.show(msg);

							}.bind(this)

						}),
						// press: function(oEvent) {
						//               this.getRouter().navTo("activityDetail");
						//                                 	}

						new sap.m.Button({
							text: "No",
								 press : function() {
									this.confirmEscapePreventDialog.close();
								// 	oPromise.reject();
								// }.bind(this)
								 }.bind(this)
						})
					]

				});
			}

			this.escapePreventDialog.open();
		}

	});
});