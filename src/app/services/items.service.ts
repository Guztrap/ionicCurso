import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private isLoading: Subject<boolean> = new Subject<boolean>();
  items: Item[] = [];
  endpoint = 'https://crudcrud.com/api/6a181d39979f4d1eba1f5e61d1496afa/items';

  constructor(private httpClient: HttpClient) { }

  setisLoading(loading: boolean){
    this.isLoading.next(loading);
  }

  getIsLoading(){
    return this.isLoading.asObservable();
  }


  saveItem(item: Item){
    let itemForService = {
      title: item.title,
      quantity: item.quantity.toString(),
      image: item.image
    };

    return this.httpClient.post(this.endpoint, itemForService);
  }

  getItems(){
    return this.httpClient.get<[Item]>(this.endpoint);
  }

  getSingleItem(id: string){
    return this.httpClient.get<Item>(this.endpoint + '/' + id);
  }

  updateItem(item: Item){
    let itemForService = {
      title: item.title,
      quantity: item.quantity.toString(),
      item: item.image
    };

    return this.httpClient.put(this.endpoint + '/' + item._id, itemForService);
  }

  deleteItem(id: string){
    return this.httpClient.delete(this.endpoint + '/' + id);
  }
}
