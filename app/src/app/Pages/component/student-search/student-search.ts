import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../Services/StudentsServices';

@Component({
  selector: 'app-student-search',
   imports: [CommonModule, RouterModule, FormsModule],
  providers: [UserService],
  templateUrl: './student-search.html',
  styleUrls: ['./student-search.css']
})
export class StudentSearch {
 
  student: Student[] = [];
  showUpdateModal = false;
  searchStudent = '';
  showError = false;
  searchTriggered = false;

  
  constructor(private studentService: UserService) {}

 
  ngOnInit(): void {}

 
  getStudentByName(): void {
    this.searchTriggered = true;

    if (this.searchStudent.trim()) {
      this.studentService.getStudentByName(this.searchStudent).subscribe((data: Student[]) => {
        this.student = data;
        this.showError = data.length === 0;
      });
    } else {
      this.student = [];
      this.showError = true;
    }
  }
}
