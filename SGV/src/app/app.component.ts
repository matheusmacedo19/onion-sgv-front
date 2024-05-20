import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NavComponent } from './view/components/templates/nav/nav.component';
import { SpinnerComponent } from './view/components/templates/spinner/spinner.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, NavComponent, SpinnerComponent],
  templateUrl:'app.component.html'
})
export class AppComponent {
  title = 'SGV';
}
