import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
Notes: string = '';
submit = false;
  constructor(private authService: AuthService, public modalController: ModalController) { }

  ngOnInit() {}


  addNote(){
    this.submit = true;
if(this.Notes != ''){
  this.authService.addNote({note:this.Notes}).subscribe((res)=>{
    this.modalController.dismiss(true)
  })
}

  }

  cancel(){
    this.modalController.dismiss(false)
  }
}
