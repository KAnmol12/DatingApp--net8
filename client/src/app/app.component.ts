import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http =inject(HttpClient);
  title = 'DatingApp';
  users: any;
anmoluser: any;
AnmolUsers: any;
  usersList: any [] = [];
  
  //constructor(private httpClient: HttpClient){ }
  ngOnInit(): void {
    this.http.get("https://localhost:5001/api/anmoluser").subscribe( (res: any) => {

      this.usersList = [];
      this.usersList = res;
      console.log(this.usersList);

      // next: response => this.users = response,
      
      // error: error => console.log(error),
      
      // complete: () => console.log('Request has completed')
  })
 }
}
