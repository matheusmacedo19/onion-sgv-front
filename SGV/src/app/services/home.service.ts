import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  baseUrl: string = "https://localhost:44322/api";

  uploadFile(formData : FormData){
    const url = this.baseUrl+"/home";

    this.http.post(url, formData)
    .subscribe((res: any)=>{
      alert('Upload de arquivo realizado com sucesso!');
    });
    
  }
}
