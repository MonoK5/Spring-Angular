import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from '../../../Services/StudentsServices';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentUpdate } from '../student-update/student-update';
import { StudentSearch } from '../student-search/student-search';
import { StudentCreate } from "../student-create/student-create";
UserService 
@Component({
  selector: 'app-student-list',
    standalone: true,
  imports: [CommonModule, RouterModule, StudentCreate, StudentUpdate, StudentSearch, StudentCreate],
  providers: [UserService],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentListComponent implements OnInit {
delete(arg0: number|undefined) {
throw new Error('Method not implemented.');
}
  

  students: Student[] = [];
  totalStudent: number = 0;
  showAddModal = false;
  showUpdateModal = false;
  showSearchModal = false;
  showUpdateSuccess = false;
  averageScore: number = 0;
  message: string = '';
  studentToDeleteId: number | null = null;
  showDeleteConfirmation: boolean = false; 

  constructor(private studentService: UserService) {}

  ngOnInit(): void {
    this.getStudentsData();
  }

getStudentsData() {
  this.studentService.getStudent().subscribe((data: Student[]) => {
    this.students = data;
    this.totalStudent = this.students.length;
    this.averageScore = this.calculateAverage(this.students);
  });
}


  calculateAverage(students: Student[]): number {
    const total = students.reduce((sum, student) => sum + student.score, 0);
    return students.length ? total / students.length : 0;
  }

  openAddModal(){
    this.showAddModal = true;
  }

  openUpdateModal() {
    this.showUpdateModal = true;
  }

  openSearchModal() {
    this.showSearchModal = true;
  }

  closeModal() {
    this.showAddModal = false
    this.showUpdateModal = false;
    this.showSearchModal = false;
  }

  updateStudent() {
   this.closeModal();
    this.getStudentsData();
    this.showUpdateSuccess = true;
  }

  handleSuccessClose() {
  this.showUpdateSuccess = false;
  this.closeModal();
}

confirmDelete(id: number): void {
    this.studentToDeleteId = id;
    this.showDeleteConfirmation = true;
  }

 deleteConfirmed(): void {
    if (this.studentToDeleteId != null) {
      this.studentService.deleteStudent(this.studentToDeleteId).subscribe({
        next: () => {
          console.log('Student deleted successfully');
          this.getStudentsData();
          this.showDeleteConfirmation = false;
          this.studentToDeleteId = null;
        },
        error: () => {
          this.message = 'Error deleting student';
          this.showDeleteConfirmation = false;
          this.studentToDeleteId = null;
        }
      });
    }
  }
  cancelDelete(): void {
    this.showDeleteConfirmation = false;
    this.studentToDeleteId = null;
  }
  onDelete(id: number): void {
  const confirmed = window.confirm('Are you sure you want to delete this student?');

  if (confirmed) {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        console.log('Student deleted successfully');
        this.getStudentsData(); 
      },
      error: () => {
        this.message = 'Error deleting student';
      }
    });
  }
}
}

