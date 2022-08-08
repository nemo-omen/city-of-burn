import { ComponentEvent } from '../types/index';
type handler<E> = (event: E) => void;

class EventDispatcher<E> {
  private handlers: Handler<E>[] = [];

  dispatch(event: E) {
    for (let handler of this.handlers) {
      handler(event);
    }
  }
  register(handler: Handler<E>) {
    this.handlers.push(handler);
  }
}



export abstract class Component {
  name: string;

  /**
   * This gives us a way to fire events when the update() method is called.
   * Don't forget that you need to implement the update method yourself
   * on any subclass!
   */
  private updateDispatcher: EventDispatcher = new EventDispatcher<ComponentEvent>();

  public onupdate(handler: Handler<ComponentEvent>) {
    this.updateDispatcher.register(handler);
  }

  public dispatchUpdate(event: ComponentEvent) {
    this.updateDispatcher.dispatch(event);
  }

}