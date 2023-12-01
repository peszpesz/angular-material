import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  animal!: string;
  name!: string;
  isClicked: boolean = false;
  rizsa: string[] = [
    'Welcome to my first Angular Material project.',
    'I hope you enjoy surfing around.'
  ];

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        name: this.name,
        animal: this.animal
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  onClickme() {
    this.isClicked = !this.isClicked;
  }
}
