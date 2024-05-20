import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http : HttpClient) { }

  downloadFile(url : string){
    this.http.get(url,{
      responseType: 'blob'
    }).subscribe((r)=>{
      saveAs(r,'planilhamodelo.xlsx');
    });
  }
}
