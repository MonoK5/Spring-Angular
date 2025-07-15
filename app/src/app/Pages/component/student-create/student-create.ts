import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../Services/StudentsServices';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  // HTML tag name for this component 
  selector: 'app-student-create',
   imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [UserService],
  templateUrl: './student-create.html',
  styleUrls: ['./student-create.css']
})
export class StudentCreate implements OnInit {

  // Reactive form group (exclamation mark indicates it will be initialized later)
form!: FormGroup;
// Boolean to control modal visibility
  showAddModal = false;
  //  Boolean to show confirmation dialog
  showConfirmation: boolean = false;

// Allow parent components to listen for when a student is created or modal is closed
  @Output() created = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();


  constructor(
    // For API calls
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
           this.showConfirmation = true;
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

  onYes(): void {
    this.form.reset({ grade: '10' });
    this.showConfirmation = false;
  }

  onNo(): void {
    this.showConfirmation = false;
    this.navigateToMain();
  }
}