import { Component } from '@angular/core';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.scss']
})
export class MiscComponent {
  isChecked: boolean = true;
  colors = [
    { id: 1, name: 'piros', col: 'red' },
    { id: 2, name: 'zöld', col: 'green' },
    { id: 3, name: 'kék', col: 'blue' },
    { id: 4, name: 'tutilila', col: 'purple' },
  ]
  initialColor = 0;
  minDate = new Date(2017, 1, 1);
  maxDate = new Date(2017, 8, 30);
  categories = [
    { name: 'Kezdő', selected: true, color: 'warn', disabled: false },
    { name: 'Középhaladó', selected: true, color: 'warn', disabled: false },
    { name: 'Haladó', selected: true, color: 'warn', disabled: false },
    { name: 'Profi', selected: false, color: 'warn', disabled: true }
  ];
  progress = 0;
  timer: any;
  megNemKezdodhet = false;

  onChange($event: any) {
    console.log('változott: ', $event);
  }

  onClick() {
    this.megNemKezdodhet = true;
    this.progress = 0;
    this.timer = setInterval(() => {
      this.progress++;
      if (this.progress == 100) {
        clearInterval(this.timer);
        this.megNemKezdodhet = false;
      }
    }, 50);
  }
}

