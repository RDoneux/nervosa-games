import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavigationModule } from './components/top-navigation/top-navigation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterModule } from './components/footer/footer.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    TopNavigationModule,
    FooterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
