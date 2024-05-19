import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatIconModule,MatButtonModule,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  ImportFile(){

  }
}
