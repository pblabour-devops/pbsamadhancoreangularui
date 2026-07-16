import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-part-iii-worker-detail-inspection',
    templateUrl: './part-iii-worker-detail-inspection.component.html',
    styleUrls: ['./part-iii-worker-detail-inspection.component.css'],
    standalone: false
})
export class PartIiiWorkerDetailInspectionComponent implements OnInit {
  @Input() jsonData: any;
  public savedData : any;
  constructor() { }

  ngOnInit(): void {
  }

}
