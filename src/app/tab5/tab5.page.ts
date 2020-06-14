import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

   townhall: any = [
    {
      id: 7,
      name: "Townhall 7"
    },
    {
      id: 8,
      name: "Townhall 8"
    },
    {
      id: 9,
      name: "Townhall 9"
    },
    {
      id: 10,
      name: "Townhall 10"
    },
    {
      id: 11,
      name: "Townhall 11"
    },
    {
      id: 12,
      name: "Townhall 12"
    },
    {
      id: 13,
      name: "Townhall 13"
    },


  ]
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onOpenTownHallPage(id){
    console.log(id);
    this.router.navigate(['/townhallsection', id]);
    
  }
}
