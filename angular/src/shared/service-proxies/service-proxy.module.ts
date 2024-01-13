import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';
import { HeaderQuestionnarieServiceProxy } from './header-questionnarie/header-questionnarie-service-proxy';
import { SectionServiceProxy } from './section/section-service-proxy';
import { QuestionServiceProxy } from './question/question-service-proxy';
import { AlternativeQuestionnarieServiceProxy } from './alternatives-questionnarie/alternatives-questionnarie-service-proxy';
import { AnswersEvaluationServiceProxy } from './answers-to-evaluation/answers-to-evaluation-service-proxy';
import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        HeaderQuestionnarieServiceProxy,
        SectionServiceProxy,
        QuestionServiceProxy,
        AlternativeQuestionnarieServiceProxy,
        AnswersEvaluationServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
