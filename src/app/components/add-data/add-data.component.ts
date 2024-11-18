import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MaxLengthValidator,
  Validators,
} from '@angular/forms';
import { StudentModel } from '../home/student.module';
import { ApiService } from '../../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css',
})
export class AddDataComponent {
  addForm!: FormGroup;
  allstudent: any[] = [];
  userData: [] = [];
  submit = false;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDataComponent>
  ) {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      class: ['', [Validators.required]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
    if (this.data?.id) {
      this.addForm.patchValue(this.data);
    }
  }
  get form() {
    return this.addForm.controls;
  }
  onSave() {
    if (this.submit) {
      return;
    }
    if (this.addForm.invalid) {
      return;
    }
    const frmVal = this.addForm.value;
    const postData: any = {
      name: frmVal.name,
      email: frmVal.email,
      class: frmVal.class,
      address: frmVal.address,
      mobile: frmVal.mobile,
    };

    console.log(postData);
    if (this.data?.id) {
      postData.id = this.data.id;
    }
    this.submit = true;
    this.api.postStudent(postData).subscribe({
      next: (res: any) => {
        this.data = res;
        console.log(this.data);
        alert(`Added successfully`);
        this.addForm.reset();
        this.dialogRef.close(res);
      },
    });
  }

  AllStudent() {
    this.api.getStudent().subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
  }

  onUpdate() {
    const frmVal = this.addForm.value;
    const postData: any = {
      name: frmVal.name,
      email: frmVal.email,
      class: frmVal.class,
      address: frmVal.address,
      mobile: frmVal.mobile,
    };
    this.api.updateStudent(postData, this.data.id).subscribe((res) => {
      console.log(res);
      alert('Data Updated');
      this.addForm.reset();
      this.dialogRef.close(res);
      this.AllStudent();
    });
  }
}
