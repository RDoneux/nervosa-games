import { Component, Input, OnInit, Type } from '@angular/core';
import { IProduct } from '../../interfaces/i-product.interface';
import { addWeeks } from 'date-fns';
import { IGlobalVariables } from 'src/app/interfaces/i-global-variables.interface';
import { Timestamp } from '@angular/fire/firestore';
import { GlobalVariableService } from 'src/app/services/global-variables/global-variable.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input({ required: true }) product!: IProduct;

  public newPeriod!: Timestamp;
  public showMoreDetails: boolean = false;
  public isLiked: boolean = false;

  constructor(
    private globalVariablesService: GlobalVariableService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.globalVariablesService.getGlobalVariables().subscribe({
      next: (variables: IGlobalVariables | undefined) =>
        (this.newPeriod = Timestamp.fromDate(
          addWeeks(
            new Date(),
            variables?.periodProductsAreConsideredNewInWeeks ?? -2
          )
        )),
    });

    this.userService.getUserProductLikedList().subscribe({
      next: (userLikedList: string[] | null) => {
        this.isLiked = userLikedList
          ? userLikedList.includes(this.product.id)
          : false;
      },
    });

  }

  onShowMoreDetail(): void {
    this.showMoreDetails = true;
  }

  onRequestClose(): void {
    this.showMoreDetails = false;
  }

  onFavorite(): void {
    this.isLiked = !this.isLiked
    this.isLiked
      ? this.userService.addProductToLikedList(this.product.id)
      : this.userService.removeProductFromLikedList(this.product.id);
  }
}
