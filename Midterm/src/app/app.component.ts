import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exoplanet';
  tabClick: any;
  constructor(  private router: Router) { }
  navClick(name) {
    this.tabClick = name;
    switch (name) {
      case 'Dashboard':
        this.router.navigateByUrl('/dashboard');
        break;
      case 'Catalog':
        this.router.navigateByUrl('/catalog');
        break;
      case  'Home':
        this.router.navigateByUrl('');
        break;
    }
  }
}
