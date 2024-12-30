sap.ui.define(
    ["arvind/sd/cls/controller/baseController",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
        "arvind/sd/cls/controller/oDataCreate"
    ],
    function (baseController, Filter, FilterOperator, MessageBox, MessageToast, oDataCrate) {
        return baseController.extend("arvind.sd.cls.controller.View2", {

            onInit() {

                //oPage = this.getView().byId("idPage");
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("details").attachMatched(this.RHM, this);
            },
            oLocalModel: "",

            RHM: function (oEvent) {
                var that = this;
                const xFilter = [];
                var oModel = this.getOwnerComponent().getModel();
                var oJson = new sap.ui.model.json.JSONModel();
                var sStatus = oEvent.getParameter("arguments").id.split("=")[1];
                if (sStatus) {
                    if (sStatus == "P") {
                        var oStatus = "PENDING";

                    }
                    if (sStatus == "A") {
                        var oStatus = "APPROVED";

                    }
                    if (sStatus == "R") {
                        var oStatus = "REJECTED";

                    }
                    var oFilter = new sap.ui.model.Filter("ZSTATUS", "EQ", oStatus);
                    xFilter.push(oFilter);
                }

                var sReq = oEvent.getParameter("arguments").id2.split("=")[1];
                if (sReq) {
                    var oFilter1 = new sap.ui.model.Filter("ZREQNUM", "EQ", sReq);
                    xFilter.push(oFilter1);

                }

                var sSorg = oEvent.getParameter("arguments").idSOrg.split("=")[1];
                if (sSorg) {
                    var oFilterSorg = new sap.ui.model.Filter("VKORG", "EQ", sSorg);
                    xFilter.push(oFilterSorg);

                }

                var SFDate = oEvent.getParameter("arguments").FDate.split("=")[1];
                if (SFDate) {
                    var oFilterFdate = new sap.ui.model.Filter("REQ_DATE", "EQ", SFDate);
                    xFilter.push(oFilterFdate);

                }
                var STDate = oEvent.getParameter("arguments").TDate.split("=")[1];
                if (STDate) {
                    var oFilterTdate = new sap.ui.model.Filter("REQ_DATE", "EQ", STDate);
                    xFilter.push(oFilterTdate);

                }

                var sCustData = oEvent.getParameter("arguments").Cust.split("=")[1];
                if (sCustData) {
                    var aCust = sCustData.split(",");

                    for (let i = 0; i < aCust.length; i++) {
                        // For each result create new token and append it to the MultiInput field.
                        // Token instance
                        const element = aCust[i];
                        var sTitle = element;
                        var oFiltercust = new sap.ui.model.Filter("KUNNR", "EQ", sTitle);
                        xFilter.push(oFiltercust);

                        // Add created token to the Plant field

                    }


                }

                var aFilter = [oFilter, oFilter1];
                var oFiltersubmit = new Filter({
                    filter: aFilter,
                    and: false

                })

                oModel.read("/CreditLimitDataSet", {
                    filters: [xFilter],
                    success: function (responce) {


                        oJson.setData(responce.results);
                        // oJson_creditlimit = oJson;

                        //    this.getView().setModel(oJson, "CreditLimit");
                        that.oLocalModel = oJson;
                        this.getView().setModel(that.oLocalModel, "CreditLimit");
                        //    this.getView().byId("supplyTable").setModel(oJson,"CreditLimit");
                        //  this.getView().byId("supplyTable").setModel(that.oLocalModel,"CreditLimit");
                    }.bind(this),
                    error: function () {

                        
                    }

                }

                );

            },
            onBack: function () {

                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("init");

            },

            onDetailPress: function (oEvent) {
                debugger;
                var sDetail = oEvent.getSource().getBindingContext("CreditLimit").getObject().ZREQNUM;


                var sCustn = "\ZREQNUM =" + sDetail;
                const oRouter = this.getOwnerComponent().getRouter();

                oRouter.navTo("CreditLimitDetail", {
                    //  oRouter.navTo("Detail",{fId : sIndex});
                    CreditLimitItem: sCustn
                });




            },
            onSelectionChange: function (oEvent) {
                var oSelectLine = "";
                var oSelectedItem = oEvent.getParameters("listItems").listItems;
                for (let index = 0; index < oSelectedItem.length; index++) {
                    const element = oSelectedItem[index];
                    if (element.getSelected() == true) {

                        var sStatus = element.getBindingContext("CreditLimit").getProperty("ZSTATUS");
                        if (sStatus == "APPROVED") {
                            oSelectLine = "X";
                            element.setSelected(false);
                    
                        }
                        if (sStatus == "REJECTED") {
                            oSelectLine = "X";
                            element.setSelected(false);
                        
                        }

                    }
                }
                if (oSelectLine == "X")
                {
                    MessageBox.error("You have Selected Approved / Rejected LineItem");
                    return;

                }

                
            },
            onReject: function (oEvent) {


            },
            onApprove: function (oEvent) {
                



                var that = this;
                var odata = "";
                var index = "";
                var jsonn = "";
                var oSelectedItem = "";
                this.oSelectedItem = this.getView().byId("supplyTable").getItems();
                
                var sSelectedcnt = this.getView().byId("supplyTable").getSelectedItem();
                if (sSelectedcnt == null)
                {
                    MessageBox.error("Please Selected any one Item" );
                    return;
                }   

                for (let i = 0; i < this.oSelectedItem.length; i++) {
                    // For each result create new token and append it to the MultiInput field.
                    // Token instance
                    const element = this.oSelectedItem[i].getSelected();
                    if (element == true) {

                        var Json = this.getView().byId("supplyTable").getModel("CreditLimit").getData()[i];
                        this.Jsonn = Json;
                        this.odata = Json;
                        this.odata = this.getView().byId("supplyTable").getModel("CreditLimit").getData()[i];
                        this.index = i;
                        var sId = oEvent.getSource().getId().split("--")[2];
                        if (sId == 'btnReject') {
                            Json.Action = 'R';
        
                        }
                        if (sId == 'btnApprov') {
                            Json.Action = 'A';
        
                        }
                     //   Json.Action = 'A';
                        var oDataModel = this.getOwnerComponent().getModel();
                        //                             oDataModel.create("/CreditLimitDataSet", this.Jsonn, {

                        //                             success: function (Request) {
                        //                                 debugger;   
                        //                                 inc = 0;
                        //                                 that.odata = Request;
                        //                                 for(let i = 0; i < that.oSelectedItem.length; i++){
                        //                                     const element = that.oSelectedItem[i].getSelected();
                        //                                     if (element == true )
                        //                                     {

                        //                                         var iSelecetedIndex = that.getView().byId("supplyTable").getSelectedContextPaths()[inc];

                        //                                         var loopReqNum = that.oLocalModel.getData()[i].ZREQNUM;
                        //                                         var oDataReqNum = that.odata.ZREQNUM;
                        //                                         if (oDataReqNum == loopReqNum )
                        //                                         {
                        //                                             that.oLocalModel.setProperty(iSelecetedIndex  , that.odata);


                        //                                         }  
                        //                                         debugger;
                        //                                         inc = inc + 1;
                        //                                     }
                        //                                 }
                        //                                 that.oLocalModel.setProperty(iSelecetedIndex  , that.odata);
                        //                                 //that.getView().setModel(that.oLocalModel,"CreditLimit");

                        //                                 MessageToast.show("Request Updated");
                        //                                 //location.reload();  
                        //                                 // that.oLocalModel.setProperty("/CreditLimitDataSet", Request);
                        //                               //  that.getView().byId("supplyTable").setModel(Request.responce,"CreditLimit");

                        //                             },
                        //                             error: function (context , Error ) {
                        //                                 debugger;
                        //                                 that.odata = that.Jsonn;
                        //                                 that.odata.ZSTATUS = 'ERROR';
                        //                                 inc = 0;
                        //                                 for(let i = 0; i < that.oSelectedItem.length; i++){
                        //                                     const element = that.oSelectedItem[i].getSelected();
                        //                                     if (element == true )
                        //                                     {
                        //                                         debugger;
                        //                                         var iSelecetedIndex = that.getView().byId("supplyTable").getSelectedContextPaths()[inc];

                        //                                         var loopReqNum = that.oLocalModel.getData()[i].ZREQNUM;
                        //                                         var oDataReqNum = that.odata.ZREQNUM;
                        //                                         if (oDataReqNum == loopReqNum )
                        //                                         {
                        //                                             that.oLocalModel.setProperty(iSelecetedIndex  , that.odata);


                        //                                         }  
                        //                                         inc = inc + 1;

                        //                                     }
                        //                                 }
                        //                                 that.oLocalModel.setProperty(iSelecetedIndex  , that.odata);
                        // //                                MessageBox.error(JSON.parse(Error.responseText).error.innererror.errordetails[0].message)
                        //                           //      location.reload();  

                        //                             }

                        //                         }) 
                        oDataCrate.callCreateOdata(oDataModel, this.Jsonn)
                            .then(function (Request) {
                                
                                inc = 0;
                                that.odata = Request;
                                for (let i = 0; i < that.oSelectedItem.length; i++) {
                                    const element = that.oSelectedItem[i].getSelected();
                                    if (element == true) {

                                        var iSelecetedIndex = that.getView().byId("supplyTable").getSelectedContextPaths()[inc];

                                        var loopReqNum = that.oLocalModel.getData()[i].ZREQNUM;
                                        var oDataReqNum = that.odata.ZREQNUM;
                                        if (oDataReqNum == loopReqNum) {
                                            that.oLocalModel.setProperty(iSelecetedIndex, that.odata);
                                            that.oSelectedItem[i].setSelected(false);

                                        }
                                        
                                        inc = inc + 1;
                                    }
                                }
                                that.oLocalModel.setProperty(iSelecetedIndex, that.odata);
                                //that.getView().setModel(that.oLocalModel,"CreditLimit");

                                MessageToast.show("Request Updated");
                                //location.reload();  
                                // that.oLocalModel.setProperty("/CreditLimitDataSet", Request);
                                //  that.getView().byId("supplyTable").setModel(Request.responce,"CreditLimit");
                            })
                            .catch(function (Error, sPath) {
                                MessageBox.error("Error in Processing");
                                
                            });

                    }

                    // Add created token to the Plant field

                }

            }

        }

        );

    });