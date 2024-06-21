import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  feedbackForm: any;
  public isShown: boolean = true;
  getData: any;
  data:any = {};
  src:any="https://www.google.co.in/logos/doodles/2022/2022-world-cup-opening-day-6753651837109999.4-law.gif";
  exceedsReason = "Maximum Files Attach : 5 Files.<br>Maximum Files Size : 25MB<br>Accepted File Types : JPEG, JPG, PNG, PDF, PPT, PPTX, CSV, DOCX, DOC, XLXS, XLS.";
  exceeds = false;
  formatThumnail = [
    {"type":"JPEG", "source":"image.webp"},
    {"type":"JPG", "source":"image.webp"},
    {"type":"PNG", "source":"image.webp"},
    {"type":"PDF", "source":"pdf.png"},
    {"type":"PPT", "source":"ppt.png"},
    {"type":"PPTX", "source":"ppt.png"},
    {"type":"CSV", "source":"xls.png"},
    {"type":"DOCX", "source":"doc.png"},
    {"type":"DOC", "source":"doc.png"},
    {"type":"XLXS", "source":"xls.png"},
    {"type":"XLS", "source":"xls.png"}
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      confirmationId: ['', Validators.required],
      ticket: ['', Validators.required],
      additionalDetails: [''],
      file: [''],
      likeAReply: [false],
    });

    // this.auth.pinfoDataget().subscribe((result) => {
    //   this.getData = result;
    //   console.log(this.getData)
    // })
    // this.id = sessionStorage.getItem('id');

    /*this.auth.pinfoDatagetById(this.id).subscribe((result) => {
      this.getData = result;
      console.log(this.getData, 'getDataById');
    });*/
    this.getFormData();
  }


  getFormData(){
    let id = sessionStorage.getItem('id');
    if(id!=null){
      this.auth.pinfoDataGetFormData(id).subscribe(
        (resp) => {
          if (resp) {
            if(resp.attachment.lenght < 1){
              this.exceeds = true;
            }
            this.data = resp;
          }
        },
        (err) => {
          
        }
      );
    }
    else {
      this.router.navigate(['/admin/personalInfo'])
    }
  }

  OpenImageInNewTab(source:string){
    var image = new Image();
    image.src = source;

    var newWindow = window.open("", 'Image','width=700,height=500,top=200,left=500');
    newWindow!.document.write(image.outerHTML);
  }

  removeOldImage(index:any){
    this.data.attachment.splice(index, 1);
  }

  toggle() {
    this.isShown = !this.isShown;
  }

  uploadFile(fileInput: any) {
    let files: File[] = fileInput.files;
    if (this.data.attachment.length + files.length > 5) {
      this.exceeds = true;
      this.exceedsReason = "Maximum Files Attach : 5 Files.";
      return;
    }
    else{
      Array.from(files).forEach((file) => {
        const fileSize = file.size / 1024 / 1024;
        const fileTypes = ["image/jpg", "image/jpeg", "image/png", "application/vnd.ms-powerpoint", "application/pdf", "application/msword", "application/vnd.ms-excel"];
        if(!fileTypes.includes(file.type)){
          this.exceeds = true;
          this.exceedsReason = "Accepted File Types : JPEG, JPG, PNG, PDF, PPT, PPTX, CSV, DOCX, DOC, XLXS, XLS.";
          return;
        }
        else if(fileSize > 25){
          this.exceeds = true;
          this.exceedsReason = "Maximum Files Size : 25MB";
          return;
        }
        else{
          this.exceeds = false;
          this. exceedsReason = "Maximum Files Attach : 5 Files.<br>Maximum Files Size : 25MB<br>Accepted File Types : JPEG, JPG, PNG, PDF, PPT, PPTX, CSV, DOCX, DOC, XLXS, XLS.";
          this.changeFile(file).then((base64:any) => {
            this.data.attachment.push(base64);
          });
        }
      });
    }
  }

  changeFile(file:any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  }

  redirect() {
    if (
      this.feedbackForm.confirmationId === '' ||
      this.feedbackForm.ticket === '' ||
      this.feedbackForm.additionalDetails === ''
    ) {
      alert('All Fields Are manditory');
    } else {
      this.auth.pinfoDatapost(this.data).subscribe(
        (resp) => {
          if (resp) {
            sessionStorage.setItem('id', resp._id);
            this.router.navigate(['/admin/review']);
            // alert('Data added in Database');
          }
        },
        (err) => {
          alert('Form data not Posted');
        }
      );
    }
  }

  Back(){

    this.location.back();
  }

  sourceOfBase64Thumnail(base64:string){
    let format = base64.split("data:")[1].split(";base64")[0];
    let formatToReturn = "assets/image/";
    if(format.includes("png") || format.includes("jpg") || format.includes("jpeg")){
      formatToReturn += "image.webp";
    }else if(format.includes("pdf")){
      formatToReturn += "pdf.png";
    }else if(format.includes("ppt") || format.includes("pptx")){
      formatToReturn += "ppt.png";
    }else if(format.includes("doc") || format.includes("docx")){
      formatToReturn += "doc.png";
    }else if(format.includes("xls") || format.includes("xlxs") || format.includes("csv")){
      formatToReturn += "xls.png";
    }else{
      formatToReturn += "crash.png";
    }
    return formatToReturn;
  }
}
