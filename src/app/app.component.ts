import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import hmacSHA512 from 'crypto-js/hmac-sha512'; //npm install crypto-js
import Base64 from 'crypto-js/enc-base64';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PAYWAY';

  constructor(private http: HttpClient) { }

  submitForm() {
    let ord_id = '20';
    let price = 19;

    let item = new Array();
    item[0] = { name: "Wall ball 6 kg", quantity: 1, price: price };
    let items = btoa(JSON.stringify(item));
    let hash = getHash(ord_id, price, items);

    let abaContent: Array<any> = [
      {
        tran_id: ord_id,
        amount: price,
        hash: hash,
        items: items,
        firstname: 'KLEY',
        lastname: 'MI',
        phone: '092565551',
        email: 'kleymi908@gmail.com'
      }
    ];
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    debugger;
    
    // this.http.post('https://sandbox.payway.com.kh/sandbox/api/903/', abaContent, { headers: myheader }).subscribe(
    //   (response) =>        
    //   console.log(response),
    //   (error) =>        
    //   console.log(error)
    // );

    
    let body = new HttpParams();
    body = body.set('tran_id', ord_id);
    body = body.set('amount', price.toString());
    body = body.set('hash', hash);
    body = body.set('items', items);
    body = body.set('firstname', 'KLEY');
    body = body.set('lastname', 'MI');
    body = body.set('phone', '092565551');
    body = body.set('email', 'kleymi908@gmail.com');

    this.http.post('https://sandbox.payway.com.kh/sandbox/api/903/', body, { headers: myheader })
      .subscribe(
        (response) =>
          console.log(response),
        (error) =>
          console.log(error)
      );


  }
}

function getHash(paymentId: string, amount: number, items: string) {
  let hash = Base64.stringify(hmacSHA512("ec000903" + paymentId + amount + items, "43195da867b2feb9d71badaf73d5fffc1deebde8"));
  return hash;
}
