public with sharing class FileUpload {
	@AuraEnabled
	public static void attachFile(String recordId, String fileString, String fileType, String fileName) {
                
        system.debug('### recordId =>' + recordId);
        system.debug('### fileType =>' + fileType);
        system.debug('### fileString =>' + fileString);
        fileString = EncodingUtil.urlDecode(fileString, 'UTF-8');
        ContentVersion cv = new ContentVersion(
        Title = fileName,
        PathOnClient = fileName,
        VersionData = EncodingUtil.base64Decode(fileString),
        IsMajorVersion = true);
        insert cv;

		ContentVersion testContent = [SELECT id, ContentDocumentId FROM ContentVersion where Id = :cv.Id];

        ContentDocumentLink newFileShare = new ContentDocumentLink();
        newFileShare.contentdocumentid = testContent.contentdocumentid;
        newFileShare.LinkedEntityId = recordId;
        newFileShare.ShareType= 'V';
        newFileShare.Visibility = 'AllUsers'; // what about the public
        insert newFileShare;

		
	}
}