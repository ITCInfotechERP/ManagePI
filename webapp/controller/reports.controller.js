sap.ui.define([
     "com/itcActivitybook/controller/BaseController",
	"sap/viz/ui5/format/ChartFormatter",
	"sap/viz/ui5/api/env/Format"
], function(BaseController, ChartFormatter, Format) {
	"use strict";

return BaseController.extend("com.itcActivitybook.controller.reports", {

		onInit: function() {
			var sampleDatajson = new sap.ui.model.json.JSONModel();
			sampleDatajson.loadData("model/Data.json");
			this.getView().byId("idProductsTable").setModel(sampleDatajson);
			this.getView().byId("idbarChart").setModel(sampleDatajson);
			

			/*var oVizFrame = this.getView().byId("idbarChart");
			oVizFrame.setVizProperties({
				plotArea: {
					colorPalette: d3.scale.category20().range(),
					dataLabel: {
						showTotal: true
					}
				},
				tooltip: {
					visible: true
				},
				title: {
					text: "Bar Chart"
				}
			});*/
			var oVizFrame = this.getView().byId("idbarChart");
			var formatPattern = ChartFormatter.DefaultPattern;
			var oPopOver = this.getView().byId("idPopOver");
			oPopOver.connect(oVizFrame.getVizUid());
			oPopOver.setFormatString(formatPattern.STANDARDFLOAT);

			oVizFrame.setVizProperties({
				plotArea: {
					colorPalette: d3.scale.category20().range(),
					dataLabel: {
						visible: true
					}
				},
				valueAxis: {
					label: {

					},
					title: {
						visible: true
					}
				},
				categoryAxis: {
					title: {
						visible: true
					}
				},
				title: {
					visible: true,
					text: 'Bar Chart'
				}
			});

			//Pie Cgart
			var oVizFramepie = this.getView().byId("idVizFramePie");
			oVizFramepie.setVizProperties({
				plotArea: {
					colorPalette: d3.scale.category20().range(),
					dataLabel: {
						showTotal: true
					}
				},
				tooltip: {
					visible: true
				},
				title: {
					text: "Pie Chart"
				}
			});
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: "Year",
					value: "{Year}"
				}],

				measures: [{
					name: "Milk",
					value: "{Milk}"
				}, {
					name: "Sugar",
					value: "{Sugar}"
				}, {
					name: "Tea",
					value: "{Tea}"
				}],

				data: {
					path: "/items"
				}
			});
			oVizFramepie.setDataset(oDataset);
			oVizFramepie.setModel(sampleDatajson);

			//
			/*oVizFramepie.addFeed(oFeedValueAxis);
			oVizFramepie.addFeed(oFeedValueAxis1);
			oVizFramepie.addFeed(oFeedValueAxis2);
			oVizFramepie.addFeed(oFeedCategoryAxis);*/
			//

			var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "size",
					'type': "Measure",
					'values': ["Milk", "Sugar", "Tea"]

				}),
				feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "color",
					'type': "Dimension",
					'values': ["Year"]
				});
			oVizFramepie.addFeed(feedSize);
			oVizFramepie.addFeed(feedColor);

		},
		onpressbar: function() {
			this.getView().byId("idbarChart").setVisible(true);
			this.getView().byId("idProductsTable").setVisible(false);
			this.getView().byId("idVizFramePie").setVisible(false);
		},
		onpresspie: function() {
			this.getView().byId("idVizFramePie").setVisible(true);
			this.getView().byId("idProductsTable").setVisible(false);
			this.getView().byId("idbarChart").setVisible(false);
		},
		onpressTable: function() {
			this.getView().byId("idProductsTable").setVisible(true);
			this.getView().byId("idVizFramePie").setVisible(false);
			this.getView().byId("idbarChart").setVisible(false);
		}

	});
});	
		
