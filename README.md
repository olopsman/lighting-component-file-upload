# lighting-component-file-upload
Lighting Component for File Upload

Salesforce Lightning component for file upload that can be used for detail record views. Or incorporated on forms.

Uses lightning:input component with type="file".

Controller uses the FileReader API to read the file asynchronously and a call to the Apex controller inserts the attachment on the Files object.
