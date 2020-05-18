import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  formItems: FormGroup;
  count = 0;
  objDict = {};

  constructor(private fb: FormBuilder) {
    this.formItems = this.fb.group({
      item: ['', Validators.required],
      count: ['', [Validators.required, Validators.min(1)]]
    });

    this.objDict = {};
   }

  ngOnInit() {
  }

  addCount(){
    this.count = this.formItems.get('count').value;
    let item = this.formItems.get('item').value;

    if (item in this.objDict) {
      this.count = this.objDict[item] + this.formItems.get('count').value;
    }

    this.objDict[item] = this.count;
    console.log(this.objDict);
  }

}
