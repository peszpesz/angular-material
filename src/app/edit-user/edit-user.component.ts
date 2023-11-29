import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData } from '../interface/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [this.data.name, [Validators.required]],
      email: [this.data.email, [
        Validators.required,
        Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]]
    });  
  }

  form: FormGroup;

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.data.name = this.form.value.name;
    this.data.email = this.form.value.email;
    this.dialogRef.close(this.data);
  }
}
