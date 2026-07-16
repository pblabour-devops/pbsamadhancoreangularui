import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private isShowNav=false;
  private isShowHeader=false;
 private navBarState$ = new BehaviorSubject<boolean>(window.innerWidth > 991); // true = open on desktop by default
  public navBarState$obs = this.navBarState$.asObservable();

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService, private http: HttpClient,
    public authService: AuthService
  ) { }
  
   setNavStatus = (status) => { this.isShowNav = status };
  getNavStatus = () => { return this.isShowNav };
  setHeaderStatus = (status) => { this.isShowHeader = status };
  getHeaderStatus = () => { return this.isShowHeader };

  // keep same method names, just route through the subject now
  setNavBarState = (state: boolean) => {
    this.navBarState$.next(state);
  }
  getNavBarState = () => {
    return this.navBarState$.getValue();
  }

  getApplicationPurposeTypeDesc(applicationPurposeType: number){
    if(applicationPurposeType==1){
      return "(Registration)";
    }
    else if(applicationPurposeType==2){
      return "(Renewal)";
    }
    else if(applicationPurposeType==3){
      return "(Amendment)";
    }
    else{
      return "";
    }
  }
  
  // Define For MIS Dashboard
  public servicesList = [
    { id: 70, name: "Registration of Factories Under The Factory ACT" },
    { id: 5, name: "Combined Proposed Approval of Building Plans (HUD and Factories)" },
    { id: 6, name: "The Punjab Shop & Commercial Establishment Act, 1958" },
    { id: 61, name: "Grant of Permission for Women to Work in Night Shift Under Shop Act" },
    { id: 62, name: "Grant of Permission for Women to Work in Night Shift Under Factory Act" },
    { id: 76, name: "Submission of Stability Certificate Under Factories Act-1948" },

    // Old Database Applications
    { id: 38, name: "The Contract Labour Act, 1970" },
    { id: 37, name: "The Contract Labour Act, 1970 (Principal Employer)" },
    { id: 71, name: "Application for Approval of Proposed Building Plans Under The Factory Act - 1948" },
    { id: 72, name: "Application for Approval of Existing Building Plans Under The Factory Act - 1948" },
    { id: 73, name: "Approval of Building Plan of Existing Building with Stability Certificate (Addition/Amendment)" },
    { id: 39, name: "The Inter State Migrant Workmen ACT, 1979 (Principal Employer)" },
    { id: 40, name: "The Inter State Migrant Workmen ACT, 1979 (Contract Labour)" },
    { id: 36, name: "The Motor Transport Workers Act, 1961" },
    { id: 107, name: "The Trade Union Act, 1926" },
    { id: 35, name: "The Bocw Act, 1996" },
    { id: 109, name: "Labour Welfare Scheme" },
    { id: 110, name: "Factory Inspections" },
    { id: 111, name: "Labour Inspections" }
  ];

  getServiceNameMapping(): { [key: number]: string } {
   
    const serviceNameMapping: { [key: number]: string } = {};
    const userRole = this.authService.getUserJwtDecodedInfo().RoleName;
    const servicesToInclude = userRole === 'ADDF' ? 
        this.servicesList.filter(service => 
            [5,62,76,70,108,109, 110, 111].includes(service.id)
        ) 
        : userRole === 'MPRM' ||userRole === 'DLFI' 
        ? this.servicesList.filter(service => 
            [110, 111].includes(service.id)
        )
        : 
        this.servicesList;
         // or return an empty array, based on your needs

    servicesToInclude.forEach(service => {
        serviceNameMapping[service.id] = service.name;
    });
    return serviceNameMapping;
    
  }

  getServiceConfig(): { [key: number]: { name: string, purposeType: number }[] } {
    const userRole = this.authService.getUserJwtDecodedInfo().RoleName;
    const serviceConfig: { [key: number]: { name: string, purposeType: number }[] } = {
        70: [
            { name: 'Registration', purposeType: 1 },
            { name: 'Renewal', purposeType: 2 },
            { name: 'Amendment', purposeType: 3 }
        ],
        5: [
            { name: 'Registration', purposeType: 1 }
        ],
        6: [
            { name: 'Registration', purposeType: 1 },
            { name: 'Amendment', purposeType: 3 }
        ],
        61: [
            { name: 'Registration', purposeType: 1 }
        ],
        62: [
            { name: 'Registration', purposeType: 1 }
        ],
        76: [
          { name: 'Registration', purposeType: 1 }
        ],

        38: [
          { name: 'Registration', purposeType: 1 },
          { name: 'Renewal', purposeType: 2 },
          { name: 'Amendment', purposeType: 3 }
        ],
        37: [
          { name: 'Registration', purposeType: 1 },
          { name: 'Amendment', purposeType: 3 }
        ],
        71: [
          { name: 'Registration', purposeType: 1 }
        ],
        72: [
          { name: 'Registration', purposeType: 1 }
        ],
        73: [
          { name: 'Registration', purposeType: 1 }
        ],
        39: [
          { name: 'Registration', purposeType: 1 },
          { name: 'Amendment', purposeType: 3 }
        ],
        40: [
          { name: 'Registration', purposeType: 1 },
          { name: 'Renewal', purposeType: 2 },
          { name: 'Amendment', purposeType: 3 }
        ],
        36: [
          { name: 'Registration', purposeType: 1 },
          { name: 'Renewal', purposeType: 2 },
          { name: 'Amendment', purposeType: 3 }
        ],
        107: [
          { name: 'Registration', purposeType: 1 },
          { name: 'Amendment', purposeType: 3 }
        ],
        35: [
          { name: 'Registration', purposeType: 1 },
          { name: 'Amendment', purposeType: 3 }
        ],
        109: [
          { name: 'Registration', purposeType: 1 }
        ],
        110: [
          { name: 'Registration', purposeType: 1 }
        ],
        111: [
          { name: 'Registration', purposeType: 1 }
        ],
        
    };
    if (userRole === 'ADDF') {
      return {
          5: serviceConfig[5],
          62: serviceConfig[62],
          70: serviceConfig[70],
          76: serviceConfig[76],
          108: serviceConfig[108],
          110: serviceConfig[110],
          111: serviceConfig[111]
      };
  }
  if (userRole === 'MPRM'|| userRole === 'DLFI') {
    return {
        110: serviceConfig[110],
        111: serviceConfig[111]
    };
}
    return serviceConfig;
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              };
              resolve(location);
            }
          },
          (error) => {reject(error)}
        , {enableHighAccuracy:true, timeout:Infinity, maximumAge:60000});
      } else {
        reject({code:'4', message:'Geolocation is not supported by this browser.'});
      }
    });
  }


