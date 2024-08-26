import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router : Router) { }

  isNavOpen = false;

  renderNav = true;

  @HostListener('document:click', ['$event.target'])
  onClick(e: HTMLElement) {
    if(!this.isNavOpen) {return}
    const clickedOnBg = e.classList.contains('nav-bg-hider');
    this.isNavOpen = !clickedOnBg && e.nodeName != "A"
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => {
          let route = this.activatedRoute;
  
          while (route.firstChild) {
              route = route.firstChild;
          }
          
          return route.snapshot.data;
      }),
    )
    .subscribe(v => this.renderNav = !v['hideNav'])

  }

  openNav() {
    this.isNavOpen = true;
  }

}
