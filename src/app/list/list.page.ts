import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  items: Item[] = [];
  constructor(private itemService: ItemsService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.itemService.getItems().subscribe(res => {
      this.items = res;
    }, err => {
      alert('Error al hacer el get');
      console.log(err);
    });
  }

  new(){
    this.router.navigate(['item']);
  }

  edit(item: Item){
    this.router.navigateByUrl('/item?id=' + item._id);
  }
}
