import { Component } from '@angular/core';
import { navbarData } from './nav.data';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  navData = navbarData;

}
