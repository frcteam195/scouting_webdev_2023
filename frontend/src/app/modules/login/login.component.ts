import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Access } from '../../access';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: string = "";
  pass: string = "";
  apiAccess: Access[] = [];
  userAccess: number = 0;
  display: number = 1;
  access: number = 0;

  titleMessage: string = "Please enter login credentials";

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {
    // Verify User has access for this page.
    this.access = Number(localStorage.getItem('access')) || -1;

    if(this.access <= 0) {
      this.display = 1;
      this.titleMessage="Please enter login credentials";
    } else {
      this.display = 2;
      this.titleMessage="Press Logout Button to Log Out";
    }

  }

  clickLogin(user: string, pass: string) {

    this.apiService.getUserAccess(user,pass).then((data => {
      this.apiAccess=data;
       console.log("Function Done!", this.apiAccess);

       for (const a of this.apiAccess) {

          console.log("Access: " + a.analysisAccess);
      
          if(a.analysisAccess > 0) {
            console.log("Access Level: " + a.analysisAccess);
            localStorage.setItem('access', a.analysisAccess.toString());
            // Call API to Load Data
            this.apiService.loadData();
            this.titleMessage = "Logged in Successfully";
            this.display = 2;
            return;
          }
      }

    })); 

    this.titleMessage = "Log in Failed.  Please check credentials"; 


  }


  clickLogout() {

    localStorage.setItem('access', '0');
    this.titleMessage = "You have been Logged Out";    
    this.display = 1;

  }


}
