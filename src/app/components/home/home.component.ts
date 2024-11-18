import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { StudentModel } from './student.module';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { AddDataComponent } from '../add-data/add-data.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  allstudent: any[] = [];
  constructor(private api: ApiService, private dlg: MatDialog) {
    this.api.getStudent().subscribe((res) => {
      this.allstudent = res;
    });
  }
  AllStudent() {
    this.api.getStudent().subscribe((res) => {
      this.allstudent = res;
    });
  }
  DeleteStudent(data: any) {
    this.api.deleteStudent(data.id).subscribe((res) => {
      alert('Record Deleted');
      this.AllStudent();
    });
  }

  onAdd(data: any) {
    const dialogRef = this.dlg.open(AddDataComponent, {
      disableClose: true,
      data: data,
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.AllStudent();
    });
  }
}
