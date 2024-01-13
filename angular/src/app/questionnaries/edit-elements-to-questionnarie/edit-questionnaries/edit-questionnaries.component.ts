import { Component, EventEmitter, Inject, OnInit, Output, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeaderQuestionnarieDto } from '@shared/service-proxies/header-questionnarie/header-questionnarie-dto';
import { HeaderQuestionnarieServiceProxy } from '@shared/service-proxies/header-questionnarie/header-questionnarie-service-proxy';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-questionnaries',
  templateUrl: './edit-questionnaries.component.html',
  styleUrls: ['./edit-questionnaries.component.css']
})
export class EditQuestionnariesComponent implements OnInit {

  saving = false;
  headerQuestionnarie = new HeaderQuestionnarieDto();
  checkedRolesMap: { [key: string]: boolean } = {};
  id: string;
  @Output() onSave = new EventEmitter<any>();
  headerQuestionnarieId: any;
  headerQuestionnarieTitle: any;
  headerQuestionnarieDescription: any;

  headerQuestionnarieFormula: any;
  headerQuestionnarieSections: any[];
  headerQuestionnarieJourneyId: any
  constructor(
    injector: Injector,
    public _headerQuestionnarieService: HeaderQuestionnarieServiceProxy,
    public bsModalRef: BsModalRef,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EditQuestionnariesComponent>
  ) {}

  ngOnInit(): void {

    this.headerQuestionnarieJourneyId = this.data.headerQuestionnarieJourneyId;
    this.headerQuestionnarieTitle = this.data.headerQuestionnarieTitle;
    this.headerQuestionnarieDescription = this.data.headerQuestionnarieDescription;
    this.headerQuestionnarieSections = this.data.headerQuestionnarieSections;
    this.headerQuestionnarieFormula = this.data.headerQuestionnarieFormula;
    this.headerQuestionnarieId = this.data.headerQuestionnarieId;

    this.headerQuestionnarie.id = this.headerQuestionnarieId; 
  }

  save(): void {
    this.headerQuestionnarie.title = this.headerQuestionnarieTitle;
    this.headerQuestionnarie.description = this.headerQuestionnarieDescription;
    
    this._headerQuestionnarieService.get(this.headerQuestionnarie.id).subscribe(
      (existingheaderQuestionnarie) => {
        if (existingheaderQuestionnarie) {
          this._headerQuestionnarieService.update(this.headerQuestionnarie).subscribe(() => {
            this.bsModalRef.hide();
          });
        } else {
          this._headerQuestionnarieService.create(this.headerQuestionnarie).subscribe(() => {
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
