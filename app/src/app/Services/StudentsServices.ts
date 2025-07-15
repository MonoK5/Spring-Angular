import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { enviroment } from "../env/enviroment";


@Injectable({
    providedIn: "root"
})
export class UserService {
    private apiUrl = enviroment.apiUrl;

    constructor(private http: HttpClient) {}

    getStudent(): Observable<Student[]>{
        return this.http.get<Student[]>(this.apiUrl+"/api/students")
    }

    getStudentById(id: number): Observable<Student>{
        return this.http.get<Student>(this.apiUrl+`${this.apiUrl}/api/students/${id}`)
    }

    createStudent(students: FormData): Observable<any>{
        return this.http.post(this.apiUrl+"/api/students", students)
    }

      updateStudent(students: Student): Observable<any>{
        return this.http.put(`${this.apiUrl}/api/students/${students.id}`, students)
    }

    deleteStudent(id: number): Observable<any>{
        return this.http.delete(`${this.apiUrl}/api/students/${id}`)
    }

    getStudentByName(name: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/api/students/name/${name}`)
  }

  calculateStudentAvg(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/students/average`)
  }
}