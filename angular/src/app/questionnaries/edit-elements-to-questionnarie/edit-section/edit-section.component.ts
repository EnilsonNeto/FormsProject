import { Component, EventEmitter, Inject, OnInit, Output, Injector } from '@angular/core';
import { SectionDto } from '@shared/service-proxies/section/section-dto';
import { SectionServiceProxy } from '@shared/service-proxies/section/section-service-proxy';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.css']
})
export class EditSectionComponent implements OnInit {

  saving = false;
  section = new SectionDto();
  checkedRolesMap: { [key: string]: boolean } = {};
  id: string;
  @Output() onSave = new EventEmitter<any>();
  sectionId: any;
  sectionHeaderQuestionnarieId: any;
  sectionTitle: any;
  sectionDescription: any;
  sectionSubTitle: any;
  sectionFormula: any;
  sectionIdByFormula: any;

  constructor(
    injector: Injector,
    public _sectionService: SectionServiceProxy,
    public bsModalRef: BsModalRef,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EditSectionComponent>
  ) {}

  ngOnInit(): void {

    this.sectionId = this.data.sectionId;
    this.sectionHeaderQuestionnarieId = this.data.sectionHeaderQuestionnarieId;
    this.sectionTitle = this.data.sectionTitle;
    this.sectionDescription = this.data.sectionDescription;
    this.sectionSubTitle = this.data.sectionSubTitle;
    this.sectionFormula = this.data.sectionFormula;
    this.sectionIdByFormula = this.data.sectionIdByFormula;
    

    this.section.id = this.sectionId; 
  }

  save(): void {
    this.section.headerQuestionnarieId = this.sectionHeaderQuestionnarieId;
    this.section.title = this.sectionTitle;
    this.section.description = this.sectionDescription;
    this.section.subTitle = this.sectionSubTitle;
    
    this._sectionService.get(this.section.id).subscribe(
      (existingsection) => {
        if (existingsection) {
          this._sectionService.update(this.section).subscribe(() => {
            this.bsModalRef.hide();
          });
        } else {
          this._sectionService.create(this.section).subscribe(() => {
            this.bsModalRef.hide();
          });
        }
      },
      (error) => {
        console.error("Error fetching body part:", error);
      }
    );
  }
}

