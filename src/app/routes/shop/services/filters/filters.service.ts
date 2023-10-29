import { Injectable } from '@angular/core';
import { IFiltersObject } from '../../interfaces/i-filters-object';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import {
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
  distinctUntilChanged,
  take,
} from 'rxjs';
import { IProduct } from 'src/app/components/product/interfaces/i-product.interface';
import { DocumentData } from '@angular/fire/firestore';
import { Query } from '@angular/fire/compat/firestore';
import { IPriceRange } from '../../interfaces/i-price-range.interface';
import _ from 'lodash';
import { TProduct } from '../../types/t-product.type';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private dbSubscription!: Subscription;

  constructor(private firestoreService: FirestoreService) {}

  public search(searchObject: IFiltersObject): Observable<IProduct[]> {
    const response: Subject<IProduct[]> = new Subject();
    const results: IProduct[] = [];

    if (this.dbSubscription) this.dbSubscription.unsubscribe();

    this.dbSubscription = this.queryDBForRelevantItems(searchObject)
      .pipe(distinctUntilChanged())
      .subscribe((ref) => {
        results.push(...ref);
        response.next(this.localFilter(results, searchObject));
      });
    return response;
  }

  private localFilter(
    products: IProduct[],
    searchObject: IFiltersObject
  ): IProduct[] {
    let response = products;

    if (searchObject.textSearch) {
      response = response.filter((product: IProduct) =>
        product.searchTitle.includes(searchObject.textSearch)
      );
    }

    if (searchObject.gameSelect) {
      response = response.filter((product: IProduct) =>
        product.tags.includes(searchObject.gameSelect)
      );
    }

    if (searchObject.priceRange) {
      response = response.filter(
        (product: IProduct) =>
          product.price >= searchObject.priceRange.min &&
          product.price <= searchObject.priceRange.max
      );
    }

    if (searchObject.types.length) {
      response = response.filter((product: IProduct) =>
        searchObject.types.includes(product.type)
      );
    }

    return _.uniqBy(response, 'id');
  }

  /**
   *
   * @description query the DB for products which include the search criteria
   *
   * @param {IFiltersObject} searchObject
   * @returns {Observable<IProduct>}
   */
  private queryDBForRelevantItems(
    searchObject: IFiltersObject
  ): Observable<IProduct[]> {
    const response: ReplaySubject<IProduct[]> = new ReplaySubject(3);

    if (searchObject.textSearch) {
      this.firestoreService
        .getFirestore()
        .collection<IProduct>('products', (ref) =>
          this.buildTitleSearchQuery(ref, searchObject.textSearch)
        )
        .valueChanges()
        .pipe(take(1))
        .subscribe((res) => response.next(res));
    }

    if (searchObject.gameSelect) {
      this.firestoreService
        .getFirestore()
        .collection<IProduct>('products', (ref) =>
          this.buildGameSearchQuery(ref, searchObject.gameSelect)
        )
        .valueChanges()
        .pipe(take(1))
        .subscribe((res) => response.next(res));
    }

    if (searchObject.priceRange) {
      this.firestoreService
        .getFirestore()
        .collection<IProduct>('products', (ref) =>
          this.buildPriceRangeQuery(ref, searchObject.priceRange)
        )
        .valueChanges()
        .pipe(take(1))
        .subscribe((res) => response.next(res));
    }

    if (searchObject.types.length) {
      this.firestoreService
        .getFirestore()
        .collection<IProduct>('products', (ref) =>
          this.buildTypesQuery(ref, searchObject.types)
        )
        .valueChanges()
        .pipe(take(1))
        .subscribe((res) => response.next(res));
    }

    return response;
  }

  /**
   * @param {Query<DocumentData>} ref
   * @param {string} searchTerm
   * @returns {Query<DocumentData>}
   */
  private buildTitleSearchQuery(
    ref: Query<DocumentData>,
    searchTerm: string
  ): Query<DocumentData> {
    return ref
      .orderBy('searchTitle')
      .startAt(searchTerm)
      .endAt(`${searchTerm}\uf8ff`);
  }

  /**
   * @param {Query<DocumentData>} ref
   * @param {string} gameSelect
   * @returns {Query<DocumentData>}
   */
  private buildGameSearchQuery(
    ref: Query<DocumentData>,
    gameSelect: string
  ): Query<DocumentData> {
    return ref.where('tags', 'array-contains', gameSelect);
  }

  /**
   * @param {Query<DocumentData>} ref
   * @param {IPriceRange} priceRange
   * @returns {Query<DocumentData>}
   */
  private buildPriceRangeQuery(
    ref: Query<DocumentData>,
    priceRange: IPriceRange
  ): Query<DocumentData> {
    return ref
      .where('price', '>=', priceRange.min)
      .where('price', '<=', priceRange.max);
  }

  private buildTypesQuery(
    ref: Query<DocumentData>,
    types: TProduct[]
  ): Query<DocumentData> {
    return ref.where('types', 'in', types);
  }
}
