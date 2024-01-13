export interface ICreateAlternativeQuestionnarieDto {
  title: string;
  value: string;
  type: string;
  questionId: string;
}

export class CreateAlternativeQuestionnarieDto implements ICreateAlternativeQuestionnarieDto {
  static fromJS(data: any): CreateAlternativeQuestionnarieDto {
    data = typeof data === 'object' ? data : {};
    const result = new CreateAlternativeQuestionnarieDto();
    result.init(data);
    return result;
  }

  title: string;
  value: string;
  type: string;
  questionId: string;

  constructor(data?: ICreateAlternativeQuestionnarieDto) {
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
      this.title = data.title;
      this.value = data.value;
      this.type = data.type;
      this.questionId = data.questionId;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.title = this.title;
    data.value = this.value;
    data.type = this.type;
    data.questionId = this.questionId;
    return data;
  }

  clone() {
    const json = this.toJSON();
    const result = new CreateAlternativeQuestionnarieDto();
    result.init(json);
    return result;
  }
}
