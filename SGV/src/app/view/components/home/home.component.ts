import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { DownloadService } from '../../../services/download.service';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { HomeService } from '../../../services/home.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatIconModule,MatButtonModule,RouterOutlet,NgxFileDropModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public file!: NgxFileDropEntry;
  constructor(private downloadService: DownloadService, private homeService : HomeService){}

  downloadFile(){
    const url = 'assets/files/Planilhateste.xlsx';
    this.downloadService.downloadFile(url);
    alert('Download de Planilha realizado');
  }
  importFile(){

  }
  onChangeFile(event : any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      
      const formData = new FormData()
      formData.append('file', file);
      this.homeService.uploadFile(formData);
    }
  }
}
