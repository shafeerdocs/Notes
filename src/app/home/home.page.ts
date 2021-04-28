import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AddNoteComponent } from './add-note/add-note.component'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  notes: any = [];
  constructor(public modalController: ModalController, private authService: AuthService) {}

  ngOnInit(){
  }
  ionViewDidEnter(){
    this.getNote()
  }
 async addNote(){
    const modal = await this.modalController.create({
      component: AddNoteComponent,
      cssClass: 'my-custom-modal-css',
      backdropDismiss:false,
      componentProps: { isUpadte: false }
    });
    modal.onDidDismiss().then(res => {
      if(res){
        this.getNote()
      }
    })
    return await modal.present();
  }
  logout() {
    this.authService.logout();
  }

  getNote(){
    this.authService.getNote().subscribe((res)=>{
      this.notes = res;
      })
  }

  delete(note){
this.authService.deleteNote(note._id).subscribe((res)=>{
  this.getNote()
})
  }

  async update(note){
    const modal = await this.modalController.create({
      component: AddNoteComponent,
      cssClass: 'my-custom-modal-css',
      backdropDismiss:false,
      componentProps: { isUpadte: true ,updateNote: note }
    });
    modal.onDidDismiss().then(res => {
      if(res){
        this.getNote()
      }
    })
    return await modal.present();
      }
}
