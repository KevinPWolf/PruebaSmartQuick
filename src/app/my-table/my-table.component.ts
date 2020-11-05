import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})

export class MyTableComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  persons: any = [];
  dataRes:any=[];

  dtTrigger: Subject<any> = new Subject();
  path = "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {    
    this.http.get(this.path).subscribe(data=>{      
      this.persons=data.valueOf();
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    body.then(data => {
      return data;
    });
  }

}


