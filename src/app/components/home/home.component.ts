import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  addSiteForm: FormGroup;
  urlCtrl: FormControl;
  siteNameCtrl: FormControl;
  sectorCtrl: FormControl;
  userNameCtrl: FormControl;
  passwordCtrl: FormControl;
  notesCtrl: FormControl;
  searchModel: any;

  groupList: any = [];

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initializeAddSiteForm();
    this.groupList = this.getSiteData();
  }
  private initializeAddSiteForm() {
    // form validators
    this.urlCtrl = this.formBuilder.control("", [Validators.required]);
    this.siteNameCtrl = this.formBuilder.control("", [Validators.required]);
    this.sectorCtrl = this.formBuilder.control("", [Validators.required]);
    this.userNameCtrl = this.formBuilder.control("", [Validators.required]);
    this.passwordCtrl = this.formBuilder.control("", [Validators.required]);
    this.notesCtrl = this.formBuilder.control("", [Validators.required]);

    this.addSiteForm = this.formBuilder.group({
      url: this.urlCtrl,
      siteName: this.siteNameCtrl,
      sector: this.sectorCtrl,
      userName: this.userNameCtrl,
      password: this.passwordCtrl,
      notes: this.notesCtrl
    });
  }

  public addSite(Form) {
    const siteDetails = this.getDetails(Form);
    if (!this.groupList) {
      this.groupList = [];
    } else {
      this.groupList = this.getSiteData();
    }
    this.groupList.push(siteDetails);
    localStorage.setItem("siteData", JSON.stringify(this.groupList));
  }

  public logout() {
    localStorage.removeItem("loggedIn");
    this.router.navigate(["login"]);
  }

  private getSiteData() {
    var retrievedObject = JSON.parse(localStorage.getItem("siteData"));
    return retrievedObject;
  }

  private getSiteLogo(domain) {
    return `https://www.google.com/s2/favicons?domain=${domain}`;
  }
  private getDetails(Form) {
    const siteData = {
      url: Form.value.url,
      siteName: Form.value.siteName,
      sector: Form.value.sector,
      userName: Form.value.userName,
      password: Form.value.password,
      notes: Form.value.notes,
      siteLogo: this.getSiteLogo(Form.value.url)
    };
    return siteData;
  }

  public cancel() {
    this.addSiteForm.reset();
  }

  public copyMessage(val: string) {
    console.log(val);
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }
}
