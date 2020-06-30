import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { createProduct, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = this.afs.collection<Product>('products');
  }

  getAll(): Observable<Product[]> {
    return this.productsCollection.valueChanges();
  }

  add(name: string, price: number) {
    const id = this.afs.createId();
    const product = createProduct({ id, name, price });
    this.productsCollection.doc(id).set(product);
  }

  deleteAll() {
    this.productsCollection.ref
      .get()
      .then((e) => e.docs.forEach((doc) => doc.ref.delete()));
  }

  // update(id: string, title: string) {
  //   this.productsCollection
  //     .doc(id)
  //     .update({ title })
  //     .then(() => {
  //       this.todosStore.update(id, { title });
  //     });
  // }
}
