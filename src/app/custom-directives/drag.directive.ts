import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appDrag]',
  standalone: false
  
})
export class DragDirective {

  private offsetX = 0;
  private offsetY = 0;
  private dragging = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'move');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.dragging = true;

    const rect = this.el.nativeElement.getBoundingClientRect();

    this.offsetX = event.clientX - rect.left;
    this.offsetY = event.clientY - rect.top;

    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.dragging) return;

    const left = event.clientX - this.offsetX;
    const top = event.clientY - this.offsetY;

    this.renderer.setStyle(this.el.nativeElement, 'left', `${left}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${top}px`);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.dragging = false;
  }
}