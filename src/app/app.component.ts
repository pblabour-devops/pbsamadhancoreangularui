import { Component, effect, HostBinding, HostListener, inject, Renderer2 } from '@angular/core';
import { UntypedFormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {  CommonService} from './common/common.service'
import { AuthService } from './auth/auth.service';
import { GlobalStateManagerService } from './shared/global-state-manager-service';
import { UserIdleService } from 'angular-user-idle';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpLoaderService } from './shared/http-loader.service';
import { Subject, Subscription } from 'rxjs';
import { GeolocationService } from './shared/geo-location-service';
import { ToastService } from './shared/global-toast/toast-service';
import { IFilePreviewInfoViewModel, IPdfWindowViewModel } from './shared/shared-typed-models';
import { SignalEventsService } from './shared/signal-events-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ResizeDirective } from './custom-directives/resize.directive';
import { DragDirective } from './custom-directives/drag.directive';
import { takeUntil } from 'rxjs/operators';
import { AppHttpRequestHandlerService } from './shared/app-http-request-handler.service';
import { CommonOpsService } from './shared/common-ops-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false,
})
export class AppComponent {
    protected ngUnsubscribe: Subject<void> = new Subject<void>();
    isNavOpen: boolean = true;
 progressValue = '100%';
 maxLogoutWaitingTime_seconds: number=environment.maxLogoutWaitingTime_seconds; 
 maxLogoutWaitingTimeRemains_seconds: number=environment.maxLogoutWaitingTime_seconds; ; 
 isLogoutTimerStarts: boolean = false;
 isLocationOn: boolean=false;
 isLocationFetched: boolean=false;
 status: PermissionState = 'prompt';
  private statusSubscription: Subscription;
  show = false;
  pdfWindows: IFilePreviewInfoViewModel[] = [];
  counter = 1;
  draggingWindow: IFilePreviewInfoViewModel | null = null;
  offsetX = 0;
  offsetY = 0;
  currentZIndex = 1050;
  private sanitizer = inject(DomSanitizer);
  constructor(private fb: UntypedFormBuilder, 
    private http: HttpClient, 
    public common:CommonService, 
    public authService: AuthService, 
    public globalStateManagerService: GlobalStateManagerService, 
    private userIdle: UserIdleService,
    private router: Router,
    private loaderService: HttpLoaderService,
    private geolocationService: GeolocationService,
    public toastService: ToastService,
    public signalEventsService: SignalEventsService,
    private renderer: Renderer2,
    private CS : CommonService,
    private route : ActivatedRoute,
    private commonOpsService : CommonOpsService,
    private appHttpRequestHandlerService : AppHttpRequestHandlerService) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if(event.url=='/' || event.url.toLowerCase().includes('Login') || event.url.toLowerCase().includes('UserRegistration')){
            this.userIdle.stopWatching();
          }
          else{
            this.userIdle.startWatching();
          }
        }
      });
      // const location = this.common.getCurrentLocation().then((x: any) => {
      //   this.globalStateManagerService.setClientLocationValue({ latitude : x.latitude, longitude: x.longitude });
      //   this.common.getIpCliente().subscribe((y: any)=>{
      //     this.globalStateManagerService.setClientIpValue(y.ip);
      //     this.globalStateManagerService.setClientLocationIsOnValue(true);
      //   });
        
      //   }).catch((ex: any) => {
      //     this.globalStateManagerService.setClientLocationIsOnValue(false);
      // });

      this.statusSubscription = this.geolocationService.getPermissionStatusChanges()
      .subscribe(state => {
        this.status = state;
        if (state === 'granted') {
          this.isLocationOn= true;
          this.geolocationService.requestLocation().then((position: any) => {
            //this.common.getIpCliente().subscribe((y: any)=>{
              this.isLocationFetched= true;
              this.globalStateManagerService.setClientIpValue('');
              this.globalStateManagerService.setClientLocationIsOnValue(true);
              this.globalStateManagerService.setClientLocationValue({ latitude : position.coords.latitude, longitude: position.coords.longitude });
            //});
          });
        }
        else{
          this.globalStateManagerService.setClientIpValue('');
          this.globalStateManagerService.setClientLocationIsOnValue(false);
          this.globalStateManagerService.setClientLocationValue({ latitude : '', longitude: '' });
          this.isLocationOn= false;
          this.isLocationFetched= false;
        }
      });
      effect(() => {
        const filePreviewInfo = this.signalEventsService.filePreviewEvent();
        if (!filePreviewInfo) {
          return;
        }
        this.addPdfWindow(filePreviewInfo);
      });
    }
    @HostBinding('style.--progress-value')
    get getProgressValue() {
      return this.progressValue;
    }
    @HostListener('window:beforeunload', ['$event'])
      
    unloadHandler(event: Event) {
    let encryptedKey = this.globalStateManagerService.getTokenEncryptedKeyValue();
    let ivKey = this.globalStateManagerService.getTokenIVKeyValue();
    if(encryptedKey && ivKey){
        localStorage.setItem('a2c47912-dcfe-46ec-ae56-e2b1150b5426', encryptedKey+ '|'+ivKey);
        localStorage.setItem('a91ec29d-995f-4fff-8472-fa7c4a512341', this.globalStateManagerService.getTokenJwtValue());
    } 
    else{
      localStorage.setItem('a2c47912-dcfe-46ec-ae56-e2b1150b5426', '');
      localStorage.setItem('a91ec29d-995f-4fff-8472-fa7c4a512341', '');
    }       
  }
  title = 'pbsamadhancoreangularui';
  ngOnInit(): void {
 this.route.queryParams
        .subscribe(params => {
          this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
            console.log('decoded info', info)
          });
        });



     this.isNavOpen = this.CS.getNavBarState();
    this.CS.navBarState$obs
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((state: boolean) => {
        this.isNavOpen = state;
      });
    this.userIdle.onTimerStart().subscribe(count => {
      if(count==1){
        this.maxLogoutWaitingTimeRemains_seconds=this.maxLogoutWaitingTime_seconds;
        this.changeProgressValue('100%');
        this.isLogoutTimerStarts=true;
      }
      this.changeProgressValue((100-((count/this.maxLogoutWaitingTime_seconds)*100)).toString()+'%');
      this.maxLogoutWaitingTimeRemains_seconds--;
    });
    this.userIdle.onTimeout().subscribe(() => {
      this.authService.logout(true);
      this.stopWatching();
      this.isLogoutTimerStarts=false;
      this.pdfWindows.forEach((pdf)=>{
        this.removeWindow(pdf.id);
      });
    });
    this.startWatching() 

    if(localStorage.getItem('a2c47912-dcfe-46ec-ae56-e2b1150b5426')){
      var val = localStorage.getItem('a2c47912-dcfe-46ec-ae56-e2b1150b5426');
      this.globalStateManagerService.setTokenEncryptedKeyValue(val.split('|')[0]);
      this.globalStateManagerService.setTokenIVKeyValue(val.split('|')[1]);
      localStorage.removeItem('a2c47912-dcfe-46ec-ae56-e2b1150b5426');
    }
    if(localStorage.getItem('a91ec29d-995f-4fff-8472-fa7c4a512341')){
      var val = localStorage.getItem('a91ec29d-995f-4fff-8472-fa7c4a512341');
      this.globalStateManagerService.setTokenJwtValue(val);
      localStorage.removeItem('a91ec29d-995f-4fff-8472-fa7c4a512341');
    }
  }

  stop() {
    this.userIdle.stopTimer();
    this.isLogoutTimerStarts=false;
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }

  changeProgressValue(newValue: string) {
    this.progressValue = newValue;
  }


  showStandard() {
		this.toastService.show('I am a standard toast');
	}

	showSuccess() {
		this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
	}

	showDanger(dangerTpl) {
		this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
	}

