import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDynamicFormFieldsViewModel, IDynamicFormViewModel } from './dynamic-form-typed.modules';
import { AppHttpRequestHandlerService } from '../app-http-request-handler.service';
import { CommonOpsService } from '../common-ops-service';
import { environment } from 'src/environments/environment';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.css'],
    standalone: false
})
export class DynamicFormComponent implements OnInit {
  @Input() dynamicFormFields: IDynamicFormFieldsViewModel[]=[];
  @Input() targatedModel: string="";
  @Input() controller: string="";
  @Input() actionMethod: string ="";
  @Output() formPostReqestRespEvent = new EventEmitter<any>();
  dynamicForm: IDynamicFormViewModel;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
 
  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService) { }
  ngOnInit(): void {}

  ngOnChanges(){
    this.dynamicForm ={clientId_OnCreation:'', clientId_OnSubmission:'', formCreatedOn:'', dynamicFormFields:[]};
    let currDateStemp = new Date();
    this.dynamicForm.formCreatedOn= currDateStemp.getFullYear()
          +'-'+ 
        this.strPreFixPading((currDateStemp.getMonth()+1),2) 
          +'-'+ 
        this.strPreFixPading(currDateStemp.getDate(),2)
          +'-'+ 
        this.strPreFixPading(currDateStemp.getHours(),2)
          +'-'+
        this.strPreFixPading(currDateStemp.getMinutes(),2);
    this.dynamicFormFields.forEach(element => {
        element.key=this.generateGuid();
        this.dynamicForm.dynamicFormFields.push(element);
    });
  }

  getInputType(key): string{
    return this.dynamicForm.dynamicFormFields.filter(x=>x.key == key)[0].type;
  }

  onFormFieldChange(isClientSideEncryption: boolean, event: any): void{
    let updatedValue=event.target.value;
    if(isClientSideEncryption){
      updatedValue = this.commonOpsService.encryptUsingAES256(event.target.value, environment.xhrEncryptionConfigs.xhrEncyptionSecretKey, environment.xhrEncryptionConfigs.xhrEncyptionSecretIV);
    }
    this.getObjects(this.dynamicForm.dynamicFormFields, 'key', event.target.id, updatedValue);
  }

  getObjects(obj: any, key: string, val: string, newVal: string) {
    var newValue = newVal;
    var objects: any[] = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
        objects = objects.concat(this.getObjects(obj[i], key, val, newValue));
      } else if (i == key && obj[key] == val) {
        obj['value'] = newValue;
      }
    }
    return obj;
  }
  onFocus(event: any){
    event.target.value='';
  }
  strPreFixPading(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  onLoginSubmit(){
    this.appHttpRequestHandlerService
      .httpPost(this.dynamicForm, this.targatedModel, this.controller, this.actionMethod)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.formPostReqestRespEvent.emit(data);
    });
  }
}
