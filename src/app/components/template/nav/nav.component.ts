import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './sidenasv.service';
import { environment } from 'src/environments/environment';

interface SideNavRoute {
  icon?: string,
  route?: string,
  title?: string,
  fa?: string
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('commandbarSidenav', {static: true})
  public sidenav: MatSidenav;
  
  appTitle : string = environment.applicationTitle

  public routes: SideNavRoute[] = [
    {icon: 'home',  route: '/home', title: 'Início', fa: 'fas fa-home fa-lg'},
    {icon: 'gavel', route: '/trade', title: 'Transações', fa: 'fas fa-exchange-alt fa-lg'},
    {icon: 'account_balance_wallet', route: '/portfolio', title: 'Carteira', fa: 'fas fa-wallet fa-lg'},
    //{icon: 'pie_chart', route: '/composition', title: 'Composição', fa: 'fas fa-chart-pie fa-lg'},
    {icon: 'trending_up', route: '/quotations', title: 'Cotações', fa: 'fas fa-chart-line fa-lg'},
    //{icon: 'access_time', route: '/realTime', title: 'Tempo real', fa: 'fas fa-clock fa-lg'}
  ]
   
  public customerRoutes: SideNavRoute[]

  
  constructor(private commandBarSidenavService : SidenavService, private authService : AuthService) { }

  ngOnInit(): void {
    this.commandBarSidenavService
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }
}
