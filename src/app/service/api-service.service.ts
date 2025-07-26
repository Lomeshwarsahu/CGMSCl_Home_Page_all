import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Base } from '../helper/base';
import { BehaviorSubject, Observable } from 'rxjs';
import { TenderData, TenderRCData, WarehouseInfo } from '../model/model';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private colorSubject = new BehaviorSubject<string>(sessionStorage.getItem('selectedColor') || 'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)');
  selectedColor$ = this.colorSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) { this.baseUrl = Base.baseUrl;this.baseurl_ = Base.baseurl_ }
  // private apiUrl = 'https://rangkar-1.onrender.com';
  baseUrl: any;
  baseurl_:any;
  // get(url: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/${url}`);
  // }
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/',
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetContentHeader?contentRegId=201408000001
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetTenderRef
    // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetContentAttachment?contentRegId=201408000001
    // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetDrugTenderListAll
// https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetEquipmentListAll
// https://localhost:7247/api/WebCgmsc/GetCivilTenderListAll
// 'https://localhost:7247/api/WebCgmsc/GetOtherTenderListAll'


  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetDrugTenderList?n=2 ya 0
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetEquipmentList?n=2
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetCivilTenderList?n=2
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetOtherTenderList?n=2
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetMostVisitedContentList?n=2
  
  // https://dpdmis.in/CGMSCHO_API2/api/HOD/WarehouseInfo?distid=0

  // getWarehouseInfo(distid: any): Observable<any> {
  //   return this.http.get<WarehouseInfo[]>(${this.CGMSCHO_API2}/HOD/WarehouseInfo?distid=${distid});
  // }
  // https://dpdmis.in/CGMSCHO_API2/api/HOTender/WhMangerSSODetail
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetDept
  
    // https://dpdmis.in/cdn/Event/
    // https://dpdmis.in/cdn/News/
    Getnewimage(){
      return this.http.get<any>(`https://dpdmis.in/cdn/News/`); 
    }
  getWarehouseInfo(distid: any): Observable<any> {
    return this.http.get<WarehouseInfo[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOD/WarehouseInfo?distid=${distid}`);
  }
  getWarehouse(): Observable<any> {
    return this.http.get<WarehouseInfo[]>(`https://dpdmis.in/CGMSCHO_API2/api/HOTender/WhMangerSSODetail`);
  }

  getEquipmentRC(tenderId: any): Observable<any> {
    return this.http.get<TenderRCData[]>(`https://cgmsc.gov.in/himis_apin/api/EMS/GetEqpRC?tenderID=${tenderId}`);
  }
  
  getEquipTender(): Observable<any> {
    return this.http.get<TenderData[]>(`https://cgmsc.gov.in/himis_apin/api/EMS/GetEqpTender`);
  }

  // GetActiveFeedbackTypes(): Observable<any> {
  //   return this.http.get<any[]>(`https://www.cgmsc.gov.in/himis_apin/api/Feedback/GetActiveFeedbackTypes`);
  // }


  public get1(url: string, options?: any): Observable <any> {
   
     return this.http.get(this.baseurl_ + url, options); 
     }
     public post1(url: string, data: any, options?: any) {
      // debugger;
       return this.http.post(this.baseurl_ + url, data, options); 
      }

  public get(url: string, options?: any): Observable <any> {
     return this.http.get(this.baseUrl + url, options); 
     }
  public post(url: string, data: any, options?: any) {
    // debugger;
     return this.http.post(this.baseUrl + url, data, options); 
    }
  public put(url: string, data: any, options?: any) {
     return this.http.put(this.baseUrl + url, data, options); 
    }
  public delete(url: string, options?: any) {
     return this.http.delete(this.baseUrl + url, options); 
    }

    setColor(color: string) {
      sessionStorage.setItem('selectedColor', color);
      this.colorSubject.next(color);
    }
  
}
