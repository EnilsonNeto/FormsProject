
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlternativeQuestionnarieServiceProxy } from '@shared/service-proxies/alternatives-questionnarie/alternatives-questionnarie-service-proxy';
import { HeaderQuestionnarieServiceProxy } from '@shared/service-proxies/header-questionnarie/header-questionnarie-service-proxy';
import { QuestionServiceProxy } from '@shared/service-proxies/question/question-service-proxy';
import { CreateSectionDto } from '@shared/service-proxies/section/create-section-dto';
import { SectionServiceProxy } from '@shared/service-proxies/section/section-service-proxy';
import { CreateQuestionDto } from '@shared/service-proxies/question/create-question-dto';
import { QuestionDto } from '@shared/service-proxies/question/question-dto';
import { SectionDto } from '@shared/service-proxies/section/section-dto';
import { CreateAlternativeQuestionnarieDto } from '@shared/service-proxies/alternatives-questionnarie/create-alternatives-questionnarie-dto';
import { AlternativeQuestionnarieDto } from '@shared/service-proxies/alternatives-questionnarie/alternatives-questionnarie-dto';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateHeaderQuestionnarieDto } from '@shared/service-proxies/header-questionnarie/create-header-questionnarie-dto';
import { HeaderQuestionnarieDto } from '@shared/service-proxies/header-questionnarie/header-questionnarie-dto';

@Component({
  selector: 'app-create-questionnarie',
  templateUrl: './create-questionnarie.component.html',
  styleUrls: ['./create-questionnarie.component.css']
})
export class CreateQuestionnarieComponent extends AppComponentBase implements OnInit {

  @Input() journey: any;
  @Output() questionnarieSaved = new EventEmitter<void>();
  idHeader: any;
  idSection: any;
  idQuestion: any;
  headerFormGroup: FormGroup;
  sections: any[] = [];
  questions: any[] = [];
  alternatives: any[] = [];
  idSectionByFormula: number = 1;
  idQuestionByFormula: number = 1;
  idAlternativeByFormula: number = 1;
  isChecked: boolean;

  constructor(injector: Injector,
    private _headerQuestionnarieService: HeaderQuestionnarieServiceProxy,
    private _sectionService: SectionServiceProxy,
    private _questionService: QuestionServiceProxy,
    private _alternativeService: AlternativeQuestionnarieServiceProxy,
    private _formBuilder: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    this.forms();
  }

