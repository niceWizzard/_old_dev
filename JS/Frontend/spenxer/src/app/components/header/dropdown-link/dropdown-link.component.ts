import { Component, Input, OnInit } from '@angular/core';

export interface DropdownLink {
  route: string;
  name: string;
}

@Component({
  selector: 'app-dropdown-link',
  templateUrl: './dropdown-link.component.html',
  styleUrls: ['./dropdown-link.component.scss']
})
export class DropdownLinkComponent implements OnInit {

  constructor() { }

  @Input() links!: DropdownLink[];
  @Input() name = "";

  showContent = false;

  ngOnInit(): void {
    if(this.links == null) {
      throw new Error("Links must be specified in the dropdown component!")
    }
  }

}
