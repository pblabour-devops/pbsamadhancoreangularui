// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const  environment = {
  production: false,
  allowedDomains:["localhost:44000"],
  pbLabourDefaultApiRoot:"http://localhost:44000/api/",
  pbLabourDefaultRoot:"https://pblabour.gov.in/ePortal_api/",
  signalrHubsRoot:"http://localhost:44000/signalrhub",

  // allowedDomains:['https://pblabour.gov.in/'],
  // pbLabourDefaultApiRoot:"https://pblabour.gov.in/ePortal_api_stg/api/",
  // pbLabourDefaultRoot:"https://pblabour.gov.in/ePortal_api_stg/",
  // signalrHubsRoot:"https://pblabour.gov.in/ePortal_api_stg/signalrhub",

  
  defaultLoginRoute: 'login',
  maxUrlAgeInMilliseconds :  3600000,
  maxLogoutWaitingTime_seconds:300,
  maxIdleTime_seconds:3600,
  recaptcha: {
       siteKey: '6LfdUSUdAAAAAANqQpDylwK5JCg-jOX9_i-RPtEa', //local host
       //siteKey: '6Lc5EvseAAAAAL7jpQ7auOKR8itle_A-N371ZWFY', // bocw staging
  },
  queryParmsPrivateEncryptionKey:"5571b8d9-af5f-4cc2-a424-fd19c56887ad",
  scrutinyConfigs:{
    isChecklistBasedScrutiny: true
  },
  thirdPartyIntegrationConfigs:{
    investPunjab:{
      defaultReturnPath:'http://localhost:4200/',
      investPunjabReturnPath : 'http://pbindustries.gov.in/testportal/dashboard/investor-dashboard?t=SR&role=INVT'
    },
    sys_o_urls:{
      backToSys_O_Url:'https://bocw.punjab.gov.in/Stg_eLabour/Account/LoginFromSystem_N?msg=',
      Sys_O_Clearance_Url : 'https://pblabour.gov.in/eLabour/writereaddata/Licence/',
      back_to_elabour:'https://pblabour.gov.in/eLabour',
      nxttoElabor:'https://pblabour.gov.in/eLabour/Account/WithrawApplication?msg=',
      backtonode:'https://pblabour.gov.in/wbapi/AuthGatewayRoute?msg=',
    },
    lwb_redirect_post_url:"https://pblabour.gov.in/StgLabourWelfareAPI/api/Integration/verifyThirdPartyToken"
  },
  xhrEncryptionConfigs:{
    isXhrEncryptionEnabled: true,
    xhrEncyptionSecretKey:'94c8e24f-6c5e-4d',
    xhrEncyptionSecretIV:'70k6e44y-9z5q-9q',
    tokenEncyptionSecretKey:'67k5p36z-9x6v-3w',
    tokenEncyptionSecretIV:'92x2y61b-4i9a-7w',

    loginResponseEncryptionKey:'67k5p36z-9x6v-8t',
    loginResponseEncryptionIVKey:'92x2y61b-4i9a-9a',
    //publicKeyPath_L2L:'assets/keys/Version_1_pub.key_L2L.txt'
    publicKey_L2L:`-----BEGIN PUBLIC KEY-----
                  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAskgPKBcNpz71mi4NSYa5
                  mazJrO0WZim7T2yy7qPxk2NqQE7OmWWakLJcaeUYnI0kO3yC57vck66RPCjKxWuW
                  SGZ7dHXe0bWb5IXjcT4mNdnUIalR+lV8czsoH/wDUvkQdG1SJ+IxzW64WvoaCRZ+
                  /4wBF2cSUh9oLwGEXiodUJ9oJXFZVPKGCEjPcBI0vC2ADBRmVQ1sKsZg8zbHN+gu
                  U9rPLFzN4YNrCnEsSezVw/W1FKVS8J/Xx4HSSg7AyVwniz8eHi0e3a8VzFg+H09I
                  5wK+w39sjDYfAdnJUkr6PjtSbN4/Sg/NMkKB2Ngn8oj7LCfe/7RNqIdiS+dQuSFg
                  eQIDAQAB
                  -----END PUBLIC KEY-----`,
    "lwbSwitchAddParmsEncryptionKey": "48g6r24o-8w7x-2e",
    "lwbSwitchAddParmsIVKey": "24y3p98a-5j7b-3a"
  },

  appProcessSetting :{
    timeLineFileProcessingEnabled : true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
