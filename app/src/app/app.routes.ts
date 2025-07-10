import { Routes } from '@angular/router';
import { StudentCreate } from './Pages/component/student-create/student-create';
import { StudentListComponent } from './Pages/component/student-list/student-list';

export const routes: Routes = [
    {path:'', component: StudentCreate },
    {path:'list',component: StudentListComponent}
];
