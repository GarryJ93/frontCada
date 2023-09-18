import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  bioSection = this.fb.group({
    userName: ['', Validators.required],
    passWord: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
  callingFunction() {
    console.log(this.bioSection.value);
  }
}
