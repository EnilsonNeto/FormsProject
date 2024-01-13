export interface ICreateQuestionDto {
  title: string;
  description: string;
  sectionId: string;
}

export class CreateQuestionDto implements ICreateQuestionDto {
  static fromJS(data: any): CreateQuestionDto {
    data = typeof data === 'object' ? data : {};
    const result = new CreateQuestionDto();
    result.init(data);
    return result;
  }

  title: string;
  description: string;
  sectionId: string;

  constructor(data?: ICreateQuestionDto) {
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
      this.description = data.description;
      this.sectionId = data.sectionId;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.title = this.title;
    data.description = this.description;
    data.sectionId = this.sectionId;
    return data;
  }

  clone() {
    const json = this.toJSON();
    const result = new CreateQuestionDto();
    result.init(json);
    return result;
  }
}
