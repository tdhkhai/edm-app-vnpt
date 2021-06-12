import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntDesignModule } from './antDesign.module';
import { MatModule } from './mat.module';
import { NzI18nService, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { enUS, ja, vi } from 'date-fns/locale';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntDesignModule,
    MatModule,
  ],
  providers: [
    // { provide: NZ_DATE_LOCALE, useValue: viLocale  }
    { provide: NZ_DATE_LOCALE, useValue: vi }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private i18n: NzI18nService) { }
  switchLanguage() {
    this.i18n.setDateLocale(vi); // Switch language to Japanese at runtime
  }
}
