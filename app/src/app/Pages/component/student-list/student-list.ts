import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentListComponent implements OnInit {
  
  
  students: Student[] = [];

  constructor(private studentService: ) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }
}


