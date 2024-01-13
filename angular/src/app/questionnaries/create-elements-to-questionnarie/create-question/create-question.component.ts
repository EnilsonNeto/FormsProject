import {
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CreateQuestionDto } from "@shared/service-proxies/question/create-question-dto";
import { QuestionDto } from "@shared/service-proxies/question/question-dto";
import { QuestionServiceProxy } from "@shared/service-proxies/question/question-service-proxy";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  FormGroup: FormGroup;
  @Input() sectionId: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _questionService: QuestionServiceProxy
  ) {}

  ngOnInit(): void {
    console.log(this.sectionId);

    this.FormGroup = this._formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      idByFormula: [""],
      formula: [""],
      sectionId: [""],
    });
  }

  createQuestion() {
    const journeyModel: CreateQuestionDto = CreateQuestionDto.fromJS({
      title: this.FormGroup.get("title").value,
      description: this.FormGroup.get("description").value,
      idByFormula: this.FormGroup.get("idByFormula").value,
      formula: this.FormGroup.get("formula").value,
      sectionId: this.sectionId,
    });

    this._questionService
      .create(journeyModel)
      .subscribe((journeyQuestionDto: QuestionDto) => {
      });
  }

}