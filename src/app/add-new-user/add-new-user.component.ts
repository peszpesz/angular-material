import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent {
  constructor(
    public dialogRef: MatDialogRef<AddNewUserComponent>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      email: ['', [
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
    this.dialogRef.close(this.form.value);
  }
}
