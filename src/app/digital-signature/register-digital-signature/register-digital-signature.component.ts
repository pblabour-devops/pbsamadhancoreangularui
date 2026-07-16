import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
declare var SignerDigital:any;
declare var isBrowserSupportsExtension:any;
declare var isExtensionInstalled:any;
@Component({
    selector: 'app-register-digital-signature',
    templateUrl: './register-digital-signature.component.html',
    styleUrls: ['./register-digital-signature.component.css'],
    standalone: false
})
export class RegisterDigitalSignatureComponent implements OnInit {
	protected ngUnsubscribe: Subject<void> = new Subject<void>();
	private _uidPid: string='34e049d0-de7b-41ab-9eb4-ee03366664d8|dbff3c46-3434-453e-bed2-2afe5ceb06ad';
	constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService) { }

  ngOnInit(): void {
	// this.appHttpRequestHandlerService.httpGet(null, "DigitalSignature", "getuidpid").pipe(takeUntil(this.ngUnsubscribe))

	// );
  }
  getDigitalSignature(){
    	if (!isBrowserSupportsExtension() || !isExtensionInstalled()) {
			//$("#ResultDisplay").html("Please Download Signer.Digital Chrome Extension. from <br/>https://signer.digital/downloads/Signer.Digital.Chrome.Host.Setup.zip <br/>Do not forget to restart Chrome after installing extension.");
			return;
		}
    SignerDigital.getSelectedCertificate()
		.then((CertInfo:any)=> {        //Success returns Certificate Subject and Thumbprint
			this.appHttpRequestHandlerService.httpPost(CertInfo,"", "DigitalSignature", "register").pipe(takeUntil(this.ngUnsubscribe))
          		.subscribe((data: any) => {
			});
		},
		function (errmsg:any)       //Signing Extension Host Returned Error.
		{
		}
	);
  }

  SignInWithDSC() {
		// $("#ResultDisplay").html("");

		// if (!isBrowserSupportsExtension() || !isExtensionInstalled()) {
		// 	$("#ResultDisplay").html("Please Download Signer.Digital Chrome Extension. from <br/>https://signer.digital/downloads/Signer.Digital.Chrome.Host.Setup.zip <br/>Do not forget to restart Chrome after installing extension.");
		// 	return;
		// }

		//Call method from Extension SignerDigital to get Selected Certificate Subject and SerialNumber
		//var authToken = $("#UserId").val() + "|" + $("#Password").val();
		SignerDigital.signAuthToken(this._uidPid, "SHA-256")       //or "SHA256"
			.then(
				 (SignData:any)=> {        //Success returns Certificate Subject and Thumbprint
					this.appHttpRequestHandlerService.httpPost(SignData,"", "DigitalSignature", "verify").pipe(takeUntil(this.ngUnsubscribe))
          			.subscribe((data: any) => {
					});
				},
				function (errmsg:any)       //Signing Extension Host Returned Error.
				{
				}
			);
	};


	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	  }

}
