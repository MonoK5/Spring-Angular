
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../Services/StudentsServices';
@Component({
  selector: 'app-student-update',
   standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [UserService],
  templateUrl: './student-update.html',
  styleUrls: ['./student-update.css']
})
export class StudentUpdate {

  form!: FormGroup;
  students: Student[] = [];
  selectedStudent: Student | null = null;
  message: string = '';
  showConfirmation = false; 
  showUpdateForm = false

  @Output() created = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

   /**
   * Injects StudentService for backend API calls.
   * @param studentService 
   */
  constructor(
    private studentService: UserService,
  ) {}

  /**
   *  Methods below
   */
  /**
   * @param student Student object to be load
   * Lifecycle hook called once after component initialization.
   * @returns void
   * The reactive form's controls (id, name, score, and grade) are initialized.
   * loads every student from the database and keeps them in the students array.
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      score: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      grade: new FormControl({ value: '10', disabled: true }, [
        Validators.required,
      ]),
    });

    this.studentService.getStudent().subscribe((data) => {
      this.students = data;
    });
  }
 /**
  * 
  * @param student 
  * @returns
  * Sets selectedStudent to the chosen student.
  * Fills form fields with the student’s existing data using patchValue
  */
  loadStudentToForm(student: Student) {
    this.selectedStudent = student;
    this.form.patchValue({
      id: student.id,
      name: student.name,
      score: student.score,
      grade: student.grade,
    });
  }

  /**
   * 
   * @param studentId 
   * @returns
   * Finds a student in students array by ID.
   * If found, loads data into form. If not, resets the form.
   */
  onStudentSelect(studentId: string) {
    const selected = this.students.find((s) => s.id == +studentId);
    if (selected) {
      this.loadStudentToForm(selected);
      this.message = ''; 
    } else {
      this.form.reset({ name: '', score: '', grade: '10' });
      this.selectedStudent = null;
      this.message = '';
    }
  }
 /**
  * 
  * @param event 
  * Handles change event on a <select> element in your template.
  * Extracts selected value and calls onStudentSelect().
  */
  onStudentSelectEvent(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.onStudentSelect(value);
  }

  /**
   * 
   * @returns 
   * Checks if form is valid and a student is selected.
   * Gets form values (even disabled fields) using getRawValue().
   * Checks if any changes were made; if not, shows message.
   * Calls updateStudent() in service to update the backend.
   * On success: Sets success message
   * On error: Shows error message.
   */
onSubmit() {
  if (this.form.valid && this.selectedStudent) {
    const studentData = this.form.getRawValue();

    const hasChanged =
      studentData.name !== this.selectedStudent.name ||
      studentData.score !== this.selectedStudent.score;

    if (!hasChanged) {
      this.message = 'No changes detected. Student data not updated.';
      return;
    }

    this.studentService.updateStudent(studentData.id, studentData).subscribe({
      next: () => {
        console.log('Student updated successfully');

        this.message = 'Student updated successfully.';
        this.created.emit();
      
      },
      error: (error) => {
        console.error('Error updating student:', error);
        this.message = 'Error occurred while updating student.';
      },
    });
  }
}




}


