import { Component, OnInit } from '@angular/core';
import { CustompcService } from '../services/custompc.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-pc',
  templateUrl: './custom-pc.component.html',
  styleUrls: ['./custom-pc.component.css']
})
export class CustomPcComponent implements OnInit {

  custompcs: any = [];
  customPcForm: FormGroup;
  updateCustomPcDetails: FormGroup;
  closeResult = '';
  modalContent:undefined;
  editContent:undefined;
  custompcId: string;

  searchCustomPC;

  constructor(

    private modalService: NgbModal,
     private reactiveFormModule:ReactiveFormsModule,
     private custompcService: CustompcService,
     private fb: FormBuilder,
     private router:Router

  ) { 

      // Retrieve cpus from the API
      this.custompcService.getAllCustomPcs().subscribe(custompcs => {
        this.custompcs = custompcs;
        console.log(custompcs)
        });
  

  }

  edit(content2, custompc) {
    //this.modalContent = content;
    this.modalContent = custompc
    this.custompcId = custompc._id;
    console.log(content2)
    console.log(custompc)
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'});
  }

  ngOnInit() {

    this.customPcForm = this.fb.group({
      customPcName: '',
      customPcPrice: '',
      customPcType: '',
      customPcCpu: '',
      customPcRam: '',
      customPcPsu: '',
      customPcGpu: '',
      customPcSsd: '',
      customPcHdd: '',
      customPcCase: ''
      });

      this.updateCustomPcDetails = this.fb.group({
        editCustomPcName: '',
        editCustomPcPrice: '',
        editCustomPcType: '',
        editCustomPcCpu: '',
        editCustomPcRam: '',
        editCustomPcPsu: '',
        editCustomPcGpu: '',
        editCustomPcSsd: '',
        editCustomPcHdd: '',
        editCustomPcCase: ''
      })

  }

  onSubmit(){
    this.custompcService.insertCustomPc(
      this.customPcForm.value.customPcName,
      this.customPcForm.value.customPcPrice,
      this.customPcForm.value.customPcType,
      this.customPcForm.value.customPcCpu,
      this.customPcForm.value.customPcRam,
      this.customPcForm.value.customPcPsu,
      this.customPcForm.value.customPcGpu,
      this.customPcForm.value.customPcSsd,
      this.customPcForm.value.customPcHdd,
      this.customPcForm.value.customPcCase).subscribe(results => {
    location.reload();
    });
    }

    deleteCustomPc(id: number)
    {
      this.custompcService.deleteCustomPc(id).subscribe(results => {
      location.reload();
      });
    }

    updateCustomPc()
      {
      this.custompcService.updateCustomPc(this.custompcId,       
        this.updateCustomPcDetails.value.editCustomPcName,
        this.updateCustomPcDetails.value.editCustomPcPrice,
        this.updateCustomPcDetails.value.editCustomPcType,
        this.updateCustomPcDetails.value.editCustomPcCpu,
        this.updateCustomPcDetails.value.editCustomPcRam,
        this.updateCustomPcDetails.value.editCustomPcPsu,
        this.updateCustomPcDetails.value.editCustomPcGpu,
        this.updateCustomPcDetails.value.editCustomPcSsd,
        this.updateCustomPcDetails.value.editCustomPcHdd,
        this.updateCustomPcDetails.value.editCustomPcCase
        ).subscribe(results => {
      location.reload();
    });
  }

}
