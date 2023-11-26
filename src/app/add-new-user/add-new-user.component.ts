import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData } from '../interface/user';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent {
  constructor(
    public dialogRef: MatDialogRef<AddNewUserComponent>
  ) { }

  newUser: UserData = {
    id: 0,
    name: '',
    email: ''
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
