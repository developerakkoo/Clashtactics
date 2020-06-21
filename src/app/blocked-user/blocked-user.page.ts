import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blocked-user',
  templateUrl: './blocked-user.page.html',
  styleUrls: ['./blocked-user.page.scss'],
})
export class BlockedUserPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotToLogin(){

    this.router.navigate(['/auth']);
  }
}
