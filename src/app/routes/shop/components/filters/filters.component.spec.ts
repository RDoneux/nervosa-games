import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { ShopModule } from '../../shop.module';
import { MessageService } from 'src/app/services/message/message.service';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  let messageServiceMock: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    messageServiceMock = jasmine.createSpyObj('MessageService', ['send']);

    TestBed.configureTestingModule({
      imports: [ShopModule],
      providers: [{ provide: MessageService, useValue: messageServiceMock }],
    });
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
