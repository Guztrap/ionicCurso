import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private itemService: ItemsService) {}

  goToAdd(){
    this.itemService.setisLoading(true);
    this.router.navigate(['item']);
  }

}
