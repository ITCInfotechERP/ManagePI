sap.ui.define([
	"jquery.sap.global",
	"com/itcActivitybook/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/Sorter"
], function (jQuery, BaseController, MessageToast, Filter, Sorter) {
	"use strict";

	return BaseController.extend("com.itcActivitybook.controller.activitybooklist", {
		
		
			_oDialog: null,
			
		onInit: function () {

			this.getView().setModel(this.getOwnerComponent().getModel("jsonData"));
			//	this.getView().setModel(this.getOwnerComponent().getModel("json"));

       	this.mGroupFunctions = {
				GroupID: function(oContext) {
					var name = oContext.getProperty("GroupID");
					return {
						key: name,
						text: name
					};
				},
				
					DisciplineID: function(oContext) {
					var name = oContext.getProperty("DisciplineID");
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

    onExit: function() {
      if (this._oDialog) {
        this._oDialog.destroy();
      }
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
		
		
			handleConfirm: function(oEvent) {

			var oView = this.getView();
			var oList = oView.byId("idProductsTable");

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



		
		}
		
     /* onRefresh: function() {
      var oDialog = this.getView().getModel().getProperty("/oDialog");
      var oButton = oDialog._resetButton;
      oButton.firePress();
      oDialog.fireConfirm();
    }*/

	});
});