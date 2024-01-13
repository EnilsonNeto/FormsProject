import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
} from "@angular/common/http";
import { Inject } from "@angular/core";
import { AppConsts } from "../../AppConsts";
import { Observable } from "rxjs";
import { throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { CreateQuestionDto } from "./create-question-dto";
import { QuestionDto } from "./question-dto";
import { PagedResultDtoOfQuestionDto } from "./pagedresult-dto-of-question-dto";

@Injectable()
export class QuestionServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(@Inject(HttpClient) http: HttpClient) {
    this.http = http;
    this.baseUrl = AppConsts.remoteServiceBaseUrl;
  }

  /**
   * @param input (optional)
   * @return Success
   */

  create(input: CreateQuestionDto | null | undefined): Observable<QuestionDto> {
    let url_ = this.baseUrl + "/api/services/app/Question/Create";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(input);

    const options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    return this.http
      .request("post", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processCreate(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processCreate(<any>response_);
            } catch (e) {
              return <Observable<QuestionDto>>(<any>_observableThrow(e));
            }
          } else {
            return <Observable<QuestionDto>>(<any>_observableThrow(response_));
          }
        })
      );
  }

  protected processCreate(response: HttpResponseBase): Observable<QuestionDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
          ? (<any>response).error
          : undefined;

    // tslint:disable-next-line:max-line-length
    const _headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          const resultData200 =
            _responseText === ""
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200
            ? QuestionDto.fromJS(resultData200)
            : new QuestionDto();
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<QuestionDto>(<any>null);
  }

  /**
   * @param input (optional)
   * @return Success
   */

  update(input: QuestionDto | null | undefined): Observable<QuestionDto> {
    let url_ = this.baseUrl + "/api/services/app/Question/Update";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(input);

    const options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    return this.http
      .request("put", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUpdate(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUpdate(<any>response_);
            } catch (e) {
              return <Observable<QuestionDto>>(<any>_observableThrow(e));
            }
          } else {
            return <Observable<QuestionDto>>(<any>_observableThrow(response_));
          }
        })
      );
  }

  protected processUpdate(response: HttpResponseBase): Observable<QuestionDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
          ? (<any>response).error
          : undefined;

    // tslint:disable-next-line:max-line-length
    const _headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          const resultData200 =
            _responseText === ""
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200
            ? QuestionDto.fromJS(resultData200)
            : new QuestionDto();
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<QuestionDto>(<any>null);
  }

  /**
   * @param id (optional)
   * @return Success
   */

  delete(id: string | null | undefined): Observable<void> {
    let url_ = this.baseUrl + "/api/services/app/Question/Delete?";
    if (id !== undefined) {
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    }
    url_ = url_.replace(/[?&]$/, "");

    const options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({}),
    };

    return this.http
      .request("delete", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processDelete(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else {
            return <Observable<void>>(<any>_observableThrow(response_));
          }
        })
      );
  }

  protected processDelete(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
          ? (<any>response).error
          : undefined;

    // tslint:disable-next-line:max-line-length
    const _headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return _observableOf<void>(<any>null);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<void>(<any>null);
  }

  /**
   * @param id (optional)
   * @return Success
   */

  /**
   * @param id (optional)
   * @return Success
   */
  // tslint:disable-next-line:member-ordering

  get(id: string | null | undefined): Observable<QuestionDto> {
    let url_ = this.baseUrl + "/api/services/app/Question/Get?";
    if (id !== undefined) {
      url_ += "Id=" + encodeURIComponent("" + id) + "&";
    }
    url_ = url_.replace(/[?&]$/, "");

    const options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        Accept: "application/json",
      }),
    };

    return this.http
      .request("get", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGet(<any>response_);
            } catch (e) {
              return <Observable<QuestionDto>>(<any>_observableThrow(e));
            }
          } else {
            return <Observable<QuestionDto>>(<any>_observableThrow(response_));
          }
        })
      );
  }

  protected processGet(response: HttpResponseBase): Observable<QuestionDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
          ? (<any>response).error
          : undefined;

    // tslint:disable-next-line:max-line-length
    const _headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          const resultData200 =
            _responseText === ""
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200
            ? QuestionDto.fromJS(resultData200)
            : new QuestionDto();
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<QuestionDto>(<any>null);
  }

  /**
   * @param keyword (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return Success
   */
  // tslint:disable-next-line:member-ordering
  getAll(
    keyword: string | null | undefined,
    skipCount: number | null | undefined,
    maxResultCount: number | null | undefined
  ): Observable<PagedResultDtoOfQuestionDto> {
    let url_ = this.baseUrl + "/api/services/app/Question/GetAll?";
    if (keyword !== undefined) {
      url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    }
    if (skipCount !== undefined) {
      url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    }
    if (maxResultCount !== undefined) {
      url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    }
    url_ = url_.replace(/[?&]$/, "");

    const options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        Accept: "application/json",
      }),
    };

    return this.http
      .request("get", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAll(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAll(<any>response_);
            } catch (e) {
              return <Observable<PagedResultDtoOfQuestionDto>>(
                (<any>_observableThrow(e))
              );
            }
          } else {
            return <Observable<PagedResultDtoOfQuestionDto>>(
              (<any>_observableThrow(response_))
            );
          }
        })
      );
  }

  protected processGetAll(
    response: HttpResponseBase
  ): Observable<PagedResultDtoOfQuestionDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
          ? (<any>response).error
          : undefined;

    // tslint:disable-next-line:max-line-length
    const _headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          let result200: any = null;
          const resultData200 =
            _responseText === ""
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200
            ? PagedResultDtoOfQuestionDto.fromJS(resultData200)
            : new PagedResultDtoOfQuestionDto();
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<PagedResultDtoOfQuestionDto>(<any>null);
  }

  getListBySectionId(sectionId: string | null | undefined): Observable<PagedResultDtoOfQuestionDto> {
    let url_ = this.baseUrl + '/api/services/app/Question/GetListBySectionId?';
    if (sectionId !== undefined) {
      url_ += 'sectionId=' + encodeURIComponent('' + sectionId) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');

    const options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetAllJourneys(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetAll(<any>response_);
        } catch (e) {
          return <Observable<PagedResultDtoOfQuestionDto>><any>_observableThrow(e);
        }
      } else {
        return <Observable<PagedResultDtoOfQuestionDto>><any>_observableThrow(response_);
      }
    }));
  }

  protected processGetAllJourneys(response: HttpResponseBase): Observable<PagedResultDtoOfQuestionDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    // tslint:disable-next-line:max-line-length
    const _headers: any = {}; if (response.headers) { for (const key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        const resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 ? PagedResultDtoOfQuestionDto.fromJS(resultData200) : new PagedResultDtoOfQuestionDto();
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      }));
    }
    return _observableOf<PagedResultDtoOfQuestionDto>(<any>null);
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): Observable<any> {
  if (result !== null && result !== undefined) {
    return _observableThrow(result);
  } else {
    return _observableThrow(console.log("SwaggerException"));
  }
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        observer.next((<any>event.target).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
