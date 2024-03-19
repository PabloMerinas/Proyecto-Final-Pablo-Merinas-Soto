import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
