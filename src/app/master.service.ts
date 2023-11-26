import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//import { Customer } from "../model/customer";

@Injectable()
export class MasterService {
//    constructor(private http: HttpClient) {}
/*
    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>('http://localhost:3306/todos');
    }
*/
    getUsers() {
        return [
            { id: 1, name: 'Pisti', email: 'pisti@gmail.com' },
            { id: 2, name: 'Zoli', email: 'z@gmail.com' },
            { id: 3, name: 'Krisztián', email: 'kriz@gmail.com' },
            { id: 44, name: 'Krisztina', email: 'kriszti@gmail.com' },
            { id: 32, name: 'Antal', email: 'anti@gmail.com' },
            { id: 7, name: 'Géza', email: 'geza@gmail.com' }
        ];
    }
}