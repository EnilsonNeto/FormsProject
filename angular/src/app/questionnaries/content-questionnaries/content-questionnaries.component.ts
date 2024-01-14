import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlternativeQuestionnarieServiceProxy } from '@shared/service-proxies/alternatives-questionnarie/alternatives-questionnarie-service-proxy';
import { QuestionDto } from '@shared/service-proxies/question/question-dto';
import { QuestionServiceProxy } from '@shared/service-proxies/question/question-service-proxy';
import { SectionServiceProxy } from '@shared/service-proxies/section/section-service-proxy';
import { AppSessionService } from '@shared/session/app-session.service';
import { EditSectionComponent } from '../edit-elements-to-questionnarie/edit-section/edit-section.component';
import { SectionDto } from '@shared/service-proxies/section/section-dto';
import { EditQuestionComponent } from '../edit-elements-to-questionnarie/edit-question/edit-question.component';
import { EditAlternativeComponent } from '../edit-elements-to-questionnarie/edit-alternative/edit-alternative.component';
import { AlternativeQuestionnarieDto } from '@shared/service-proxies/alternatives-questionnarie/alternatives-questionnarie-dto';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-content-questionnaries',
  templateUrl: './content-questionnaries.component.html',
  styleUrls: ['./content-questionnaries.component.css']
})
export class ContentQuestionnariesComponent extends AppComponentBase implements OnInit {

  @Input() header: any;
  @Output() resultArrayChange: EventEmitter<any> = new EventEmitter<any>();
  sections: any;
  questions: any;
  questionsBySection = {};
  alternativesByQuestions = {};
  answersSelected: any;
  selected: boolean;
  inputValue: string;
  @Output() questionnarieSaved = new EventEmitter<void>();
  @Output() questionnarieConcluded = new EventEmitter<string>();

  idSessions: any;
  idQuestion: any;
  idAlternative: any;
  sessionsAdd = false;
  questionsAdd = false;
  alternativeAdd = false;

  constructor(
    injector: Injector,
    private _sectionService: SectionServiceProxy,
    private _questionService: QuestionServiceProxy,
    private _alternativeService: AlternativeQuestionnarieServiceProxy,
    private fb: FormBuilder,
    private _appSessionService: AppSessionService,
    public dialog: MatDialog,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getSection();
  }

  getSection() {
    this._sectionService.getHeaderQuestionnarieId(this.header.id).subscribe(
      (data: any) => {
        console.log(data.items);
        
        this.sections = data.items
        this.sections.forEach(section => {
          this.getQuestionsBySession(section.id);
        });
      }
    );
  }

  getQuestionsBySession(id: any) {
    this._questionService.getListBySectionId(id).subscribe(
      (data: any) => {
        this.questionsBySection[id] = data.items;

        this.questionsBySection[id].forEach(question => {
          this.getAlternativesByQuestion(question.id);
        });
      }
    );
  }

  getAlternativesByQuestion(id: any) {
    this._alternativeService.getListByQuestionId(id).subscribe(
      (data: any) => {
        this.alternativesByQuestions[id] = data.items.map((item: any) => ({
          ...item,
          selected: this.fb.control(false),
          inputValue: this.fb.control('')
        }));
      }
    );
  }

  calculateFormula(formula: string, values: any) {
    let formulaToCalculate = formula;

    for (const id in values) {
      const value = values[id];
      formulaToCalculate = formulaToCalculate.replace(new RegExp(id, 'g'), value);
    }

    const formulaFunction = new Function('return ' + formulaToCalculate);
    return formulaFunction();
  }

  processSection(section: any) {
    const sectionQuestions = this.questionsBySection[section.id];
    const sectionRespostas: any = {
      sectionId: section.id,
      questionId: [],
    };

    if (sectionQuestions && sectionQuestions.length > 0) {
      for (const question of sectionQuestions) {
        for (const alternative of this.alternativesByQuestions[question.id]) {
          if (
            (alternative.type === 'radio' && alternative.selected.value) ||
            (alternative.type === 'input' && alternative.inputValue.value) ||
            (alternative.type === 'multiple' && alternative.selected.value)
          ) {
            sectionRespostas[question.idByFormula] = alternative.type === 'input' ? alternative.inputValue.value : alternative.value;
            sectionRespostas.questionId.push({
              id: question.id,
              type: alternative.type,
              value: alternative.selected.value ? alternative.value : null,
            });
          }
        }
      }
    }

    const formulaValue = this.calculateFormula(section.formula, sectionRespostas);

    return {
      section: section.idByFormula,
      formulaValue: formulaValue,
      ...sectionRespostas,
    };
  }

