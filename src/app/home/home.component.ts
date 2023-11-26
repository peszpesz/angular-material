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
}
