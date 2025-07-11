import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from '../../../Services/StudentsServices';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentListComponent implements OnInit {
delete(arg0: number|undefined) {
throw new Error('Method not implemented.');
}
  
  
  students: Student[] = [];

  constructor(private studentService: UserService ) {}

  ngOnInit(): void {
    this.getStudent()
  }

  getStudent(){
        this.studentService.getStudent().subscribe((data: Student[]) => {
      this.students = data;
    });
  }
  deleteStudent(id: any): void {
  if (confirm('Are you sure you want to delete this student?')) {
    this.studentService.deleteStudent(id).subscribe(()=> {
      this.getStudent();
    })
  }
}

}


