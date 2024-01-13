export interface ICreateSectionDto {
  title: string;
  description: string;
  subTitle: string;
  headerQuestionnarieId: string;
}

export class CreateSectionDto implements ICreateSectionDto {
  static fromJS(data: any): CreateSectionDto {
    data = typeof data === 'object' ? data : {};
    const result = new CreateSectionDto();
    result.init(data);
    return result;
  }

  title: string;
  description: string;
  subTitle: string;
  headerQuestionnarieId: string;

  constructor(data?: ICreateSectionDto) {
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
      this.subTitle = data.subTitle;
      this.description = data.description;
      this.headerQuestionnarieId = data.headerQuestionnarieId;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.title = this.title;
    data.subTitle = this.subTitle;
    data.description = this.description;
    data.headerQuestionnarieId = this.headerQuestionnarieId;
    return data;
  }

  clone() {
    const json = this.toJSON();
    const result = new CreateSectionDto();
    result.init(json);
    return result;
  }
}
