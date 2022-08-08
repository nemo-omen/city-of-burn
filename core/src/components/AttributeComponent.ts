import { Component } from './index';
export class AttributeComponent extends Component {
  name: string;
  value: number;
  constructor (name: string, value: number, updateHandler) {
    super();
    this.name = name;
    this.value = value;
  }
  update(value: number) {
    this.value = value;
    this.dispatchUpdate({ data: { name: this.name, value: this.value } });
  }
}