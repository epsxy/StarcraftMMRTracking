import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FormPage } from '../pages/form/form';
import { StatsPage } from '../pages/stats/stats';
import { GamesProvider } from '../providers/games/games';
import { AdministrationPage } from '../pages/administration/administration';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public gamesProvider: GamesProvider) {
    this.initializeApp();


    this.pages = [
      { title: 'Home', icon: 'md-home', component: HomePage },
      { title: 'Games List', icon: 'md-list', component: ListPage },
      { title: 'Upload a game', icon: 'md-arrow-up', component: FormPage },
      { title: 'Statistics', icon: 'md-stats', component: StatsPage },
      { title: 'Administration', icon: 'md-settings', component: AdministrationPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
