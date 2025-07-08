import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { students} from "../model/students.model";


@Injectable({
    providedIn: "root"
})
export class UserService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getStudent(): Observable<students[]>{
        return this.http.get<students[]>(this.apiUrl+"/api/students")
    }

    getStudentById(id: number): Observable<students>{
        return this.http.get<students>(this.apiUrl+${this.apiUrl}/api/students/${id})
    }

    createStudent(students: FormData): Observable<any>{
        return this.http.post(this.apiUrl+"/api/students", students)
    }

    updateStudent(id: number, students: FormData): Observable<any>{
        return this.http.put(${this.apiUrl}/api/students/${id}, students)
    }

    deleteStudent(id: number): Observable<any>{
        return this.http.delete(${this.apiUrl}/api/students/${id})
    }
}