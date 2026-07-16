import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private permissionStatus$: Observable<PermissionState>;

  constructor(private zone: NgZone) {
    this.permissionStatus$ = new Observable(observer => {
      if ('permissions' in navigator) {
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
          // Emit initial status
          this.zone.run(() => observer.next(permissionStatus.state));
          
          // Subscribe to future changes
          permissionStatus.onchange = () => {
            this.zone.run(() => observer.next(permissionStatus.state));
          };
        });
      } else {
        // Handle browsers that do not support the Permissions API
        console.warn('Permissions API not supported in this browser.');
      }
    });
  }

  // Method to subscribe to permission status changes
  public getPermissionStatusChanges() {
    return this.permissionStatus$;
  }

  // Method to request location (will trigger browser prompt if state is 'prompt')
  public requestLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}