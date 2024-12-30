sap.ui.define(
    ["arvind/sd/cls/controller/baseController",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/core/routing/History",
        "sap/m/MessageBox",
        "sap/m/MessageToast"

    ],
    function (baseController, Filter, FilterOperator, History, MessageBox, MessageToast) {
        return baseController.extend("arvind.sd.cls.controller.View3", {
            onInit() {
                this.oLocalModel = new sap.ui.model.json.JSONModel();
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("CreditLimitDetail").attachMatched(this.RHM, this);

            },
            oLocalModel1: "",
            RHM: function (oEvent) {
                // debugger;
                debugger; 
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oJson = new sap.ui.model.json.JSONModel();
                var sStatus = oEvent.getParameter("arguments").CreditLimitItem.split("=")[1];
                var oFilter = new sap.ui.model.Filter("ZREQNUM", "EQ", sStatus);
                oModel.read("/CreditLimitDataSet('" + sStatus + "')", {


                    success: function (responce) {

                        debugger;
                        oJson.setData(responce);
                        this.oLocalModel.setData(
                            {
                                "CreditLimit": {
                                    "ZREQNUM": oJson.getData().ZREQNUM,
                                    "KUNNR": oJson.getData().KUNNR,
                                    "VKORG": oJson.getData().VKORG,
                                    "WAERS": oJson.getData().WAERS,
                                    "NAME1": oJson.getData().NAME1,
                                    "KLIMK": oJson.getData().KLIMK,
                                    "ZINC_KLIMK": oJson.getData().ZINC_KLIMK,
                                    "ZFIN_KLIMK": oJson.getData().ZFIN_KLIMK,
                                    "ZREMARK": oJson.getData().ZREMARK,
                                    "ZSTATUS": oJson.getData().ZSTATUS,
                                    "ZREQTID": oJson.getData().ZREQTID,
                                    "ZREQT_USER_NAME": oJson.getData().ZREQT_USER_NAME,
                                    "ZREQTDT": oJson.getData().ZREQTDT,
                                    "ZREQTTM": oJson.getData().ZREQTTM,
                                    "ZAPRID": oJson.getData().ZAPRID,
                                    "ZAPR_USER_NAME": oJson.getData().ZAPR_USER_NAME,
                                    "ZAPRDT": oJson.getData().ZAPRDT,
                                    "ZAPRTM": oJson.getData().ZAPRTM,
                                    "ERROR": oJson.getData().ERROR,
                                    "REQ_DATE": oJson.getData().REQ_DATE,

                                }

                            }

                        );
                        that.oLocalModel1 = this.oLocalModel; 
                        debugger;
                        that.getView().setModel(this.oLocalModel, "Local");
                        if (this.oLocalModel.getData(). CreditLimit.ZSTATUS == "PENDING")
                        {
                            that.getView().byId("idReject").setEnabled(true);
                            that.getView().byId("btnApr").setEnabled(true);
                            that.getView().byId("idZREMARK").setEnabled(true);
                            that.getView().byId("idZINC_KLIMK").setEnabled(true);
             
                        }
                        else
                        {

                            that.getView().byId("idReject").setEnabled(false);
                            that.getView().byId("btnApr").setEnabled(false);
                            that.getView().byId("idZREMARK").setEnabled(false);
                            that.getView().byId("idZINC_KLIMK").setEnabled(false);
             
                        }    
                        //   this.getView().bindElement(this.oLocalModel);
                        //     var STitle = 'Request Number : '+ responce.ZREQNUM;
                        //   this.getView().byId("3rdDetail").getParent().setTitle(STitle)

                        //   this.getView().byId("idZREQNUM").setText(responce.ZREQNUM);
                        //    this.getView().byId("idKUNNR").setText(responce.KUNNR);
                        // this.getView().byId("idVKORG").setText(responce.VKORG);
                        // this.getView().byId("idNAME1").setText(responce.NAME1);
                        // this.getView().byId("idKLIMK").setText(responce.KLIMK);
                        // this.getView().byId("idZINC_KLIMK").setValue(responce.ZINC_KLIMK);
                        // this.getView().byId("idZFIN_KLIMK").setText(responce.ZFIN_KLIMK);
                        // this.getView().byId("idZREMARK").setValue(responce.ZREMARK);
                        // this.getView().byId("idZSTATUS").setText(responce.ZSTATUS);


                        // this.getView().byId("idZREQTID").setText(responce.ZREQTID);
                        // this.getView().byId("idZREQT_USER_NAME").setText(responce.ZREQT_USER_NAME);
                        // this.getView().byId("idZREQTDT").setText(responce.ZREQTDT);


                        //    this.getView().bindElement("/CreditLimitDataSet/0");

                        // this.getView().bindElement(oJson);
                        // oJson_creditlimit = oJson;

                        //    this.getView().setModel(oJson, "CreditLimit");
                        //this.getView().byId("supplyTable").setModel(oJson,"CreditLimit");
                    }.bind(this),
                    error: function (Error) {

                        debugger;
                    }

                });

            },
            onBack: function () {

                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("init", {}, true);
                }

            },

            onSelectionChange: function (oEvent) {

                debugger;
            },
            onReject: function(){
                debugger;
                var that1 = this;
                var oJson = new sap.ui.model.json.JSONModel();
                oJson = this.getView().getModel("Local");
                var CreditLimit = this.oLocalModel.getProperty("/CreditLimit");
                if (CreditLimit.ZSTATUS == "PENDING") 
                    {
                        CreditLimit.Action = 'R';
                    //     var Odata =  JSON.parse(oJson.getJSON());
                    var oDataModel = this.getOwnerComponent().getModel();

                    oDataModel.create("/CreditLimitDataSet", CreditLimit, {
                        success: function (Request) {
                            that1.odata = Request; 
                            that1.oLocalModel.setProperty("/CreditLimit", Request); 
                            
                            that1.getView().setModel(that1.oLocalModel, "Local");
                        debugger;
                            MessageToast.show("Request Rejected");
                            const oHistory = History.getInstance();
                            const sPreviousHash = oHistory.getPreviousHash();

                            const oRouter = this.getOwnerComponent().getRouter();y
                            
                            oRouter.navTo("init", {}, true);

                        },
                        error: function (Error) {
                            debugger;
                            MessageBox.error(JSON.parse(Error.responseText).error.innererror.errordetails[0].message)

                        }

                    })
                }
                else
                {
                    MessageBox.error("Request is already Approved / Rejected");
                         

                }

                this.getView().byId("idReject").setEnabled(false);
                this.getView().byId("btnApr").setEnabled(false);
                this.getView().byId("idZREMARK").setEnabled(false);
                this.getView().byId("idZINC_KLIMK").setEnabled(false);
            },
            onApprove: function (oEvent) {
              
                var that1 =  this;           
                var oJson = new sap.ui.model.json.JSONModel();
                oJson = this.getView().getModel("Local");
                var CreditLimit = this.oLocalModel.getProperty("/CreditLimit");
                if (CreditLimit.ZSTATUS == "PENDING") 
                    {
                        CreditLimit.Action = 'AP';
                    //     var Odata =  JSON.parse(oJson.getJSON());
                    var oDataModel = this.getOwnerComponent().getModel();

                    oDataModel.create("/CreditLimitDataSet", CreditLimit, {
                        success: function (Request) {
                            debugger;
                            that1.odata = Request; 
                            that1.oLocalModel.setProperty("/CreditLimit", Request); 
                            
                            that1.getView().setModel(that1.oLocalModel, "Local");
                            MessageToast.show("Request Approved");
  //                          const oHistory = History.getInstance();
//                            const sPreviousHash = oHistory.getPreviousHash();

                           // const oRouter = this.getOwnerComponent().getRouter();
                         //   oRouter.navTo("init", {}, true);

                        },
                        error: function (Error) {
                            debugger;
                            MessageBox.error(JSON.parse(Error.responseText).error.innererror.errordetails[0].message)

                        }

                    })
                }
                else
                {
                    MessageBox.error("Request is already Approved");
                         

                }
                debugger;
                
                this.getView().byId("idReject").setEnabled(false);
                this.getView().byId("btnApr").setEnabled(false);
                this.getView().byId("idZREMARK").setEnabled(false);
                this.getView().byId("idZINC_KLIMK").setEnabled(false);
            }

        }

        );

    });