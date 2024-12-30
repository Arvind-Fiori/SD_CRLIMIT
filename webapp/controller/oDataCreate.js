sap.ui.define(
    [], function(){
     return{
        callCreateOdata:function(oModel,sPath)
        {
            return new Promise(function(resolve,reject){
                debugger;
                oModel.create("/CreditLimitDataSet", sPath, {
                            
                    success: function (Request) {
                      debugger;
                        resolve(Request);
                       
                    },
                    error: function (Error , sPath ) {
                        debugger;
                        reject(Error , sPath);
                        
                    }

                }) 
                
            })

        }
     }   
    });