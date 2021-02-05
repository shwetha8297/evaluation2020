import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  notFocused_email: Boolean = false;
  notFocused_password: Boolean = false;
  emailidCtrl: FormControl;
  passwordCtrl: FormControl;
  submitted = false;
  errorMsg: string;
  invalid = false;
  show: Boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initializeLoginForm();
  }

  private initializeLoginForm() {
    // form validators
    this.emailidCtrl = this.formBuilder.control("", [Validators.required]);
    this.passwordCtrl = this.formBuilder.control("", [Validators.required]);
    this.loginForm = this.formBuilder.group({
      emailId: this.emailidCtrl,
      password: this.passwordCtrl
    });
  }

  public login() {
    this.submitted = true;
    this.invalid = false;
    if (this.loginForm.value.emailId && this.loginForm.value.password) {
      this.invalid = false;
      this.errorMsg = null;
      localStorage.setItem("loggedIn", "true");
      this.router.navigateByUrl("/home");
    }
  }
  // view or hide password
  togglePassword() {
    this.show = !this.show;
  }
}
