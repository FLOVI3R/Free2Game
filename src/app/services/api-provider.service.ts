import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {
  token: any;
  id: any;
  actived: any;
  deleted: any;
  type: any;

  apiUrl = 'http://semillero.allsites.es/public/api'
  email: any;
  password: any;

  constructor(private http: HttpClient, private alertController: AlertController) { }

  async login(user_email: string, user_password: string){
      return new Promise(resolve => {
        this.http.post<any>(this.apiUrl + '/login', {
          email: user_email,
          password: user_password}).subscribe(data => {
            this.token = data.data.token;
            this.id = data.data.id;
            this.type = data.data.type;
            this.actived = data.data.actived;
            this.deleted = data.data.deleted;
            resolve(data);
            console.log(data);
            async err => {
              console.log(err);
              const alert = await this.alertController.create({
                header: 'Error de inicio de sesión',
                message: 'Ha habido un error al iniciar sesión, vuelva a intentarlo más tarde.',
                buttons: ['Aceptar'],
              });
              await alert.present();
              return;
            }
          })
      })
  }

  register(user_firstname: string, user_secondname: string, user_email: string, user_password: string, user_c_password: string) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/register', {
        firstname: user_firstname,
        secondname: user_secondname,
        email: user_email,
        password: user_password,
        c_password: user_c_password}).subscribe(data => {
          console.log(data);
          resolve(data);
          async err => {
            const alert = await this.alertController.create({
              header: 'Error de registro',
              message: 'Ha habido un error al registrar el usuario, vuelva a intentarlo más tarde.',
              buttons: ['Aceptar'],
            });
            await alert.present();
            return;;
          }
        })
    })
    
  }

  loadUsers() {
    return new Promise<any>(resolve => {
      this.http.get(this.apiUrl + '/users',{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      }).subscribe(data => {
        resolve(data);
        console.log(data);
        async err => {
          const alert = await this.alertController.create({
            header: 'Error de carga',
            message: 'Ha habido un error al cargar los datos de los usuarios, vuelva a intentarlo más tarde.',
            buttons: ['Aceptar'],
          });
          await alert.present();
          return;;
        }
      })
    })
  }

  async activate_user(id: number, email_confirmed: number) {
    if(email_confirmed == 1){
      return new Promise(resolve => {
        this.http.post(this.apiUrl + '/activate',
        {
          user_id: id
        },
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
        }).subscribe(data => {
          resolve(data);
          console.log(data);
          async err => {
            const alert = await this.alertController.create({
              header: 'Error de activación',
              message: 'Ha habido un error al activar la cuenta, vuelva a intentarlo más tarde.',
              buttons: ['Aceptar'],
            });
            await alert.present();
            return;
          }
        })
      })
    }else {
      const alert = await this.alertController.create({
        header: 'Error de activación',
        message: 'Es necesario que el usuario confirme su email para activar su cuenta.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
  }

  deactivate_user(id: number) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/deactivate',
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      }).subscribe(data => {
        resolve(data)
        console.log(data);
        async err => {
          const alert = await this.alertController.create({
            header: 'Error de desactivación',
            message: 'Ha habido un error al desactivar el usuario, vuelva a intentarlo más tarde.',
            buttons: ['Aceptar'],
          });
          await alert.present();
          return;
        }
      })
    })
  }

  delete_user(id: number) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/user/deleted/'+id,
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {resolve(data)
        console.log(data);
      async err => {
        const alert = await this.alertController.create({
          header: 'Error al eliminar usuario',
          message: 'Ha habido un error al eliminar el usuario, vuelva a intentarlo más tarde.',
          buttons: ['Aceptar'],
        });
        await alert.present();
        return;
      }
      })
    })
  }
}