import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  formItems: FormGroup;
  id: string;

  constructor(private fb: FormBuilder,
              private httpClient: HttpClient,
              private router: Router,
              private itemsService: ItemsService,
              private route: ActivatedRoute) {

    this.formItems = this.fb.group({
      title: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });

    this.route.queryParams.subscribe(params => {
      console.log(params);

      if (params.id){
        this.id = params.id;
        this.itemsService.getSingleItem(params.id).subscribe(item => {
          this.formItems.get('title').setValue(item.title);
          this.formItems.get('quantity').setValue(item.quantity);
        });
      }
    });
   }

  ngOnInit() {
  }

  save(){
    let item = new Item();
    item.quantity = this.formItems.get('quantity').value;
    item.title = this.formItems.get('title').value;

    if (this.id){
      this.itemsService.updateItem(item).subscribe(res => {
        this.cleanAndNavigate();
      }, err => {
        alert('Error al actualizar');
        console.log(err);
      });
    }
    else
    {
      this.itemsService.saveItem(item).subscribe(res => {
        this.cleanAndNavigate();
      }, err => {
        alert('Ocurrio un error al guardar el item');
        console.log(err);
      });
    }
  }

  delete(){
    if (this.id){
      this.itemsService.deleteItem(this.id).subscribe(res => {
        alert('Elemento borrado');
        this.cleanAndNavigate();
      }, err => {
        alert('Error al borrar');
        console.log(err);
      });
    }
  }

  cleanAndNavigate(){
    this.formItems.get('title').setValue('');
    this.formItems.get('quantity').setValue('');
    this.router.navigate(['list']);
  }
}
