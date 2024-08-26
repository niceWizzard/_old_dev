import { Component, OnInit } from '@angular/core';
import { DropdownLink } from './dropdown-link/dropdown-link.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private readonly INVALID_CLASSNAMES_FOR_NAV = ['backdrop', 'nav-link', "dropdown-link"];

  constructor() {}

  isNavHidden = true;

  links: DropdownLink[] = [
    {
      name: "Tags",
      route: "settings/tags"
    }
]

  ngOnInit(): void {}

  openNav() {
    this.isNavHidden = false;
  }

  closeNav() {
    this.isNavHidden = true;
  }

  onInsideNavClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const newLocal = this.INVALID_CLASSNAMES_FOR_NAV.filter((v) =>
      target.classList.contains(v)
    );
    if (newLocal.length > 0) {
      this.isNavHidden = true;
    }
  }
}
