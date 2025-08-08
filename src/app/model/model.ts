import { StringToken } from "@angular/compiler";

export class Model {
    userName: string | undefined;
    userPassword: string | undefined;
    // confirm_password: string | undefined;
    // otp: string | undefined;
    // otP_for:string | undefined;
}
//#region  home page 
export interface Data_model {

    sno:any;
    url: string;
    content_Registration_Id: string;
    attachment_Id: string;
    caption: string;
    content_Discription: string;
    subject: string;
    content_Subject: string;
    content_Publising_Date: string;
    expiry_Date_of: string;
    expiry_DateOnNotice_Board: string;
    displayNew: string;
   
  }
export interface AllCateDrugTenderList {

    sno:any;
    url: string;
    content_Registration_Id: string;
    attachment_Id: string;
    caption: string;
    content_Discription: string;
    subject: string;
    content_Subject: string;
    content_Publising_Date: string;
    expiry_Date_of: string;
    expiry_DateOnNotice_Board: string;
    displayNew: string;
    contentCategoryName:string;
  }
  export interface GetMostVisitedContentList {
      url: string
      content_Registration_Id: string
      content_Subject: string
      content_Publising_Date: string
      expiry_DateOnNotice_Board: string
      date_timestamp: string
      contentCategoryName: string
  }
  export interface ContentAttachment {
    sno:number;
    fileName: string;
    filePath: any;
    caption: string;
    displayNew: string;
  }
  export interface ContentHeader {
    content_Registration_Id:string;
    content_Discription: string;
    content_Subject: any;
    contentCategoryName: string;
     // {
  //   "content_Registration_Id": "201408000001",
  //   "content_Discription": "Results After Interview Held On 08-08-2013 for the post of General Manager (Admin),Deputy Manager(Purchase &amp;amp;amp; Operation),Bio medical Engineer,Tender &amp;amp;amp; Purchase Officer",
  //   "content_Subject": "Results After Interview Held On 08-08-2013",
  //   "contentCategoryName": "Recruitment Result"
  // }
  }
//#endregion

export interface WarehouseInfo{
  warehouseid: number;
  warehousename: string;
  nosfac: number;
  address: string;
  email: string;
  latitude: string;
  longitude: string;
  nosvehicle: number;
  nosdist: number;
  moB1: string;
  position:any;

 
}
export interface drugWarehouseInfo{
  sno:number;
  warehouseId: number;
  warehouseName: string;
  address: string;
  amId: number;
  amName: string;
  amMobileNo: number;
  soId: number;
  soName: string;
  soMobileNo: number;
}

export interface Employee{
  sno:number;
  fullName: string;
  designation: string;
  department: number;
  emailId: number;
  contactNo: number;
}
export interface drugProBlacklisted{
  sno:number;
  nameofProduct: string;
  nameOfFirm: string;
  address: string;
  fromdate: string;
  upto: string;
  reasonOfBlacklisting: string;
  spremarks: string;

}


export interface Employee_dpt{
  coreDept:string; 
}

export interface NoticCircular {
  sno:number;
  countATT: string;
  expr1: string;
  content_Registration_Id: string;
  content_Subject: string;
  displayNew: string;
  department: string;
  content_Discription: string;
  content_Publising_Date: string;
  expiry_DateOnNotice_Board: string;
  expiry_DateOnDepartment_Board: string;
  status: string;
  date_TimeStamp: string;
  ip: any;
  systemInfo: any;
  createrUserName: string;
  contentCategoryCode: string;
  contentCategoryName: string;
}
// Feedback
export class FeedbackDTO{
  firstName!: string;
  lastName!: string;
  email!: string;
  address!: string;
  mobileNumber!: string;
  city!: string;
  subject!: string;
  feedbackTypeId!: number;
  comments!: string;
  topicId!: number;
}
export interface GetMediaResponse {
  sno:number;
  url: string
  content_Registration_Id: string
  attachment_Id: string
  caption: string
  content_Discription: string
  subject: string
  content_Subject: string
  content_Publising_Date: string
  expiry_Date_of: string
  expiry_DateOnNotice_Board: string
  displayNew: string
}

export interface BlacklistedFirm {
   sno:number;
  nameOfFirm: string;
  address: string;
  fromdate: string;
  upto: string;
  reasonOfBlacklisting: string;
}

export interface DeptCategory {
  countATT: string
  expr1: string
  content_Registration_Id: string
  content_Subject: string
  displayNew: string
  department: any;
  content_Discription: string
  content_Publising_Date: string
  expiry_DateOnNotice_Board: string
  expiry_DateOnDepartment_Board: string
  status: string
  date_TimeStamp: string
  createrUserName: string
  contentCategoryCode: string
  expiry_Date_of: string
  recruitmentScheme: string
  contentCategoryName: string
}

export interface SchemeData{
    recruitmentId: string
  recruitmentScheme: string 
  //  recruitmentId: "1", recruitmentScheme: "RBSK" }
}

export interface CategoryData {
  contentCategoryCode: string
  contentCategoryName: string
}

export interface TenderData {
  tender_Id: string
  tender_No: string
  // tender_Id: "1", tender_No: "RBSK" }
}

export interface TenderRCData {
  contract_item_id: number
  item_codeE: string
  item_nameE: string
  basic_rate: number
  percentage: number
  single_unit_price: number
  model: string
  contract_date: string
  contract_duration: number
  contract_end_date: string
  name: string
  tender_no: string
  tender_id: number
  webSiteUploadID: string
  file_name: string
  upload_folder_name: string
  item_id: number
  is_extended: any
  contract_new_end_date: any
}

export interface results_notice_recruitment {
  sno:number;
  countATT: string
  categoryCodeMaster: string
  categoryCodeContent: string
  contentRegistrationId: string
  contentSubject: string
  displayNew: string
  expiryYear: string
  currentYear: string
  department: any
  contentDescription: string
  contentPublishingDate: string
  expiryDateOnNoticeBoard: string
  expiryDateOnDepartmentBoard: string
  status: string
  dateTimeStamp: string
  ip: any
  systemInfo: any
  createrUserName: string
  contentCategoryName: string
}
export interface ContentCategory {
  contentCategoryCode: any;
  contentCategoryName: string;
  // {
  //   "contentCategoryCode": "1",
  //   "contentCategoryName": "Recruitment Notice(HRA)"
  // },
}
