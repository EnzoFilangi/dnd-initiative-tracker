import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild('modalContainer') modalRef: ElementRef | undefined;
  @ViewChild('modalBody') bodyRef: ElementRef | undefined;

  @Input() title = '';

  constructor() { }

  ngOnInit(): void {
  }

  clickOutside() {
    console.log("outside")
  }

  clickContent() {
    console.log("content")
  }

  closeModal() {
    setTimeout(() => this.modalRef?.nativeElement.classList.add('hidden'), 200);
    this.bodyRef?.nativeElement.classList.add('outside-screen')
  }

  showModal(){
    this.modalRef?.nativeElement.classList.remove('hidden')
    setTimeout(() => this.bodyRef?.nativeElement.classList.remove('outside-screen'), 1);
  }
}
