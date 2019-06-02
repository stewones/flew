import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class Ui {
  constructor(private alertCtrl: AlertController) {}

  // https://ionicframework.com/docs/api/alert
  async alert(title = '', subtitle = '', message = '', buttons = ['Ok']) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subtitle,
      message: message,
      buttons: buttons
    });

    return alert;
  }
}
