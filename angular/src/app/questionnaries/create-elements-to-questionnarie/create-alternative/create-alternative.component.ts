import {
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlternativeQuestionnarieDto } from "@shared/service-proxies/alternatives-questionnarie/alternatives-questionnarie-dto";
import { AlternativeQuestionnarieServiceProxy } from "@shared/service-proxies/alternatives-questionnarie/alternatives-questionnarie-service-proxy";
import { CreateAlternativeQuestionnarieDto } from "@shared/service-proxies/alternatives-questionnarie/create-alternatives-questionnarie-dto";


@Component({
  selector: 'app-create-alternative',
  templateUrl: './create-alternative.component.html',
  styleUrls: ['./create-alternative.component.css']
})
export class CreateAlternativeComponent implements  OnInit {
  FormGroup: FormGroup;
  @Input() questionId: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _alternativeQuestionnarieService: AlternativeQuestionnarieServiceProxy
  ) {}

  ngOnInit(): void {

    this.FormGroup = this._formBuilder.group({
      title: ["", Validators.required],
      value: ["", Validators.required],
      type: ["", Validators.required],
      idByFormula: [""],
      questionId: [""],
    });
  }

  createAlternative() {
    const journeyModel: CreateAlternativeQuestionnarieDto = CreateAlternativeQuestionnarieDto.fromJS({
      title: this.FormGroup.get("title").value,
      value: this.FormGroup.get("value").value,
      type: this.FormGroup.get("type").value,
      idByFormula: this.FormGroup.get("idByFormula").value,
      questionId: this.questionId,
    });

    this._alternativeQuestionnarieService
      .create(journeyModel)
      .subscribe((journeySessionDto: AlternativeQuestionnarieDto) => {
      });
  }

  
}

