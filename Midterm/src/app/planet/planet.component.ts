import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  constructor(private api: ApiService) { }
  public planet = [];
  ngOnInit() {
    console.log('In planet');
    this.planet.push(this.api.getData());
    console.log(this.planet);
  }

}
