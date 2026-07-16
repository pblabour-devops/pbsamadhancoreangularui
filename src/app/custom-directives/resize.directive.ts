import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

@Directive({
  selector: '[appResize]',
  standalone: false
})
export class ResizeDirective implements OnInit, OnDestroy {

  @Input() resizeId: any;

  @Output() resized = new EventEmitter<{
    id: any;
    width: number;
    height: number;
  }>();

  private resizeObserver!: ResizeObserver;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log('ResizeDirective initialized');
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.resized.emit({
          id: this.resizeId,
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    this.resizeObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }
}