import { Component, OnInit } from '@angular/core';

import { AppService } from '../directive/app.service';
import { Action } from '../directive/app.constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private appService: AppService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    public router: Router
  ) { }
  register = {
    username: '',
    password: '',
    confirmPassword: ''
  }
  config = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: false,
    height: '300px',
  };
  billing = {
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    stateProvince: '',
    country: '',
    postalCode: '',
    phone: '',
    countryCode: '',
    zone: ''
  }
  stateData: Array<any> = [];
  countryData: Array<any> = [];
  ngOnInit() {
    this.getCountry()
  }

  getCountry() {
    let action = Action.COUNTRY;
    this.appService.getMethod(action)
      .subscribe(data => {
        this.countryData = data;
      }, error => {
      });
  }
  onCountrySelect(value) {
    // console.log(value);
    // this.getState(value);
    if (value.value) {
      this.billing.country = value.value.name;
      this.billing.countryCode = value.value.code;
      this.stateData = value.value.zones;
    }
  }
  onStateSelect(value) {
    this.billing.zone = value.value.code;
    this.billing.stateProvince = value.value.name;
  }
  // getState(code) {
  //   let action = Action.ZONES;
  //   this.appService.getMethod(action + '?code=' + code)
  //     .subscribe(data => {
  //       this.stateData = data;
  //     }, error => {
  //     });
  // }
  onRegister() {
    this.spinnerService.show();
    let action = Action.CUSTOMER + Action.REGISTER;
    let param = {
      "userName": this.register.username,
      "password": this.register.password,
      "emailAddress": this.register.username,
      "gender": "F",
      "language": "en",
      "billing": {
        "country": this.billing.countryCode,
        "zone": this.billing.zone,
        "stateProvince": this.billing.zone,
        "firstName": this.billing.firstName,
        "lastName": this.billing.lastName,
      }
    }
    this.appService.postMethod(action, param)
      .subscribe(data => {
        console.log(data);
        this.spinnerService.hide();
        this.router.navigate(['/orders']);
        localStorage.setItem('userData', JSON.stringify(data));
        this.toastr.success('You have successfully registerd in to this site.', 'Congratulation');
      }, error => {
        console.log(error);
        this.spinnerService.hide();
        this.toastr.error('Registering customer user already exist');
        console.log('user')
      });
  }

}