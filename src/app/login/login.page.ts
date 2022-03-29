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
        message: 'Tienes que llenar todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
    this.apiProvider.login(this.formLogin.value.email, this.formLogin.value.password)
    .then(data => {
      this.data = data;
      this.data = this.data.data;
      this.navCtrl.navigateRoot('tab1');
      //this.apiProvider.obtenerUsuario(this.data.id);
      //  if(this.data.type=='a'){
      //    this.route.navigate(['/administration'])
      //  }else{
      //    this.route.navigate(['/user'])
      //  }

    })
  }
}
