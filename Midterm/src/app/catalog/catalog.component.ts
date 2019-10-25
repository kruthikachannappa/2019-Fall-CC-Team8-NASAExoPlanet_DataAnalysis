import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public items = [];
  constructor(private router: Router, private api: ApiService) { }
  goPlanet(planet) {
    this.api.setData(planet);
    this.router.navigateByUrl('/planet');
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  generateImg() {
    const rnd = this.getRandomInt(0, 5);
    let img;
    if (rnd <= 1) { img = '../../assets/img/hot.jpg'; } else if (rnd > 1 && rnd <= 3) { img = '../../assets/img/blue.jpg'; } else if (rnd > 3 && rnd <= 4) { img = '../../assets/img/black.jpg'; } else {
      img = '../../assets/img/gold.jpg';
    }
    return img;
  }
  ngOnInit() {
    this.api.getConfirmedPlanets()
        .subscribe(res => {
          this.items = res;
          this.items.forEach(obj => {
            obj.img = this.generateImg();
          });
        }, err => {
          console.log(err);
        });
  }
}

