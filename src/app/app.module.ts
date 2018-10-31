import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SqliteBooleanDeserializer } from '../serializers/SqliteBooleanSerializer';
import { FormPageModule } from '../pages/form/form.module';
import { StatsPageModule } from '../pages/stats/stats.module';
import { IonicStorageModule } from '@ionic/storage';
import { GamesProvider } from '../providers/games/games';
import { GameDeserializer } from '../model/GameDeserializer';
import { StatsProvider } from '../providers/stats/stats';
import { AdministrationPageModule } from '../pages/administration/administration.module';
import { AdministrationProvider } from '../providers/administration/administration';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    FormPageModule,
    StatsPageModule,
    AdministrationPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    SqliteBooleanDeserializer,
    GamesProvider,
    StatsProvider,
    GameDeserializer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StatsProvider,
    AdministrationProvider
  ]
})
export class AppModule { }
