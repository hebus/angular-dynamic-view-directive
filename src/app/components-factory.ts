import { HelloComponent } from './hello.component';

export class ComponentsFactory {
  static getComponentType(type: string): any | null {
    switch (type) {
      case 'hello':
        return HelloComponent;
      default:
        return null;
    }
  }
}