//   getIpCliente(): Observable<any[]> {
//     return this.http.get('https://localhost:44000/api/CommonApis/getClientId') // ...using post request
//     .pipe(
//       map((res:any) => res), // ...and calling .json() on the response to return data
//       catchError((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if an
//     )
// }

getIpCliente(): Observable<any[]>  {
    return this.appHttpRequestHandlerService.httpGet({ }, "CommonApis", "getClientId").pipe(takeUntil(this.ngUnsubscribe))
    .pipe(
      map((res:any) => res), // ...and calling .json() on the response to return data
      catchError((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if an
    )
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  getMonthNameDesc(monthname: string){
    if(monthname=='JAN'){
      return "January";
    }
    else if(monthname=='FEB'){
      return "February";
    }
    else if(monthname=='MAR'){
      return "March";
    }
    else if(monthname=='APR'){
      return "April";
    }
    else if(monthname=='MAY'){
      return "May";
    }
    else if(monthname=='JUN'){
      return "Jun";
    }
    else if(monthname=='JUL'){
      return "July";
    }
    else if(monthname=='AUG'){
      return "August";
    }
    else if(monthname=='SEP'){
      return "September";
    }
    else if(monthname=='OCT'){
      return "October";
    }
    else if(monthname=='NOV'){
      return "November";
    }
    else if(monthname=='DEC'){
      return "December";
    }
    else{
      return "";
    }
  }
  getMonthName(monthCode: number){
    if(monthCode==1){
      return "January";
    }
    else if(monthCode==2){
      return "February";
    }
    else if(monthCode==3){
      return "March";
    }
    else if(monthCode==4){
      return "April";
    }
    else if(monthCode==5){
      return "May";
    }
    else if(monthCode==6){
      return "Jun";
    }
    else if(monthCode==7){
      return "July";
    }
    else if(monthCode==8){
      return "August";
    }
    else if(monthCode==9){
      return "September";
    }
    else if(monthCode==10){
      return "October";
    }
    else if(monthCode==11){
      return "November";
    }
    else if(monthCode==12){
      return "December";
    }
    else{
      return "";
    }
  }
  public actList = [
            { id: 1, name: 'The Factories Act, 1948' },
            { id: 2, name: 'The Punjab Shops & Commercial Establishments Act, 1958' },
            { id: 3, name: 'The Maternity Benefit Act, 1961' },
            { id: 4, name: 'The Employees Compensation Act, 1923' },
            { id: 5, name: 'The Minimum Wages Act, 1948' },
            { id: 6, name: 'The Payment of Wages Act, 1936' },
            { id: 7, name: 'The Payment of Bonus Act, 1965' },
            { id: 8, name: 'Principal Employer under The Inter-State Migrant Workmen Act, 1979' },
            { id: 9, name: 'The Motor Transport Workers Act,1961' },
            { id: 10, name: 'THE BOCW ACT, 1996' },
            { id: 11, name: 'Contractor under The Contract Labour Act, 1970' },
            { id: 12, name: 'Contractor under The Inter-State Migrant Workmen Act, 1979' },
            { id: 13, name: 'The Trade Union Act, 1926' },
            { id: 14, name: 'The Payment of Gratuity Act, 1972' },
            { id: 15, name: 'The Building and other Construction Workers Welfare Cess Act, 1996' }
          ];
		  
}
