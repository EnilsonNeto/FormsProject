import { Component, EventEmitter, Injector, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppComponentBase } from '@shared/app-component-base';
import { HeaderQuestionnarieDto } from '@shared/service-proxies/header-questionnarie/header-questionnarie-dto';
import { HeaderQuestionnarieServiceProxy } from '@shared/service-proxies/header-questionnarie/header-questionnarie-service-proxy';
import { AppSessionService } from '@shared/session/app-session.service';
import { EditQuestionnariesComponent } from './edit-elements-to-questionnarie/edit-questionnaries/edit-questionnaries.component';

@Component({
  selector: 'app-questionnaries',
  templateUrl: './questionnaries.component.html',
  styleUrls: ['./questionnaries.component.css']
})
export class QuestionnariesComponent extends AppComponentBase implements OnInit {

  @Input() journeyId: any;
  questionnaries: any;
  headerQuestionnarie = false;
  informationsArray: any = [];
  firstStep: FormGroup;
  secondStep: FormGroup;
  @Output() resultArrayChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() questionnarieSaved = new EventEmitter<void>();
  viewAllToolsBool = false;
  questionnariesTrue: any[] = [];
  questionnariesFalse: any[] = [];
  @Output() allRequiredToolsConcludedChange = new EventEmitter<boolean>();
  allQuestionnaries: any[] = [];
  allQuestionnariesConcluded: { [id: string]: boolean } = {};
  @Input() headerId: any = [];
  final: any;
  questionnarieArray = [];

  constructor(
    injector: Injector,
    private _headerQuestionnarieService: HeaderQuestionnarieServiceProxy,
    private _appSessionService: AppSessionService,
    public dialog: MatDialog,
  ) {
    super(injector);
  }

  ngOnInit(): void {
      this.getHeader();
  }

  onResultArrayChange(resultArray: any) {
    this.resultArrayChange.emit(resultArray);
    this.questionnarieSaved.emit();
    this.headerQuestionnarie = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.journeyId) {
      this.getHeader();
    }
  }

  getHeader() {
    this._headerQuestionnarieService.getAll('' ,  0, 10).subscribe(
      (data: any) => {
        this.questionnaries = data.items.map(item => ({ ...item, concluded: false }));
        this.questionnariesTrue = [];
        this.questionnariesFalse = [];
        this.questionnaries.forEach(questionnarie => {
          if (questionnarie.isRequired) {
            this.questionnariesTrue.push(questionnarie);
          } else {
            this.questionnariesFalse.push(questionnarie);
          }
        });

        this.viewAllToolsBool = true;
      }
    );
  }

  viewQuestionnarie(questionnarie: any) {
    this.informationsArray = questionnarie;
    this.headerQuestionnarie = true;
    this.allQuestionnariesConcluded[questionnarie.id] = false;
  }

  onQuestionnarieConcluded(concludedQuestionnarieId: string) {
    for (let questionnarie of this.questionnariesTrue) {
      if (questionnarie.id === concludedQuestionnarieId) {
        questionnarie.concluded = true;
        break;
      }
    }
    for (let questionnarie of this.questionnariesFalse) {
      if (questionnarie.id === concludedQuestionnarieId) {
        questionnarie.concluded = true;
        break;
      }
    }
    const allRequiredToolsConcluded = this.questionnariesTrue.every(questionnarie => questionnarie.concluded);
    this.allRequiredToolsConcludedChange.emit(allRequiredToolsConcluded);
    this.allQuestionnariesConcluded[concludedQuestionnarieId] = true;
  }

  removeQuestionnarie(id: any) {
    this._headerQuestionnarieService.delete(id).subscribe(
      (data: any) => {
        this.notify.info(this.l('Deletado com Sucesso!'));
        this.getHeader();
      }
    )
  }

  viewAllTools() {
    this._headerQuestionnarieService.getAll('', 0, 10).subscribe(
      (data: any) => {
        this.allQuestionnaries = data.items.filter(item => {
          return !this.questionnariesTrue.some(trueItem => trueItem.id === item.id) &&
            !this.questionnariesFalse.some(falseItem => falseItem.id === item.id);
        });
        this.viewAllToolsBool = false;
      }
    )
  }

  openEditModal(headerQuestionnarie: HeaderQuestionnarieDto) {
    const dialogRef = this.dialog.open(EditQuestionnariesComponent, {
      data: {
        headerQuestionnarieId: headerQuestionnarie.id,
        headerQuestionnarieTitle: headerQuestionnarie.title,
        headerQuestionnarieDescription: headerQuestionnarie.description,
        headerQuestionnarieSections: headerQuestionnarie.sections,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getHeader()
    });
  }

  getFinalQuestionnaries(headerId: any) {
    this._headerQuestionnarieService.get(headerId).subscribe((data: any) => {
      this.questionnarieArray.push(data);
      this.questionnaries = this.questionnarieArray.map(item => ({ ...item, concluded: false }));
      this.questionnariesTrue = [];
      this.questionnariesFalse = [];-
      this.questionnaries.forEach(questionnarie => {
        if (questionnarie.isRequired) {
          this.questionnariesTrue.push(questionnarie);
        } else {
          this.questionnariesFalse.push(questionnarie);
        }
      });

      this.viewAllToolsBool = true;
    })
  }
}
