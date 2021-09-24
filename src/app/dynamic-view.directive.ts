import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { ComponentsFactory } from './components-factory';

@Directive({
  selector: '[dynamicView]',
})
export class DynamicViewDirective implements OnInit, OnChanges, OnDestroy {
  @Input('dynamicView') view: any;
  @Input('dynamicViewRecord') test:string;

  viewRef: ViewRef;
  // compRef: ComponentRef<any>;

  constructor(
    private cfr: ComponentFactoryResolver,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    console.log("test:", this.test);
    this.resolveContentType();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.test && !changes.test.isFirstChange()) {
      // this.compRef.instance.name = this.test;
      this.resolveContentType();
    }
  }

  resolveContentType() {
    this.viewRef?.destroy();
    const component: any = ComponentsFactory.getComponentType(this.view.type);
    if (component) {
      const compFactory = this.cfr.resolveComponentFactory(component);
      // this.compRef = this.vcr.createComponent(compFactory);
      // this.compRef.instance.name = this.test;
      const compRef: ComponentRef<any>  = this.vcr.createComponent(compFactory);
      compRef.instance.name = this.test;

      // Object.keys(this.view.inputs).forEach(
      //   (input) => (compRef.instance[input] = this.view.inputs[input])
      // );

      this.viewRef = compRef.hostView;
      this.viewRef.detectChanges();
    }
  }

  ngOnDestroy() {
    this.viewRef?.destroy();
  }
}

@NgModule({
  declarations: [DynamicViewDirective],
  exports: [DynamicViewDirective],
})
export class DynamicViewModule {}
