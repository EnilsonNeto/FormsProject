import {
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CreateSectionDto } from "@shared/service-proxies/section/create-section-dto";
import { SectionDto } from "@shared/service-proxies/section/section-dto";
import { SectionServiceProxy } from "@shared/service-proxies/section/section-service-proxy";

@Component({
  selector: "app-create-session",
  templateUrl: "./create-session.component.html",
  styleUrls: ["./create-session.component.css"],
})
export class CreateSessionComponent implements OnInit {
  FormGroup: FormGroup;
  @Input() headerId: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _sectionService: SectionServiceProxy
  ) {}

  ngOnInit(): void {
    this.FormGroup = this._formBuilder.group({
      title: ["", Validators.required],
      subTitle: ["", Validators.required],
      description: ["", Validators.required],
      idByFormula: [""],
      formula: [""],
      headerQuestionnarieId: [""],
    });
  }

  createSession() {
    const journeyModel: CreateSectionDto = CreateSectionDto.fromJS({
      title: this.FormGroup.get("title").value,
      subTitle: this.FormGroup.get("subTitle").value,
      description: this.FormGroup.get("description").value,
      idByFormula: this.FormGroup.get("idByFormula").value,
      formula: this.FormGroup.get("formula").value,
      headerQuestionnarieId: this.headerId,
    });

    this._sectionService
      .create(journeyModel)
      .subscribe((journeySessionDto: SectionDto) => {
      });
  }

  
}
