import { AuthInterceptor } from './auth/auth.interceptor';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material-module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr'

import { FooterComponent } from './components/template/footer/footer.component';
import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component';

import { CompositionComponent } from './views/composition/composition.component';
import { HomeComponent } from './views/home/home.component';
import { PortfolioComponent } from './views/portfolio/portfolio.component';
import { QuotationsComponent } from './views/quotations/quotations.component';
import { TransactionComponent } from './views/transaction/transaction.component';

import { QuotationReadComponent } from './components/quotation/quotation-read/quotation-read.component';
import { TransactionCreateComponent } from './components/transaction/transaction-create/transaction-create.component';
import { TransactionReadComponent } from './components/transaction/transaction-read/transaction-read.component';
import { TransactionUpdateComponent } from './components/transaction/transaction-update/transaction-update.component';
import { TransactionDeleteComponent } from './components/transaction/transaction-delete/transaction-delete.component';
import { LogInComponent } from './components/user/log-in/log-in.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserComponent } from './components/user/user.component';
import { ToolbarComponent } from './components/template/toolbar/toolbar.component';
import { QuotationCreateComponent } from './components/quotation/quotation-create/quotation-create.component';
import { PortfolioReadComponent } from './components/portfolio/portfolio-read/portfolio-read.component';
import { PortfolioTabGroupComponent } from './components/portfolio/portfolio-tab-group/portfolio-tab-group.component';





registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    CompositionComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LogInComponent,
    NavComponent,
    PortfolioComponent,
    QuotationCreateComponent,
    QuotationReadComponent,
    QuotationsComponent,
    RegisterComponent,
    TransactionComponent,
    TransactionCreateComponent,
    TransactionReadComponent,
    TransactionUpdateComponent,
    TransactionDeleteComponent,
    UserComponent,
    ToolbarComponent,
    PortfolioReadComponent,
    PortfolioTabGroupComponent
    ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