  viewAnswers() {
    const resultsArray: any[] = [];
    const sectionFormulas: any = {};

    for (const section of this.sections) {
      if (this.hasInputAlternatives(section)) {
        const sectionInputAnswers = this.processInputAnswers(section);
        resultsArray.push({
          valueSection: sectionInputAnswers.valueSection || '',
          sectionId: sectionInputAnswers.sectionId,
          formValue: '',
          question: [
            {
              question: sectionInputAnswers.inputAnswers.map((inputAnswer: any) => ({
                id: inputAnswer.id,
                idByFormula: inputAnswer.idByFormula,
                value: inputAnswer.inputValue
              })),
            },
          ],
        });
      } else {
        const sectionResposta = this.processSection(section);
        sectionFormulas[section.idByFormula] = sectionResposta.formulaValue;

        const existingSection = resultsArray.find((result) => result.sectionId === sectionResposta.sectionId);

        if (!existingSection) {
          const sectionResult: any = {
            valueSection: sectionResposta.section || '',
            sectionId: sectionResposta.sectionId,
            formValue: sectionResposta.formulaValue || '',
            question: [] // Inicialize o array question vazio
          };

          let hasMultipleType = false;

          for (const questionId of sectionResposta.questionId) {
            if (questionId.type === 'multiple') {
              hasMultipleType = true;
              const alternatives = this.alternativesByQuestions[questionId.id].filter((alternative: any) => alternative.type === 'multiple' && alternative.selected.value);

              if (alternatives.length > 0) {
                const questionAlreadyAdded = sectionResult.question.some((q: any) => q.id === questionId.id);

                if (!questionAlreadyAdded) {
                  sectionResult.question.push({
                    id: questionId.id,
                    value: alternatives.map((alternative: any) => ({
                      title: alternative.title,
                      value: alternative.value,
                    })),
                  });
                }
              }
            } else {
              sectionResult.question.push({
                id: questionId.id,
                idByFormula: questionId.idByFormula,
                value: questionId.value,
              });
            }
          }

          // Se não houver questões do tipo 'multiple', crie a estrutura com map
          if (!hasMultipleType) {
            sectionResult.question.push({
              question: sectionResposta.questionId.map((questionId: any) => ({
                id: questionId,
                idByFormula: questionId.idByFormula,
                value: sectionResposta,
                type: questionId.type
              })),
            });
          }

          this.questionnarieConcluded.emit(this.header.id);
          resultsArray.push(sectionResult);
        }
      }
    }

    const headerFormulaValue = this.calculateFormula(this.header.formula, sectionFormulas);

    const resultArray = {
      header: [
        {
          valueHeader: headerFormulaValue || '',
          headerId: this.header.id,
          section: resultsArray || '',
        },
      ],
    };

    this.answersSelected = resultArray;
    this.resultArrayChange.emit(resultArray);
    this.questionnarieSaved.emit();
  }


  hasInputAlternatives(section: any): boolean {
    const sectionQuestions = this.questionsBySection[section.id];

    if (sectionQuestions && sectionQuestions.length > 0) {
      for (const question of sectionQuestions) {
        for (const alternative of this.alternativesByQuestions[question.id]) {
          if (alternative.type === 'input') {
            return true;
          }
        }
      }
    }

    return false;
  }

  processInputAnswers(section: any) {
    const sectionQuestions = this.questionsBySection[section.id];
    const sectionInputAnswers: any = {
      sectionId: section.id,
      inputAnswers: [],
    };

    if (sectionQuestions && sectionQuestions.length > 0) {
      for (const question of sectionQuestions) {
        for (const alternative of this.alternativesByQuestions[question.id]) {
          if (alternative.type === 'input' && alternative.inputValue.value) {
            sectionInputAnswers.inputAnswers.push({
              id: question.id,
              idByFormula: question.idByFormula,
              questionId: question.id,
              inputValue: alternative.inputValue.value,
            });
          }
        }
      }
    }

    return sectionInputAnswers;
  }

  openEditModal(section: SectionDto) {

    const dialogRef = this.dialog.open(EditSectionComponent, {
      data: {
        sectionId: section.id,
        sectionHeaderQuestionnarieId: section.headerQuestionnarieId,
        sectionTitle: section.title,
        sectionDescription: section.description,
        sectionSubTitle: section.subTitle,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  openEditQuestionModal(question: QuestionDto) {

    const dialogRef = this.dialog.open(EditQuestionComponent, {
      data: {
        questionId: question.id,
        questionTitle: question.title,
        questionDescription: question.description,
        questionFormula: question.formula,
        questionIdByFormula: question.idByFormula,
        questionSection: question.sectionId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  openEditAlternativeModal(alternativeQuestionnarie: AlternativeQuestionnarieDto) {

    const dialogRef = this.dialog.open(EditAlternativeComponent, {
      data: {
        alternativeQuestionnarieId: alternativeQuestionnarie.id,
        alternativeQuestionnarieTitle: alternativeQuestionnarie.title,
        alternativeQuestionnarieValue: alternativeQuestionnarie.value,
        alternativeQuestionnarieType: alternativeQuestionnarie.type,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  deletSection(id: any) {
    this._sectionService.delete(id).subscribe(
      (data: any) => {
        this.notify.info(this.l('Sessão deletada com Sucesso!'));
        this.ngOnInit();
      }
    )
  }

  deletQuestion(id: any) {
    this._questionService.delete(id).subscribe(
      (data: any) => {
        this.notify.info(this.l('Questão deletada com Sucesso!'));
        this.ngOnInit();
      }
    )
  }

  deletAlternative(id: any) {
    this._alternativeService.delete(id).subscribe(
      (data: any) => {
        this.notify.info(this.l('Alternativa deletada com Sucesso!'));
        this.ngOnInit();
      }
    )
  }


  addSession(id: any) {
    this.idSessions = id;
    this.sessionsAdd = !this.sessionsAdd;
  }

  addQuestion(id: any) {
    this.idQuestion = id;
    this.questionsAdd = !this.questionsAdd;
  }

  addAlternative(id: any) {
    this.idAlternative = id;
    this.alternativeAdd = !this.alternativeAdd;
  }
}