  forms() {
    this.headerFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      journeyId: this.journey,
      formula: [''],
      isRequired: this.isChecked
    });
  }

  updateIsRequired(value: string) {
    if (value != 'true') {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }

  addSection() {
    const newSection = {
      formGroup: this._formBuilder.group({
        title: ['', Validators.required],
        subTitle: [''],
        description: [''],
        idByFormula: `id${this.idSectionByFormula++}`,
        formula: ['']
      }),
      questions: [],
      visible: true,
      showFormula: false,
    };
    this.sections.push(newSection);
  }

  addQuestion(sectionIndex: number) {
    const newQuestion = {
      formGroup: this._formBuilder.group({
        title: ['', Validators.required],
        description: [''],
        idByFormula: `id${this.idQuestionByFormula++}`,
      }),
      alternatives: [],
      visible: true,
    };
    this.sections[sectionIndex].questions.push(newQuestion);
  }

  addAlternative(sectionIndex: number, questionIndex: number) {
    const lastAlternative = this.sections[sectionIndex].questions[questionIndex].alternatives.slice(-1)[0];
    const newAlternative = {
      formGroup: this._formBuilder.group({
        type: [lastAlternative ? lastAlternative.formGroup.value.type : '', Validators.required],
        title: ['', Validators.required],
        value: ['', Validators.required],
        idByFormula: `id${this.idAlternativeByFormula++}`
      }),
    };
    this.sections[sectionIndex].questions[questionIndex].alternatives.push(newAlternative);
  }

  addQuestionWithInvisibleSection() {
    const invisibleSection = {
      formGroup: this._formBuilder.group({
        title: ['vazio', Validators.required],
        subTitle: ['vazio'],
        description: ['vazio'],
        idByFormula: `id${this.idSectionByFormula++}`,
      }),
      questions: [],
      visible: false,
      textAll: 'Remover Tudo'
    };
    this.sections.push(invisibleSection);
    const newQuestion = {
      formGroup: this._formBuilder.group({
        title: ['', Validators.required],
        description: [''],
        idByFormula: `id${this.idQuestionByFormula++}`,
      }),
      alternatives: []
    };
    invisibleSection.questions.push(newQuestion);
  }

  addAlternativeWithInvisibleSection() {
    const invisibleSection = {
      formGroup: this._formBuilder.group({
        title: ['vazio', Validators.required],
        subTitle: ['vazio'],
        description: ['vazio'],
        idByFormula: `id${this.idSectionByFormula++}`
      }),
      questions: [],
      visible: false,
      textAll: 'Remover Tudo'
    };
    this.sections.push(invisibleSection);

    const newQuestion = {
      formGroup: this._formBuilder.group({
        title: ['vazio', Validators.required],
        description: ['vazio'],
        idByFormula: `id${this.idQuestionByFormula++}`,
      }),
      alternatives: [],
      visible: false,
      textAll: 'Remover Tudo'
    };
    invisibleSection.questions.push(newQuestion);

    const newAlternative = {
      formGroup: this._formBuilder.group({
        type: ['', Validators.required],
        title: ['', Validators.required],
        value: ['', Validators.required],
        idByFormula: `id${this.idAlternativeByFormula++}`
      }),
    };
    newQuestion.alternatives.push(newAlternative);
  }

  createQuestionnarie() {
    const questionario = [];
    for (const secao of this.sections) {
      console.log(secao);

      const secaoObj = secao.formGroup.value;
      console.log(secaoObj);

      secaoObj['questions'] = [];
      for (const question of secao.questions) {
        const questionObj = question.formGroup.value;
        questionObj['alternatives'] = question.alternatives.map(alternative => alternative.formGroup.value);
        secaoObj['questions'].push(questionObj);
      }
      questionario.push(secaoObj);
    }
    this.createHeader(questionario);
  }

  createHeader(questionario: any[]) {
    const header = this.headerFormGroup.value;
    this._headerQuestionnarieService.create(new CreateHeaderQuestionnarieDto(header)).subscribe(
      (createdHeader: HeaderQuestionnarieDto) => {
        for (const secao of questionario) {
          this._sectionService.create(CreateSectionDto.fromJS({
            title: secao.title,
            subTitle: secao.subTitle,
            description: secao.description,
            idByFormula: secao.idByFormula,
            formula: secao.formula,
            headerQuestionnarieId: createdHeader.id
          })).subscribe(
            (createdSection: SectionDto) => {
              for (const question of secao.questions) {
                this._questionService.create(CreateQuestionDto.fromJS({
                  title: question.title,
                  description: question.description,
                  idByFormula: question.idByFormula,
                  sectionId: createdSection.id
                })).subscribe(
                  (createdQuestion: QuestionDto) => {
                    for (const alternative of question.alternatives) {
                      this._alternativeService.create(CreateAlternativeQuestionnarieDto.fromJS({
                        title: alternative.title,
                        value: alternative.value,
                        type: alternative.type,
                        idByFormula: alternative.idByFormula,
                        questionId: createdQuestion.id
                      })).subscribe(
                        (createdAlternative: AlternativeQuestionnarieDto) => {
                          this.notify.success(this.l('SuccessfullyRegistered'));
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
        this.questionnarieSaved.emit();
      }
    );
  }

  removeSection(sectionIndex: number) {
    this.sections.splice(sectionIndex, 1);
  }

  removeQuestion(sectionIndex: number, questionIndex: number) {
    this.sections[sectionIndex].questions.splice(questionIndex, 1);
  }

  removeAlternative(sectionIndex: number, questionIndex: number, alternativeIndex: number) {
    this.sections[sectionIndex].questions[questionIndex].alternatives.splice(alternativeIndex, 1);
  }

  toggleShowFormula(sectionIndex: number) {
    this.sections[sectionIndex].showFormula = !this.sections[sectionIndex].showFormula;;
  }

}
