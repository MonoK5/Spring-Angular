import { Routes } from '@angular/router';
import { StudentCreate } from './Pages/component/student-create/student-create';
<<<<<<< HEAD
import { StudentList } from './Pages/component/student-list/student-list';
import { StudentSearch } from './Pages/component/student-search/student-search';
import { StudentUpdate } from './Pages/component/student-update/student-update';

export const routes: Routes = [
    {path:'', component: StudentList },
    {path:'Add', component: StudentCreate },
    {path: 'Search', component: StudentSearch },
    {path: 'Update', component: StudentUpdate }
=======
import { StudentListComponent } from './Pages/component/student-list/student-list';

export const routes: Routes = [
    {path:'', component: StudentCreate },
    {path:'list',component: StudentListComponent}
>>>>>>> 6d2efd6efa9a68c533bd3cf017d11390442cf4fe
];
