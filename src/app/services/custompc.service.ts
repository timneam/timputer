import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustompcService {

  constructor(private http:HttpClient) { }

  getAllCustomPcs() {
    return this.http.get<any[]>('./api/custompcs');
    }

    getOneCustomPc(id){
      console.log(id)
      return this.http.post<any[]>('./api/custompcdetails/', {'id': id});
    }

    insertCustomPc (name: string, price: number,  type: string, cpu:string, ram:string, psu:string, gpu:string, ssd:string, hdd:string, pccase:string) {
      return this.http.post<any[]>('./api/custompcs/', {'customPcName': name, 'customPcPrice': price, 'customPcType': type, 'customPcCpu': cpu, 'customPcRam': ram, 'customPcPsu': psu, 'customPcGpu': gpu , 'customPcSsd': ssd, 'customPcHdd': hdd, 'customPcCase': pccase  });
    } 

    deleteCustomPc(id: number) {
      return this.http.delete<any[]>('./api/custompcs/' + id);
      }

      updateCustomPc(id, name: string, price: number,  type: string, cpu:string, ram:string, psu:string, gpu:string, ssd:string, hdd:string, pccase:string) {
        return this.http.put<any[]>('./api/custompcs/' + id, {'customPcName': name, 'customPcPrice': price, 'customPcType': type, 'customPcCpu': cpu, 'customPcRam': ram, 'customPcPsu': psu, 'customPcGpu': gpu , 'customPcSsd': ssd, 'customPcHdd': hdd, 'customPcCase': pccase});
        }

}
