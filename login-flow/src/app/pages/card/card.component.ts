import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/Backend/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  helloMessage: string = "";

  constructor(private apiService: ApiService, private router: Router) { }

  data:any;

  ngOnInit(): void {

    this.apiService.getHelloWorld().subscribe((data: any) => {
      this.helloMessage = data;
    },
    error => {
      console.error('Error fetching data:', error);
    });

    this.data = [
      {
        id:1,
        name:"ToDo Free",
        details:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        price:0,
        dImg:"https://images.unsplash.com/photo-1627850604058-52e40de1b847?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id:2,
        name:"ToDo Pro",
        details:"Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
        price:1.99,
        dImg:"https://images.unsplash.com/photo-1641154706848-fe27fd366032?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id:3,
        name:"ToDo Premium",
        details:"Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
        price:4.39,
        dImg:"https://plus.unsplash.com/premium_photo-1683309568772-57011d6c1b7b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ]
  }

  checkout(item: any){
    this.router.navigate(['/check'], { state: { item } });
  }

}