addPdfWindow(filePreviewInfo: IFilePreviewInfoViewModel) {
  if(this.pdfWindows.length==0 || this.pdfWindows.filter(x=>x.name == filePreviewInfo.name).length==0){
    this.currentZIndex++;
    this.pdfWindows.push({
      id: this.counter,
      title: filePreviewInfo.title,
      path: this.getSanitizedUrl(filePreviewInfo.path),
      name: filePreviewInfo.name,
      publicReferenceNum: filePreviewInfo.publicReferenceNum,
      type: filePreviewInfo.type,
      uploadedOn: filePreviewInfo.uploadedOn,
      x: 5 + (this.counter * 15),
      y: 5 + (this.counter * 15),
      zIndex: this.currentZIndex
      });
      this.counter++;
    }
    else{
      this.bringToFront(filePreviewInfo);
      const element = document.getElementById(this.pdfWindows.filter(x=>x.name == filePreviewInfo.name)[0].id.toString());
      if (element) {
        this.renderer.setStyle(element, 'z-index', this.currentZIndex);
      }
    }
  }

  removeWindow(id: number) {
    this.pdfWindows = this.pdfWindows.filter(w => w.id !== id);
  }

  startDrag(event: MouseEvent, window: IFilePreviewInfoViewModel) {
    this.bringToFront(window);
    this.draggingWindow = window;

    this.offsetX = event.clientX - window.x;
    this.offsetY = event.clientY - window.y;
  }
  onMouseMove(event: MouseEvent) {
    if (this.draggingWindow) {
      this.draggingWindow.x = event.clientX - this.offsetX;
      this.draggingWindow.y = event.clientY - this.offsetY;
    }
  }
  stopDrag() {
    this.draggingWindow = null;
  }
  bringToFront(window: IFilePreviewInfoViewModel) {
    this.currentZIndex++;
    window.zIndex = this.currentZIndex;
  }
  ngOnDestroy() {
        this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }
  onResize(event){
  }

  getSanitizedUrl(rawUrl): SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }
}

