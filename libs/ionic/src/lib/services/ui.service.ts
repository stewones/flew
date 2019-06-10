import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable()
export class Ui {
  constructor(
    private alertCtrl: AlertController,
    public toastController: ToastController
  ) {}

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

  async say(something: string, duration = 2000) {
    const toast = await this.toastController.create({
      message: something,
      duration: duration
    });

    return toast;
  }
}
