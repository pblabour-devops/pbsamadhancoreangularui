import { Component, OnInit } from '@angular/core';
import { HttpLoaderService } from '../http-loader.service';
@Component({
    selector: 'app-http-loader',
    templateUrl: './http-loader.component.html',
    styleUrls: ['./http-loader.component.css'],
    standalone: false
})
export class HttpLoaderComponent implements OnInit {
  loading: boolean;
  isApiCompleted: any;
  constructor(private httpLoaderService: HttpLoaderService) {
    this.httpLoaderService.isLoading.subscribe((v) => {
      document.body.style.overflow= v ?  'hidden' : 'auto';
      this.loading = v;
    });

    this.httpLoaderService.showDialogBox.subscribe((v) => {
      

      this.isApiCompleted = v;
      //showDislog:false, isError:false, errorMsg:''
    });

   }

  ngOnInit(): void {
  }
  public hideApiMessageDialog(){
    this.isApiCompleted.showDislog = false;
  }
}
