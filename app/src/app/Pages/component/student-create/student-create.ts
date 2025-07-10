import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/StudentsServices';

@Component({
  selector: 'app-student-create',
  imports: [],
  templateUrl: './student-create.html',
  styleUrl: './student-create.css'
})
export class StudentCreate implements OnInit {
students: Student[] = [];
constructor(private student: UserService){}
 
ngOnInit(): void {
  this.getStudent();
  }

getStudent(){
  this.student.getStudent().subscribe((data: Student[]) => {
    this.students = data;
  })
}
}
