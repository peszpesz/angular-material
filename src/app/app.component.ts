import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {
  }

  title!: string;
  date = new Date();
  napok = [
    'vasárnap',
    'hétfő',
    'kedd',
    'szerda',
    'csütörtök',
    'péntek',
    'szombat'
  ];

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        let rt = this.getChild(this.activatedRoute)

        rt.data.subscribe(data => {
          this.title = data['title'];
          this.titleService.setTitle(data['title']);
        })
      })
      console.log(this.date);
  }

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
