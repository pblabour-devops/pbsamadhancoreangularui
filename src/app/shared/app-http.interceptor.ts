import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpLoaderService } from './http-loader.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { CommonOpsService } from './common-ops-service';
import { ToastService } from './global-toast/toast-service';
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: HttpLoaderService,
    private router: Router,
    public commonOpsService: CommonOpsService,
    private authService: AuthService,
  private toastService: ToastService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.isLoading.next(true);
    // if(req.method=="GET"){
    //   this.loaderService.showDialogBox.next(true);
    // }
    return Observable.create((observer: { next: (arg0: HttpResponse<any>) => void; error: (arg0: any) => void; complete: () => void; }) => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              // if(req.method=="POST"){
              //   this.loaderService.showDialogBox.next(true);
              // }
              observer.next(event);
            }
          },
          err => {
            //alert('error' + err);
            this.removeRequest(req);
            //console.log(err)
            if(err.error?.isCrudService){
              var encodedQueryParms= this.commonOpsService.encodeQueryParamsInBase64(
                {
                  rootActivityRefId: err.error.rootActivityRefId, 
                  userId:this.authService.getUserJwtDecodedInfo().UserId, 
                  name:this.authService.getUserJwtDecodedInfo().FullName 
                })
              localStorage.clear();
              this.router.navigate(['/activity-ticket'],{ queryParams:{info: encodedQueryParms}}); 
            }
            else{
              this.toastService.show('Something went wrong...!', { classname: 'toast-failed text-light', delay: 2000 });
              // Swal.fire({  
              //   icon: 'error',  
              //   title: 'Oops...',  
              //   text: 'Something went wrong!',  
              //   //footer: '<a href>Why do I have this issue?</a>'  
              // });  
            }
            //this.loaderService.showDialogBox.next({showDislog:true, isError:true, errorMsg:err?.error });
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            

            if(req.method=="POST"){
              //this.loaderService.showDialogBox.next({showDislog:true, isError:false, errorMsg:'err'});
               if( req.url.includes('setNewPassword')|| req.url.includes('resetpassword')|| req.url.includes('login')|| req.url.includes('directLogin')|| req.url.includes('deleteTempCreatedLicense') || req.url.includes('SearchApplicationByIPin') || req.url.includes('TreasuryWisePaymentManager') || req.url.includes('app-treasury-wise-payment-manager') || req.url.includes('logApplicationFeeHeaders') || req.url.includes('update_RaisedFeeDetail')  || req.url.includes('ValidateAndSeedCsvData') || req.url.includes('registerEmpanelledPerson')){
              }
              else if(req.url.includes('UploadDocument')){
                // Swal.fire({  
                //   //position: 'top-end',  
                //   showClass: {
                //     popup: 'animate__animated animate__fadeInDown'
                //   },
                //   hideClass: {
                //     popup: 'animate__animated animate__fadeOutUp'
                //   },
                //   icon: 'success',  
                //   title: 'Uploaded',  
                //   showConfirmButton: false,  
                //   timer: 1500  
                // }); 
                this.toastService.show('File uploaded successfully...!', { classname: 'toast-success text-light', delay: 2000 });
              }
              else if(req.url.includes('logAppFeeTransaction')){
                Swal.fire({  
                  //position: 'top-end',  
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                 
                  icon: 'warning',  
                  text: 'Please do not close or refresh window. You are going to redirect payment gateway page..! It may take several time..!', 
                  backdrop: false,
                  showConfirmButton: false,  
                }); 
              }
              // else if(req.url.includes('getPrincipalApprovalUnderRBA')){
              //   Swal.fire({  
              //     showClass: {
              //       popup: 'animate__animated animate__fadeInDown'
              //     },

              //     icon: 'warning',  
              //     text: 'Please wait.. We are verifying your In-Principal Approvals details. It may take some time. Please do not close or refresh this window..! ', 
              //     backdrop: false,
              //     showConfirmButton: false,  
              //   }); 
              // }
              else{
                // Swal.fire({  
                //   //position: 'top-end', 
                //   showClass: {
                //     popup: 'animate__animated animate__fadeInDown'
                //   },
                //   hideClass: {
                //     popup: 'animate__animated animate__fadeOutUp'
                //   }, 
                //   icon: 'success',  
                //   title: 'Submitted',  
                //   showConfirmButton: false,  
                //   timer: 1500  
                // }); 
                this.toastService.show('Submitted successfully...!', { classname: 'toast-success text-light', delay: 2000 });
              }
            }
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}