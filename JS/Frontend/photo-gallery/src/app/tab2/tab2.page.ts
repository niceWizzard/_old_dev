import { Component, OnInit } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService, UserPhoto } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(public photoService: PhotoService,
    private actionSheet: ActionSheetController
    
    ) {}
  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhoto() {
    this.photoService.addNewToGallery();
  }

  async showActionSheet(photo: UserPhoto, position: number) {
   const h  = await this.actionSheet.create({
      header: "Photos",
      buttons: [
        {
          text: "Delete",
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePhoto(photo, position)
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: 'cancel',
        },
      ]
    })

    h.present();
  }

}
