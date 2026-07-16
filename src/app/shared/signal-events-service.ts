import { Injectable, signal } from '@angular/core';
import { IFilePreviewInfoViewModel } from './shared-typed-models';
import { GlobalStateManagerService } from './global-state-manager-service';

@Injectable({
  providedIn: 'root'
})
export class SignalEventsService {
    filePreviewEvent = signal<IFilePreviewInfoViewModel | null>(null);
    constructor(private globalStateManagerService: GlobalStateManagerService){} 
    
    emitFilePreviewEvent(filePreviewInfo: IFilePreviewInfoViewModel){
        //this.globalStateManagerService.setFilePreviewInfoValue(filePreviewInfo)
        this.filePreviewEvent.set(filePreviewInfo);
    }

}