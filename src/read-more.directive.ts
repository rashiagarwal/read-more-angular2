import { Directive, Input, ElementRef, AfterViewInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[readMore]'
})

export class ReadMoreDirective implements  AfterViewInit, OnChanges {
  @Input('readMore-length')  private maxLength:     number;
  @Input('readMore-element') private elementChange: HTMLElement;

  private currentText: string;
  private hideToggle:  boolean = true;
  private text:        string;
  private isCollapsed: boolean = true;

  constructor(private el: ElementRef) {}

  /**
   * @inheritDoc
   */
  public ngAfterViewInit() {
    this.text = this.elementChange.innerHTML;
    this.toggleView();
    if (!this.hideToggle) {
      this.el.nativeElement.classList.remove('hidden');
    } else {
      this.el.nativeElement.classList.add('hidden');
    }
    this.el.nativeElement.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      this.toggleView();
    });
  }

  /**
   * @inheritDoc
   */
  public ngOnChanges() {
    if (this.elementChange.innerHTML) {
      this.toggleView();
    }
  }
  /**
   * Toogle view - full text or not
   */
  private toggleView(): void {
    this.determineView();
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.el.nativeElement.innerHTML = `Less <i class="fa fa-angle-right" aria-hidden="true"></i>` ;
    } else {
      this.el.nativeElement.innerHTML = `More <i class="fa fa-angle-right" aria-hidden="true"></i>`;
    }
  }

  /**
   * Determine view
   */
  private determineView(): void {
    const _elementChange = document.getElementById(this.elementChange.id);
    if (this.text.length <= this.maxLength) {
      this.currentText = this.text;
      _elementChange.innerHTML = this.currentText;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    }
    this.hideToggle = false;
    if (this.isCollapsed === true) {
      this.currentText = this.text.substring(0, this.maxLength) + '...';
      _elementChange.innerHTML = this.currentText;
    } else if (this.isCollapsed === false)  {
      this.currentText = this.text;
      _elementChange.innerHTML = this.currentText;
    }
  }
}