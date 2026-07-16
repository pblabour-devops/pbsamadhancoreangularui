import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dyanmic-checklist',
    templateUrl: './dyanmic-checklist.component.html',
    styleUrls: ['./dyanmic-checklist.component.css'],
    standalone: false
})
export class DyanmicChecklistComponent implements OnInit {
public checkListForm:any;
  constructor(private fb: UntypedFormBuilder,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkListForm= this.fb.group({
      checkListNodes:this.fb.array([])
    });
  }
  ngAfterViewInit(): void{
     this.cdr.detectChanges();  
  }

  btnClick(fieldName: string){
    // (<FormArray>this.checkListForm.get('checkListNodes')).push(this.fb.group({
    //   fieldName:[fieldName, Validators.required],
    //   isVerified:['', Validators.required],
    //   remarks:['', Validators.required]
    // }));
  }
  onaddCheckListToFormEvent(nodeInfo: any){
    (<UntypedFormArray>this.checkListForm.get('checkListNodes')).push(this.fb.group({
      fieldName:[nodeInfo.nodeName, Validators.required],
      isVerified:['', Validators.required],
      remarks:['', Validators.required],
      isDocument:[nodeInfo.isDocument, Validators.required]
    }));
  }
  onChangeChecklistNodeEvent(nodeUpdatedValueInfo: any){
    var nodeName =  nodeUpdatedValueInfo.nodeName_controlName.split('_')[0];
    var controlName =  nodeUpdatedValueInfo.nodeName_controlName.split('_')[1];
    var checklistNodes = <UntypedFormArray>this.checkListForm.get('checkListNodes');
    checklistNodes.controls.map(x=>{
      if(x.value.fieldName==nodeName){
        x.patchValue({[controlName]:nodeUpdatedValueInfo.value});
        if(controlName=='isVerified'){
          x.patchValue({remarks:nodeUpdatedValueInfo.value=='true'?'NA':''});
        }
      }
    })
  }
}
