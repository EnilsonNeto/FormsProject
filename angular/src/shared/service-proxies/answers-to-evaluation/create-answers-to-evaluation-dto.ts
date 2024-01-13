export interface ICreateAnswersEvaluationDto  {
  headerQuestionnarieId: string;
  sectionId?: string;
  questionId?: string;
  textOfAlternatives?: string;
  valueOfAlternatives?: string;
  valueOfHeader?: string;
  valueOfSections?: string;
}

export class CreateAnswersEvaluationDto  implements ICreateAnswersEvaluationDto  {
  static fromJS(data: any): CreateAnswersEvaluationDto {
    data = typeof data === 'object' ? data : {};
    const result = new CreateAnswersEvaluationDto();
    result.init(data);
    return result;
  }

  headerQuestionnarieId: string;
  sectionId?: string;
  questionId?: string;
  textOfAlternatives?: string;
  valueOfAlternatives?: string;
  valueOfHeader?: string;
  valueOfSections?: string;

  constructor(data?: ICreateAnswersEvaluationDto) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.headerQuestionnarieId = data.headerQuestionnarieId;
      this.sectionId = data.sectionId;
      this.questionId = data.questionId;
      this.textOfAlternatives = data.textOfAlternatives;
      this.valueOfAlternatives = data.valueOfAlternatives;
      this.valueOfHeader = data.valueOfHeader;
      this.valueOfSections = data.valueOfSections;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.headerQuestionnarieId = this.headerQuestionnarieId;
    data.sectionId = this.sectionId;
    data.questionId = this.questionId;
    data.textOfAlternatives = this.textOfAlternatives;
    data.valueOfAlternatives = this.valueOfAlternatives;
    data.valueOfHeader = this.valueOfHeader;
    data.valueOfSections = this.valueOfSections;
    return data;
  }

  clone() {
    const json = this.toJSON();
    const result = new CreateAnswersEvaluationDto();
    result.init(json);
    return result;
  }
}
