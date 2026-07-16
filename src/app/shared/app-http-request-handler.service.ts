import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonOpsService } from './common-ops-service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AppHttpRequestHandlerService {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  private isXhrEncryptionEnabled:boolean=false;
  constructor(private httpClient: HttpClient, @Inject(Router) private router: Router, private commonOpsService: CommonOpsService, private authService: AuthService) { 
    this.isXhrEncryptionEnabled = environment.xhrEncryptionConfigs.isXhrEncryptionEnabled;
  }

   httpGet(params: any, apiController: string, apiAction: string): Observable<any>{
// const currentDateTime = new Date().toISOString(); 
// console.log(currentDateTime, 'asdasdasdadsd');
    
  //   let data = {requestData:  this.isXhrEncryptionEnabled ?  this.commonOpsService.encryptUsingAES256(JSON.stringify(params), environment.xhrEncryptionConfigs.xhrEncyptionSecretKey, environment.xhrEncryptionConfigs.xhrEncyptionSecretIV) : JSON.stringify(params)};
  //   if(apiAction.includes('ServiceGateway') || apiAction.includes('withdrawApplication') || apiAction.includes('seedTimelineWiseAction')){
  //     data= params;
  //   }

  //   if((apiController.includes('GolferRegistration'))){
  //     environment.pbLabourDefaultApiRoot = environment.pbLabourDefaultApiRoot.replace("https://pblabour.gov.in", "https://103.118.160.157")
  //   }
    
  //   return this.httpClient.get(environment.pbLabourDefaultApiRoot+ apiController + "/" + apiAction, { 
  //     params: data
  //   }).pipe(catchError(err=>this.errorHandler(err)));

    const currentDateTime = new Date().toISOString(); 
    return this.commonOpsService.encryptXHRRequestsWithHybridAlgo(JSON.stringify(params), this.isXhrEncryptionEnabled, environment.xhrEncryptionConfigs.publicKey_L2L).pipe(
      switchMap((data: string) => {
        let requestData1:any={ requestData : data};
        if(apiAction.includes('ServiceGateway') || apiAction.includes('withdrawApplication') || apiAction.includes('seedTimelineWiseAction') || apiAction.includes('validateLoginFromPartnerPortal')){
            requestData1= params;
        }
        if((apiController.includes('GolferRegistration'))){
                environment.pbLabourDefaultApiRoot = environment.pbLabourDefaultApiRoot.replace("https://pblabour.gov.in", "https://103.118.160.157")
        }
        return this.httpClient.get(environment.pbLabourDefaultApiRoot+ apiController + "/" + apiAction, { 
            params: requestData1
          }).pipe(catchError(err=>this.errorHandler(err)));
      })
    );
  }

  httpPost(postData: any, designatedModel: string, apiController: string, apiAction: string): Observable<any>{
    let requestData = 
    JSON.stringify({
      data : JSON.stringify(postData),
      designatedModel: designatedModel
    });
    return this.commonOpsService.encryptXHRRequestsWithHybridAlgo(requestData, this.isXhrEncryptionEnabled, environment.xhrEncryptionConfigs.publicKey_L2L).pipe(
      switchMap((encryptedRequestData: string) => {
        return this.httpClient.post(environment.pbLabourDefaultApiRoot + apiController + "/" + apiAction, { 
          requestData: encryptedRequestData
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
          })})
          .pipe(catchError(err=>this.errorHandler(err)));
      })
    );
    // return this.httpClient.post(environment.pbLabourDefaultApiRoot + apiController + "/" + apiAction, { 
    //     requestData: this.isXhrEncryptionEnabled ?  this.commonOpsService.encryptUsingAES256(JSON.stringify(postData), environment.xhrEncryptionConfigs.xhrEncyptionSecretKey, environment.xhrEncryptionConfigs.xhrEncyptionSecretIV) : JSON.stringify(postData),
    //     designatedModel: this.isXhrEncryptionEnabled ?  this.commonOpsService.encryptUsingAES256(designatedModel, environment.xhrEncryptionConfigs.xhrEncyptionSecretKey, environment.xhrEncryptionConfigs.xhrEncyptionSecretIV) : designatedModel,
    //   },
    //  {
    //    headers: new HttpHeaders({
    //     'Content-Type': 'application/json; charset=utf-8'
    //    })})
    //   .pipe(catchError(err=>this.errorHandler(err)));
  }

  httpDelete(params: any, apiController: string, apiAction: string): Observable<any>{
    return this.httpClient.get(environment.pbLabourDefaultApiRoot+ apiController + "/" + apiAction, {params: params})
      .pipe(catchError(err=>this.errorHandler(err)));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        localStorage.clear();
        if(error.status==408){
          Swal.fire({  
                icon: 'error',  
                title: 'Invalid request..!',  
                text: 'Request validity expired..!',  
                //footer: '<a href>Why do I have this issue?</a>'  
              }).then(()=>{
                this.router.navigate(['/']);
              }); 
        }
        if(error.status==401 || error.status==403) {
          //localStorage.removeItem("BearerToken");
          this.authService.logout(true);
        }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}