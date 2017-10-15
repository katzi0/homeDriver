import { Component } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Item { name: string;}
export interface ItemId extends Item { id: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  private itemDoc:AngularFirestoreDocument<any>;
  private itemsCollection:AngularFirestoreCollection<any>;
  items:Observable<ItemId[]>;
  item:Observable<any>;

  constructor(db: AngularFirestore){
    // this.items = db.collection('items').valueChanges();
    this.itemDoc = db.doc<any>('items/0KIuoLtXwwvadhSN9dAz');
    this.itemsCollection = db.collection<Item>('items');
    this.items = this.itemsCollection.snapshotChanges().map(a => {
      return a.map(b => {
        const data = b.payload.doc.data() as Item;
        const id = b.payload.doc.id;
        console.log(data,id);
        return { id,...data};
      })
    }) ;
    this.item = this.itemDoc.valueChanges();
  }
  update(item:ItemId){
    this.itemsCollection.doc(item.id).update({name:"beni"});
    // item.name = "shai";
    // this.itemDoc.update(item);
  }
  addItem(item){
    console.log("item: "+item);
    this.itemsCollection.add(item);
  }
  title = 'app works!';
}
