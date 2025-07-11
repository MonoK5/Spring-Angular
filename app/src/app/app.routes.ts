import { Routes } from '@angular/router';
import { StudentCreate } from './Pages/component/student-create/student-create';
import { StudentListComponent } from './Pages/component/student-list/student-list';
import { StudentSearch } from './Pages/component/student-search/student-search';
import { StudentUpdate } from './Pages/component/student-update/student-update';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'students/create', component: StudentCreate },
  { path: 'students/search', component: StudentSearch },
  { path: 'students/pdate', component: StudentUpdate },
];
