import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ApiProviderService } from '../services/api-provider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  apiProvider: ApiProviderService;
  email: string;
  password: string;
  data: any;

  constructor(public fb: FormBuilder, public alertController : AlertController, public navCtrl : NavController, apiProvider: ApiProviderService) {
    this.formLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
    this.apiProvider = apiProvider;
  }

  ngOnInit() {
  }

  async login() {
    if(this.formLogin.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tiene que introducir todos los datos para iniciar sesión.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
    this.apiProvider.login(this.formLogin.value.email, this.formLogin.value.password).then(async data => {
      this.data = data;
      this.data = this.data.data;
      if(this.data.actived == '1'){
          if(this.data.type=='a'){
            this.navCtrl.navigateRoot('admin');
          }else{
            this.navCtrl.navigateRoot('tab1');
          }
      }else {
        const alert = await this.alertController.create({
          header: 'Cuenta desactivada',
          message: 'Para acceder primero tiene que verificar su email, tras esto un administrador activará su cuenta y podrá iniciar sesión.',
          buttons: ['Aceptar'],
        });
        await alert.present();
        return;
      }
    })
  }
}
