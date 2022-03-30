import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiProviderService } from '../services/api-provider.service';
import { AlertController, IonList, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  users: any;
  @ViewChild('user_list', {static:true}) user_list: IonList;

  constructor(private apiProvider: ApiProviderService, private navCtrl: NavController, private alertCtrl: AlertController, modalCtrl: ModalController) { }

  ngOnInit() {
    if(this.apiProvider.token != undefined){
      this.apiProvider.loadUsers().then(user => {
        this.users = user.data;
      })
    }else {
      this.navCtrl.navigateRoot('login');
    }
  }

  activate_user(id: number, email_confirmed: number) {
    this.apiProvider.activate_user(id, email_confirmed);
    this.ngOnInit();
  }

  deactivate_user(id: number) {
    this.apiProvider.deactivate_user(id);
    this.ngOnInit();
  }

  async delete_user(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación para eliminar usuario',
      message: '¿Está seguro de querer eliminar el usuario permanentemente?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',	
          cssClass: 'secondary',
          handler: () => {}
       },
       {
         text: 'Eliminar Usuario',
         handler: () => {
          this.apiProvider.delete_user(id)
          this.ngOnInit();
         }
      }]
    });
    await alert.present();
    this.user_list.closeSlidingItems();
  }
}
function email_confirmed(id: number, email_confirmed: any) {
  throw new Error('Function not implemented.');
}

