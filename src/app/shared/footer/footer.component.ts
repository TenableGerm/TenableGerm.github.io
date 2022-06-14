import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  public modalRef: NgbModalRef;

  ngOnInit(): void {
  }

  constructor(private modalService: NgbModal) {  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.open(template);
  }

}
