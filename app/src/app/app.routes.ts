import { Routes } from '@angular/router';
import { StudentCreate } from './Pages/component/student-create/student-create';
import { StudentListComponent } from './Pages/component/student-list/student-list';
import { StudentSearch } from './Pages/component/student-search/student-search';
import { StudentUpdate } from './Pages/component/student-update/student-update';

export const routes: Routes = [
    {path:'', component: StudentListComponent },
    {path:'Add', component: StudentCreate },
    {path: 'Search', component: StudentSearch },
    {path: 'Update', component: StudentUpdate }
]
