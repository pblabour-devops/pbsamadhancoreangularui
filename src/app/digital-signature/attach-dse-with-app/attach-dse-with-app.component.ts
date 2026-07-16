import { Component, OnInit } from '@angular/core';
//declare function getSelectedCertificate():any;
declare var SignerDigital:any;
@Component({
    selector: 'app-attach-dse-with-app',
    templateUrl: './attach-dse-with-app.component.html',
    styleUrls: ['./attach-dse-with-app.component.css'],
    standalone: false
})
export class AttachDseWithAppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    SignerDigital.getSelectedCertificate()
			.then(
				function (CertInfo:any) {        //Success returns Certificate Subject and Thumbprint
          //           $.ajax({
          //               url: "AuthService.asmx/Register",
          //               type: "POST",
          //               data: "{'RegSignature': '"+ CertInfo + "', 'UserID': '" + $("#UserId").val() + "', 'Password': '" + $("#Password").val() + "'}",
          //               contentType: "application/json;charset=utf-8",
          //               dataType: "json",
					// 	success: function (result) {
					// 		//Show response
					// 		$("#ResultDisplay").html(result.d);
					// 	}
					// });
				},
				function (errmsg:any)       //Signing Extension Host Returned Error.
				{
					//$("#ResultDisplay").html(errmsg.message);
				}
			);
  }

}
