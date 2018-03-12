({
	myAction : function(component, event, helper) {
	},
	handleFilesChange : function(component, event, helper) {
        var uploadFile = component.find("fileUpload").get("v.files")[0];
        console.log('!!!!' + component.get("v.recordId"));
        console.log(uploadFile.size);
        console.log('**' + uploadFile.name);
        console.log('**' + uploadFile.type);
        //create a FileReader object - async read the contents of the files - https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        var reader = new FileReader();
        //call getCallback as it out of the rendering process
        reader.onload = $A.getCallback(function()  {
            var fileresult = reader.result;
            //strip out the data url info
            var base64 = 'base64,';
            var dataStart = fileresult.indexOf(base64) + base64.length;
            fileresult = fileresult.substring(dataStart);   
            //console.log(reader.result);
            //call apex insert attachment?
            var attachFileAction = component.get("c.attachFile");            
            attachFileAction.setParams({
                "recordId" : component.get("v.recordId"),
                "fileString" : encodeURIComponent(fileresult), //encode the special characters
                "fileName" : uploadFile.name,
                "fileType" : uploadFile.type
            });
            attachFileAction.setCallback(this, function(data){
                console.log(data.getState()); 
                component.set("v.displayResults", true);
                if (data.getState() === "SUCCESS") {
                    //display success message
                    component.set("v.resultMessage","Upload successful");
                } else {
                    var errors = data.getError();
                    console.log(errors);                
                    component.set("v.resultMessage","File failed to upload");
                }
            });
            // used readAsDataURL methods outputs base64 encoded string                                                        
            $A.enqueueAction(attachFileAction);            
                                                        
        });
        reader.readAsDataURL(uploadFile);  		
	}
})