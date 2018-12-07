sap.ui.define([
	"jquery.sap.global",
	"com/itcActivitybook/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
	"sap/ui/core/message/Message",
    "sap/ui/core/MessageType",
    "sap/ui/core/ValueState",
     "sap/ui/model/BindingMode"
    
], function (jQuery, BaseController, MessageToast, Filter, Sorter, MessageBox, Message, MessageType, ValueState, BindingMode) {
	"use strict";






	return BaseController.extend("com.itcActivitybook.controller.activitybooklist", {

		_oDialog: null,

		onInit: function () {
			
			// Message Manager Code Start
			var oMessageManager = sap.ui.getCore().getMessageManager();
			this.getView().setModel(oMessageManager.getMessageModel(), "message");
			oMessageManager.registerObject(this.getView(), true);
			//Message Manager Code End
		
			
			

			this.getView().setModel(this.getOwnerComponent().getModel("jsonData"));

			var data = this.getOwnerComponent().getModel("jsonData").getData().Employees;
			var array1 = [];
			array1.push(data);
			var dialogModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(dialogModel, "DialogModel");
			this.getView().setModel(dialogModel, "DViewModel");
			this.getView().getModel("DViewModel").setProperty("/ActivitySelected", array1[0]);

			this.getAutoSelectedRow = array1[0][0];
			
			
			
		
  
			
		
			
		
		
			

			this.oSplitApp = this.getView().byId("SplitAppDemo");
			this.oSplitApp.setMode("StretchCompressMode");

			this.mGroupFunctions = {
				GroupID: function (oContext) {
					var name = oContext.getProperty("GroupID");
					return {
						key: name,
						text: name
					};
				},

				DisciplineID: function (oContext) {
					var name = oContext.getProperty("DisciplineID");
					return {
						key: name,
						text: name
					};
				},
				Hours: function (oContext) {
					var hours = oContext.getProperty("Hours");
					//	var currencyCode = oContext.getProperty("Category");
					var key, text;
					if (hours <= 5) {
						key = "LE5";
						text = "5 " + "" + "or less";
					} else if (hours <= 8) {
						key = "BT5-8";
						text = "Between 5 and 8";
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
           // MessageManager Code Start
         
    
  	
       


		onExit: function () {
			if (this._oDialog) {
				this._oDialog.destroy();
			}
		},

          	// Message Manager Code Start
            onMessagePopoverPress : function (oEvent) {
            this._getMessagePopover().openBy(oEvent.getSource());
        },
        
        
         _getMessagePopover : function () {
            // create popover lazily (singleton)
            if (!this._oMessagePopover) {
                this._oMessagePopover = sap.ui.xmlfragment(this.getView().getId(),"com.itcActivitybook.view.MessagePopover", this);
                this.getView().addDependent(this._oMessagePopover);
            }
            return this._oMessagePopover;
        },
        	// Message Manager Code End
        
		onPressEditNavToDailyActivity: function (oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (this.selectedID) {
				oRouter.navTo("activies", {
					row: JSON.stringify(this.selectedID)
				});

			} else {
				oRouter.navTo("activies", {
					row: JSON.stringify(this.getAutoSelectedRow)
				});
			}

			/*	var b = this.selectedID.PSID;
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("activies", {
				row : b
				});*/

		},

		// 	navToDailyActivity: function (oEvent) {

		//       this.getRouter().navTo("activies");

		// },

		// navToActivitydetails: function (oEvent) {
		// 	this.getRouter().navTo("activityDetail");
		// },

		// <! ~~~~~~~~~~~~~~~~~~~~~Show data to detail View, on click of listItems ~~~~~~~~~~~~~~~~>
		showDetails: function (oEvent) {

			this.getView().byId("editFooterButton").setType("Emphasized");
			var mode = this.oSplitApp.getMode();
			var that = this;

			this.oModelContext = oEvent.getParameter("listItem").getBindingContext().getObject();
			var oArray = [];
			oArray.push(this.oModelContext);
			var dialogModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(dialogModel, "DViewModel");
			this.getView().getModel("DViewModel").setProperty("/ActivitySelected", oArray);

			var selectedrow = this.oModelContext;

			this.selectedID = selectedrow;

			if (mode !== "StretchCompressMode") {
				// var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.warning(
					"The detail page is in edit mode, click Ok to continue to navigate to display mode.", {
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						// styleClass: bCompact ? "sapUiSizeCompact" : "",
						onClose: function (sAction) {
							if (sAction === "OK") {
								that.onPressDetailBack();
							}
							MessageToast.show("Action selected: " + sAction);
						}
					}
				);

			}

		},

		// <! ~~~~~~~~~~~~~~~~~~~~~ Search Bar filter for list items  ~~~~~~~~~~~~~~~~>
		onSearchListItems: function (oEvent) {
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

		// <! ~~~~~~~~~~~~~~~~~~~~~ Search Bar filter for Table items  ~~~~~~~~~~~~~~~~>
		onSearchTableItems: function (oEvent) {
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("DisciplineID", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			var list = this.getView().byId("idProductsTable");
			var binding = list.getBinding("items");
			binding.filter(aFilters);

		},

		openDialog: function (oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.itcActivitybook.view.Dialog", this);
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
			this.getView().getModel().setProperty("/oDialog", this._oDialog);
		},

		handleConfirm: function (oEvent) {

			var oView = this.getView();
			var oList = oView.byId("idProductsTable");
			// var oDialog = this.getView().getModel().getProperty("/oDialog");
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
			if (aFilters.length > 0 || aSorters.length > 0) {

				this.getView().byId("filterButton").setType("Emphasized");

			}

		},

		// <!------------------------   Code for Aditional Split APP Content  --------------------------------->
		//  <!----- Passing Data From activityBookList to Activitydetails View ----------------------------------->

		onPressNavigateToEditActivity: function (oEvent) {
			this.getSplitAppObj().to(this.createId("editActivityPage"));

			this.oSplitApp = this.getView().byId("SplitAppDemo");
			this.oSplitApp.setMode("PopoverMode");

			this.getView().byId("editActivity").setVisible(false);
			this.getView().byId("idSubmitButton").setVisible(false);
			this.getView().byId("idSaveButton").setVisible(false);
			this.getView().byId("idCancelButton").setVisible(false);
			this.getView().byId("idEmailButton").setVisible(false);

			this.getView().byId("confirmActivity").setVisible(true);
			this.getView().byId("cancelEditing").setVisible(true);

		},

		onPressNavigateToEditActivityNew: function (oEvent) {
			this.getSplitAppObj().to(this.createId("editActivityPage"));

			this.getView().byId("activityBookNumberInput").setValue(null);
			this.getView().byId("activityDateInput").setValue(null);
			this.getView().byId("personalAreaInput").setValue(null);
			this.getView().byId("personalSubAreaInput").setValue(null);
			this.getView().byId("areaIdInput").setValue(null);
			this.getView().byId("locationInput").setValue(null);
			this.getView().byId("areaFormanIdInput").setValue(null);
			this.getView().byId("siteEngineerIdInput").setValue(null);

			this.oSplitApp = this.getView().byId("SplitAppDemo");
			this.oSplitApp.setMode("PopoverMode");

			this.getView().byId("editActivity").setVisible(false);
			this.getView().byId("idSubmitButton").setVisible(false);
			this.getView().byId("idSaveButton").setVisible(false);
			this.getView().byId("idCancelButton").setVisible(false);
			this.getView().byId("idEmailButton").setVisible(false);

			this.getView().byId("confirmActivity").setVisible(true);
			this.getView().byId("cancelEditing").setVisible(true);
		},

		getSplitAppObj: function () {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		},

		navToActivitydetails: function (oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (this.selectedID) {
				oRouter.navTo("activityDetail", {
					row: JSON.stringify(this.selectedID)
				});

			} else {
				oRouter.navTo("activityDetail", {
					row: JSON.stringify(this.getAutoSelectedRow)
				});
			}

		},

		onPressDetailBack: function () {
			this.getSplitAppObj().backDetail();

			//Set Split App Mode
			this.oSplitApp = this.getView().byId("SplitAppDemo");
			this.oSplitApp.setMode("StretchCompressMode");

			this.getView().byId("editActivity").setVisible(true);
			this.getView().byId("idSubmitButton").setVisible(true);
			this.getView().byId("idSaveButton").setVisible(true);
			this.getView().byId("idCancelButton").setVisible(true);
			this.getView().byId("idEmailButton").setVisible(true);

			this.getView().byId("confirmActivity").setVisible(false);
			this.getView().byId("cancelEditing").setVisible(false);

		}

	});
});