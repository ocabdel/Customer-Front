import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  data: string = '';

  isMenuCollapsed : boolean = false;

  constructor(private _service: SearchService) { }

  ngOnInit(): void {
    this._service.currentMessage.subscribe(message => this.data = message);
  }

  ngOnChanges() {
    this._service.changeMessage(`From Sibling : ${this.data}`);
  }

  envoyerChangement() {
    this._service.changeMessage(this.data);
  }


}
