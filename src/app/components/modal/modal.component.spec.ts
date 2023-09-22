import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, flush, tick } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import {
  ComponentFactory,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EnvironmentInjector,
  Injector,
  NgModuleRef,
  TemplateRef,
  Type,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { PrivacyPolicyComponent } from '../footer/components/privacy-policy/privacy-policy.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalComponent],
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onClickOutsidePage', () => {
    it('should call request close if click is ouside page', () => {
      component.modalPage = { nativeElement: { contains: () => false } };
      spyOn(component, 'requestClose');

      component.onClickOutsidePage(new MouseEvent('click'));

      expect(component.requestClose).toHaveBeenCalledTimes(1);
    });

    it('should do nothing if click is inside page', () => {
      component.modalPage = { nativeElement: { contains: () => true } };
      spyOn(component, 'requestClose');

      component.onClickOutsidePage(new MouseEvent('click'));

      expect(component.requestClose).not.toHaveBeenCalled();
    });
  });

  describe('#requestClose', () => {
    it('should emit request close', () => {
      spyOn(component.closeRequested, 'emit');

      component.requestClose();

      expect(component.closeRequested.emit).toHaveBeenCalledOnceWith();
    });
  });

  describe('ngOnChanges', () => {
    it('should do nothing if component is undefined, or show is false', () => {
      component.show = false;
      // component.orderedViewContainer = inject(ViewContainerRef)
      component.orderedViewContainer = new ViewContainerRefMock();
      spyOn(component.orderedViewContainer, 'createComponent').and.callThrough();

      component.ngOnChanges();
      expect(
        component.orderedViewContainer.createComponent
      ).not.toHaveBeenCalled();
    });

    it('should create component if component is defined and show is true', fakeAsync(() => {
      component.show = true;
      component.component = PrivacyPolicyComponent;

      component.orderedViewContainer = new ViewContainerRefMock();
      spyOn(component.orderedViewContainer, 'createComponent');

      component.ngOnChanges();
      tick();
      expect(component.orderedViewContainer.createComponent).toHaveBeenCalledTimes(1);
      discardPeriodicTasks();
    }))
  });
});

class ViewContainerRefMock<C> extends ViewContainerRef {
  override get element(): ElementRef<any> {
    throw new Error('Method not implemented.');
  }
  override get injector(): Injector {
    throw new Error('Method not implemented.');
  }
  override get parentInjector(): Injector {
    throw new Error('Method not implemented.');
  }
  override clear(): void {
    throw new Error('Method not implemented.');
  }
  override get(index: number): ViewRef | null {
    throw new Error('Method not implemented.');
  }
  override get length(): number {
    throw new Error('Method not implemented.');
  }
  override createEmbeddedView<C>(
    templateRef: TemplateRef<C>,
    context?: C | undefined,
    options?:
      | { index?: number | undefined; injector?: Injector | undefined }
      | undefined
  ): EmbeddedViewRef<C>;
  override createEmbeddedView<C>(
    templateRef: TemplateRef<C>,
    context?: C | undefined,
    index?: number | undefined
  ): EmbeddedViewRef<C>;
  override createEmbeddedView(
    templateRef: unknown,
    context?: unknown,
    index?: unknown
  ):
    | import('@angular/core').EmbeddedViewRef<C>
    | import('@angular/core').EmbeddedViewRef<C> {
    throw new Error('Method not implemented.');
  }
  override createComponent<C>(
    componentType: Type<C>,
    options?:
      | {
          index?: number | undefined;
          injector?: Injector | undefined;
          ngModuleRef?: NgModuleRef<unknown> | undefined;
          environmentInjector?:
            | EnvironmentInjector
            | NgModuleRef<unknown>
            | undefined;
          projectableNodes?: Node[][] | undefined;
        }
      | undefined
  ): ComponentRef<C>;
  override createComponent<C>(
    componentFactory: ComponentFactory<C>,
    index?: number | undefined,
    injector?: Injector | undefined,
    projectableNodes?: any[][] | undefined,
    environmentInjector?: EnvironmentInjector | NgModuleRef<any> | undefined
  ): ComponentRef<C>;
  override createComponent(
    componentFactory: unknown,
    index?: unknown,
    injector?: unknown,
    projectableNodes?: unknown,
    environmentInjector?: unknown
  ):
    | import('@angular/core').ComponentRef<C>
    | import('@angular/core').ComponentRef<C> {
    throw new Error('Method not implemented.');
  }
  override insert(viewRef: ViewRef, index?: number | undefined): ViewRef {
    throw new Error('Method not implemented.');
  }
  override move(viewRef: ViewRef, currentIndex: number): ViewRef {
    throw new Error('Method not implemented.');
  }
  override indexOf(viewRef: ViewRef): number {
    throw new Error('Method not implemented.');
  }
  override remove(index?: number | undefined): void {
    throw new Error('Method not implemented.');
  }
  override detach(index?: number | undefined): ViewRef | null {
    throw new Error('Method not implemented.');
  }
}
