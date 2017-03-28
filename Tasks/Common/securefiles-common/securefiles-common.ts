import fs = require('fs');
import path = require('path');
import Q = require('q');
import tl = require('vsts-task-lib/task');
import vsts = require('vso-node-api');

export class SecureFileHelpers {
    serverConnection: vsts.WebApi;

    constructor() {
        let serverUrl = tl.getEndpointUrl('SYSTEMVSSCONNECTION', false);
        let serverCreds = tl.getEndpointAuthorizationParameter('SYSTEMVSSCONNECTION', 'ACCESSTOKEN', false);
        let authHandler = vsts.getPersonalAccessTokenHandler(serverCreds);
        
        this.serverConnection = new vsts.WebApi(serverUrl, authHandler);
        
    }

    downloadSecureFile(secureFileId : string) {
        //TODO: update after new version of the vso-node-api is published
        var stream = this.serverConnection.getTaskAgentApi().downloadSecureFile(
            tl.getVariable('SYSTEM_TEAMPROJECT'), 
            1, 
            tl.getSecureFileTicket(secureFileId));      
    }

}



