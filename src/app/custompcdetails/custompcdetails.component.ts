import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustompcService } from '../services/custompc.service';

@Component({
  selector: 'app-custompcdetails',
  templateUrl: './custompcdetails.component.html',
  styleUrls: ['./custompcdetails.component.css']
})
export class CustompcdetailsComponent implements OnInit {

  _id: any;
  private sub: any;
  pcs: any []

  constructor(private route: ActivatedRoute, private custompcService: CustompcService) { }

  ngOnInit() {

    this._id = this.route.snapshot.paramMap.get('_id');
    console.log(this._id)
      this.custompcService.getOneCustomPc(this._id).subscribe(result => {
          this.pcs = result;
          console.log(result);
      })

  }

}
