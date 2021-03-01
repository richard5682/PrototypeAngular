import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConnectService } from 'src/app/service/connect/connect.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss']
})
export class UploadfileComponent implements OnInit {
  imagedisplay;
  @Input() phpfile:string;
  @Input() maxsize:number; 
  @Output() filedoneupload = new EventEmitter();;
  @Output() uploading = new EventEmitter();
  check:boolean = false;
  hint:string='HELLO';
  constructor(private connect:ConnectService) { 
  }

  ngOnInit() {
  }
  filechange(event){
    var imagefile:File = event.target.files[0];
    if(imagefile.size <= this.maxsize){
      this.check=true;
      var reader = new FileReader();
      reader.readAsDataURL(imagefile);
      reader.onloadend = (e)=>{
        this.imagedisplay = e.target.result;
      };
      this.hint = "HIT UPLOAD TO UPLOAD YOUR IMAGE";
    }else{
      this.hint = "YUOR FILE IS TOO BIG";
    }
  }
  uploadfile(){
    this.uploading.emit();
    if(this.check){
      this.hint = "UPLOADING...";
      var params = new HttpParams().set('imagedata',this.imagedisplay)
      .set('file',this.phpfile);
      console.log(params.toString());
      this.connect.postRequest('imageupload',params).subscribe(
        data => {
          console.log(data);
          if(data['result']==1){
            this.filedoneupload.emit(data['link']);
            this.hint = "DONE UPLOADING!!";
          }
        }
      );
    }
  }

}
