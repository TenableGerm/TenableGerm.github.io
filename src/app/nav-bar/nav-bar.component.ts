import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {


  public modalRef: NgbModalRef;

  ngOnInit(): void {
  }
  constructor(private modalService: NgbModal) {  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.open(template);
  }

}
