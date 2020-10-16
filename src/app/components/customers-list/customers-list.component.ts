import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/domain/icustomer';

import { tap, switchMap } from 'rxjs/operators';

import { CustomersService } from 'src/app/services/customers.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  criteria: string;
  data: ICustomer[];

  constructor(private service: CustomersService,
    private _search: SearchService) { }

  ngOnInit(): void {

   // Récupération du critère de NavBar ==> Méthode brouillon car un observable dans un autre observable
   /* this._search.currentMessage.subscribe(
     msg => {
              this.criteria = msg;

              // Invoquer le service en passant le critère
              this.service.getCustomersByNameContaining(this.criteria).subscribe
              (
                rep => this.data = rep,
                err => console.log(`Attention il y a l'erreur : ${err}`)
              );
            }
    );  */

    this._search.currentMessage
        .pipe(switchMap (    // Using high order RXJS operators with the swithMap
          // c'est un pipeline d'opérators inter-dépendants !
          item => this.service.getCustomersByNameContaining(item)
          ))
        .subscribe(
          result => this.data = result,
          err => console.log(`Attention, il y a l'erreur : ` + err)
        );
/*
// returns an observable
from([1, 2, 3])
  // getting out the values, modifies them, but keeps
  // the same observable as return value
  .pipe(map((item) => item + 1))
  // resolving the observable and getting
  // out the values itself
  .subscribe((item) => console.log(item));
*/
  }

}
