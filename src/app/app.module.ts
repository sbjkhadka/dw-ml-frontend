import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassificationComponent } from './classification/classification.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { RegressionComponent } from './regression/regression.component';

const routes: Routes = [
  {path: 'tree', component: ClassificationComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: ClassificationComponent},
  {path: 'regression', component: RegressionComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ClassificationComponent,
    RegressionComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
