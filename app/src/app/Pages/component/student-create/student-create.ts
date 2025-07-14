import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../Services/StudentsServices';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../../Services/StudentsServices';

import { CommonModule } from "@angular/common";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { UserService } from "../../../Services/StudentsServices";

// @Component({
//   selector: 'app-student-create',
//   imports: [],
//   templateUrl: './student-create.html',
//   styleUrl: './student-create.css'
// })
// export class StudentCreate implements OnInit {
// students: Student[] = [];
// constructor(private student: UserService){}
 
// ngOnInit(): void {
//   this.getStudent();
//   }

// getStudent(){
//   this.student.getStudent().subscribe((data: Student[]) => {
//     this.students = data;
//   })
// }
// }

@Component({
  selector: 'app-student-create',
   imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [UserService],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './student-create.html',
  styleUrl: './student-create.css',
})
export class StudentCreate implements OnInit {
form!: FormGroup;
  showAddModal = false;


  @Output() created = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private studentService: UserService,
    private formBuilder: FormBuilder, private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      score: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      grade: [{ value: '10', disabled: true }],
    });
  form!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  showConfirmation: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  constructor(
    private studentService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      score: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      grade: [{ value: '10', disabled: true }],
    });
  }

  getNewStudent(): void {
    if (this.form.valid) {
      const studentData = this.form.value;

      console.log(studentData);

      this.studentService.createStudent(studentData).subscribe({
        next: (res) => {
          console.log('Student created', res);
          this.form.reset({ name: '', score: '', grade: '10' });
          this.created.emit();
          this.close.emit();
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
    }
  }
  
  navigateToMain(){
    return this.router.navigate(['/students']);
  }
  
  resetAddStudentForm(){
    this.form.reset({name: '', score: '', grade: '10'});
  }

   closeModal() {
    this.showAddModal = false;
  
  }
}

  getNewStudent(): void {
    if (this.form.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const studentData = this.form.value;
    console.log('Submitting:', studentData);

    this.studentService.createStudent(studentData).subscribe({
      next: (res) => {
        console.log('Student created!', res);
        this.form.reset({ grade: '10' });
        this.created.emit();
        this.close.emit();
        this.isLoading = false;
        this.showConfirmation = true;
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = this.getErrorMessage(err);
        this.isLoading = false;
      },
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  private getErrorMessage(error: any): string {
    if (error.status === 400) {
      return 'Validation failed: Please check your inputs';
    }
    if (error.error?.message) {
      return error.error.message;
    }
    return 'Failed to create student. Please try again.';
  }

  onCancel(): void {
    this.close.emit();
  }

  goToMainPage() {
    this.router.navigate(['/students']);
  }

  onReset() {
    this.form.reset({ name: '', score: '', grade: '10' });
  }

  onYes(): void {
    this.form.reset({ grade: '10' });
    this.showConfirmation = false;
  }

  onNo(): void {
    this.showConfirmation = false;
    this.goToMainPage();
  }
}