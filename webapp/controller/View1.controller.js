sap.ui.define(
    ["arvind/sd/cls/controller/baseController",
        "sap/ui/core/Fragment",
         "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
    ],
    function(baseController , Fragment, Filter , FilterOp){
        return baseController.extend("arvind.sd.cls.controller.View1",{
           
            onSelectionChange:function(oEvent){

                debugger;
            },
            onPopupSearch:function(oEvent){
              debugger;
                var sVal = oEvent.getParameter("value");

                var oDialog = oEvent.getSource();

                var oBinding = oDialog.getBinding("items");
                var sID = oEvent.getSource().getId();
                if (sID.indexOf("SalesOrgF4") !== -1)
                {
                var oFilter = new Filter("VKORG" , FilterOp.Contains, sVal);
                }
                if (sID.indexOf("CustF4") !== -1)                
                    {
                        var oFilter = new Filter("KUNNR" , FilterOp.Contains, sVal);
              
                    }
                oBinding.filter(oFilter);
            },
            oField : null,
            onPopupConfirm:function(oEvent){
                debugger;
                var sID = oEvent.getSource().getId();
                if (sID.indexOf("SalesOrgF4") !== -1)
                {

                    var oSelectItem = oEvent.getParameter("selectedItem");
                    this.oField.setValue(oSelectItem.getTitle());
                }
                if (sID.indexOf("ReqF4") !== -1)
                    {
    
                        var oSelectItem = oEvent.getParameter("selectedItem");
                        this.oField.setValue(oSelectItem.getTitle());
                    }
                if (sID.indexOf("CustF4") !== -1)                
                {
                    debugger;
                     var oSelectItem = oEvent.getParameter("selectedItems");
                    // this.oField.setValue(oSelectItem.getTitle());
                    var oScust = this.getView().byId("sCust");

                    for(let i = 0; i < oSelectItem.length; i++){
                        // For each result create new token and append it to the MultiInput field.
                        // Token instance
                        const element = oSelectItem[i];
                    var sTitle = element.getTitle();
                             var defToken = new sap.m.Token({
                                 text: sTitle
                             });
                        // Add created token to the Plant field
                        oScust.addToken(defToken);
                        }
                }
                    
            },
            oCustF4 : null,
            onCustF4:function(oEvent){
                this.oField = oEvent.getSource();
               
                var that = this;
                if(! this.oCustF4)
                {
                    Fragment.load({
                        controller:this,
                        id:'CustF4',
                        fragmentName: 'arvind.sd.cl.fragments.popup'
                    }).then(function(oFragment){
                        that.oCustF4 = oFragment;     
                                     
                        that.oCustF4.bindAggregation("items",{
                            path:'/CustomerF4Set',
                            template:new sap.m.StandardListItem({
                                title : '{KUNNR}',
                                description: '{NAME1}'
                                
                            })

                        });
                        that.getView().addDependent(that.oCustF4);
                        
                        oFragment.open();
                    });

                }else{

                    this.oCustF4.open();
                    this.oCustF4.bindAggregation("items",{
                        path:'/CustomerF4Set',
                        template:new sap.m.StandardListItem({
                            title : '{KUNNR}',
                            description: '{NAME1}'
                            
                        })

                    });
                }
              


            },

            oReqF4 : null,
            onReqF4:function(oEvent){

                this.oField = oEvent.getSource();
                var that = this;
                if(! this.oReqF4)
                {
                    Fragment.load({
                        controller:this,
                        id:'ReqF4',
                        fragmentName: 'arvind.sd.cl.fragments.popup'
                    }).then(function(oFragment){
                        that.oReqF4 = oFragment;  

                        that.oReqF4.setMultiSelect(false);
                                     
                        that.oReqF4.bindAggregation("items",{
                            path:'/RequestF4Set',
                            template:new sap.m.StandardListItem({
                                title : '{ZREQNUM}',
                                description: '{NAME1}'
                                
                            })

                        });
                        that.getView().addDependent(that.oReqF4);
                        
                        oFragment.open();
                    });

                }else{

                    this.oReqF4.open();
                }
              


            },

            oSalesOrgF4 : null,
            onSalesOrgF4:function(oEvent){
  
                this.oField = oEvent.getSource();
                var that = this;
                if(! this.oSalesOrgF4)
                {
                    Fragment.load({
                        controller:this,
                        id:'SalesOrgF4',
                        fragmentName: 'arvind.sd.cl.fragments.popup'
                    }).then(function(oFragment){
                        that.oSalesOrgF4 = oFragment;  

                        that.oSalesOrgF4.setMultiSelect(false);
                                     
                        that.oSalesOrgF4.bindAggregation("items",{
                            path:'/SalesOrgF4Set',
                            template:new sap.m.StandardListItem({
                                title : '{VKORG}',
                                 description: '{VTEXT}'
                                
                            })

                        });
                        that.getView().addDependent(that.oSalesOrgF4);
                        
                        oFragment.open();
                    });

                }else{

                    this.oSalesOrgF4.open();
                    this.oSalesOrgF4.bindAggregation("items",{
                        path:'/SalesOrgF4Set',
                        template:new sap.m.StandardListItem({
                            title : '{VKORG}',
                            description: '{VTEXT}'
                            
                        })

                    });
                }
              

            },
            onSubmit:function(){
                
                var ostatus = this.getView().byId("idSelect").getSelectedKey();
                var filter = "\Status =" + ostatus ;           
                var oReq = this.getView().byId("sReqNo").getValue();                
                    var id2  = "\Request =" + oReq;   
                    
                 var idSOrg = "\Sorg =" + this.getView().byId("sSorg").getValue();                          
               var Fdate = "\FDate =" + this.getView().byId("DP1").getValue();
               var Tdate = "\TDate =" + this.getView().byId("DP2").getValue();


               debugger;
               var sCust = "";
               var oToken = this.getView().byId("sCust").getTokens();
               for(let i = 0; i < oToken.length; i++){
                // For each result create new token and append it to the MultiInput field.
                // Token instance
                const element = oToken[i];
            var sTitle = element.getText();
            
            if ( sCust )
            {
                 sCust = sCust + ',' + sTitle;    
            }
            else
            {
                sCust =  sTitle;    

            }    
                // Add created token to the Plant field
               
                }             
                var sCustn = "\Cust ="+sCust;
               const oRouter = this.getOwnerComponent().getRouter();

                 oRouter.navTo("details",{
                  //  oRouter.navTo("Detail",{fId : sIndex});
                    id:filter,
                    id2:id2 ,
                    idSOrg : idSOrg,
                    FDate: Fdate,
                    TDate: Tdate,
                    Cust: sCustn
                });
          

              

            }
          
            }         
           
        );

    })  ;