import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ApiProviderService } from '../services/api-provider.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formRegister: FormGroup;
  apiProvider: ApiProviderService;

  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController, apiProvider: ApiProviderService) {
    this.formRegister = this.fb.group({
      'firstname': new FormControl("", Validators.required),
      'secondname': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'c_password': new FormControl("", Validators.required)
    })
    this.apiProvider = apiProvider;
  }

  ngOnInit() {
  }

  async register() {
    var fR = this.formRegister.value;
    if(this.formRegister.invalid) {
      const alert = await this.alertController.create({
        header: 'Falta de datos',
        message:'Es necesario que rellene todos los datos para registrarse en Free2Game.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }else {
      this.apiProvider.register(fR.firstname, fR.secondname, fR.email, fR.password, fR.c_password);
      this.navCtrl.navigateRoot('login');
    }
  }
}
