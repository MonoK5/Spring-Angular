import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../Services/StudentsServices';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-create',
   imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [UserService],
  templateUrl: './student-create.html',
  styleUrl: './student-create.css'
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
