export interface ICreateHeaderQuestionnarieDto {
  title: string;
  description: string;
  isRequired: boolean;
}

export class CreateHeaderQuestionnarieDto implements ICreateHeaderQuestionnarieDto {
  static fromJS(data: any): CreateHeaderQuestionnarieDto {
    data = typeof data === 'object' ? data : {};
    const result = new CreateHeaderQuestionnarieDto();
    result.init(data);
    return result;
  }

  title: string;
  description: string;
  isRequired: boolean;

  constructor(data?: ICreateHeaderQuestionnarieDto) {
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
      this.isRequired = data.isRequired;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.title = this.title;
    data.description = this.description;
    data.isRequired = this.isRequired;
    return data;
  }

  clone() {
    const json = this.toJSON();
    const result = new CreateHeaderQuestionnarieDto();
    result.init(json);
    return result;
  }
}
