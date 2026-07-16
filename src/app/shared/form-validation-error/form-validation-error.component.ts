import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
@Component({
    selector: 'app-form-validation-error',
    templateUrl: './form-validation-error.component.html',
    styleUrls: ['./form-validation-error.component.css'],
    standalone: false
})
export class FormValidationErrorComponent implements OnInit {
  public form: UntypedFormGroup;
  public control : UntypedFormControl;
  @Input() controlName : string;
  @Input() placeHolder : string;
  @Input() isSubmitted: boolean=false;
  
  constructor(private controlContainer: ControlContainer) {}
  clearDate(){
    this.control.reset();
  }
  ngOnInit() {
    this.placeHolder = this.placeHolder.length==0 ? '': 'of '+ this.placeHolder;
    this.form = <UntypedFormGroup>this.controlContainer.control;
    this.control = <UntypedFormControl>this.form.get(this.controlName);
  }
}
