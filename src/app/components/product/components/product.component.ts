import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../interfaces/i-product.interface';
import { addWeeks } from 'date-fns';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IGlobalVariables } from 'src/app/interfaces/i-global-variables.interface';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input({ required: true }) product!: IProduct;

  public newPeriod!: Timestamp;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService
      .getFirestore()
      .doc<IGlobalVariables>('siteData/globalVariables')
      .valueChanges()
      .subscribe({
        next: (response: IGlobalVariables | undefined) => {
          this.newPeriod = Timestamp.fromDate(
            addWeeks(
              new Date(),
              response?.periodProductsAreConsideredNewInWeeks ?? -2
            )
          );
        },
      });
  }
}
