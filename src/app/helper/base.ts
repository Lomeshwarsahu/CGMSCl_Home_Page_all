import { formatDate } from "@angular/common";


export const Base = {
    imageUrl: 'https://bihav.co.in/Uploads/Restaurant',
    offerUrl: 'https://bihav.co.in/Uploads/Offer_image',
    ItemUrl: 'https://bihav.co.in/Uploads/Item_image',
    logoUrl: 'https://bihav.co.in/Uploads/Restaurant',
    img_urlseva: 'http://sevagudiadmin.shivaminfosoft.in/uploads/products',
    adminAppUrl: 'https://bihav.co.in',
    webAppUrl: 'https://bihav.co.in',
    // https://rangkar-1.onrender.com

// cgmsc api
    baseUrl: 'https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/',


    // baseUrl: 'http://producttrackingapi.shivaminfosoft.in/api/',
    userImgUrl: 'http://producttrackingapi.shivaminfosoft.in/Uploads/Users',

    currency: 'INR',
    date_time_validator: 'dd-MMM-yyyy, hh:mm a',
    date_validator: 'dd/MM/yyyy',
    EmailValidator:'^(((\\+91-?)|0)?[0-9]{10})$|^([a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4})$',
    MobileValidator:'^((\\+91-?)|0)?[0-9]{10}$',
    PasswordValidator:'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
    decimal_point_in_currency: 2,

    
    get_date() {
        //var to_date = new Date().toISOString();
        //to_date = new Date().toUTCString();

        //  ChangedFormat = pipe.transform(this.to_date, 'dd/MM/YYYY');
        // mydate = this.datePipe.transform(this.to_date, 'yyyy-MM-dd');
        //  cValue = formatDate(this.to_date, 'dd-MM-yyyy', 'en-US');
        //  cValue$ = formatDate(this.to_date, 'dd-MM-yyyy', 'en-US');
        // var date:string =formatDate(new Date().toISOString(), this.default_date_formate_In_Date, 'en-IN');

        return formatDate(new Date().toISOString(), this.date_time_validator, 'en-IN');
    },
    get_status_kot(status: any, delivery_type: string) {
        switch (delivery_type) {
            case "Dine In":
                switch (status) {
                    case 1: return '<span class=" mr-2 font-weight-bold text-success">Served</span>'; break;
                    case 2: return '<span class=" mr-2 font-weight-bold text-danger">Deleted</span>'; break;
                    case 3: return '<span class=" mr-2 font-weight-bold text-secondary">Invoiced</span>'; break;
                    case -1: return '<span class=" mr-2 font-weight-bold text-warning">Preparing</span>'; break;
                    default: return '<span class=" mr-2 font-weight-bold text-info">Pending</span>'; break;
                }
            default: switch (status) {
                case 1: return '<span class=" mr-2 font-weight-bold text-success">Served</span>'; break;
                case 2: return '<span class=" mr-2 font-weight-bold text-danger">Deleted</span>'; break;
                case 3: return '<span class=" mr-2 font-weight-bold text-secondary">Invoiced</span>'; break;
                case -1: return '<span class=" mr-2 font-weight-bold text-success">Preparing</span>'; break;
                default: return '<span class=" mr-2 font-weight-bold text-info">Pending</span>'; break;
            }
        }

    },
    get_stars_html(rating: any) {
        if (!rating) return '';
        rating = Math.ceil(rating);
        switch (rating) {
            case 1: return '<ul class="rating-stars list-unstyled"><li><i class="feather-star star_active"></i><i class="feather-star"></i><i class="feather-star"></i><i class="feather-star"></i><i class="feather-star"></i></li></ul>'; break;
            case 2: return '<ul class="rating-stars list-unstyled"><li><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star"></i><i class="feather-star"></i><i class="feather-star"></i></li></ul>'; break;
            case 3: return '<ul class="rating-stars list-unstyled"><li><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star"></i><i class="feather-star"></i></li></ul>'; break;
            case 4: return '<ul class="rating-stars list-unstyled"><li><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star"></i></li></ul>'; break;
            case 5: return '<ul class="rating-stars list-unstyled"><li><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star star_active"></i></li></ul>'; break;
            default: return ''; break;
        }
    },
    redirect_to_module(role: string) {
        // if (!role) return '';
        switch (role) {
            case 'superAdmin': return '<ul class="rating-stars list-unstyled"><li><i class="feather-star star_active"></i><i class="feather-star"></i><i class="feather-star"></i><i class="feather-star"></i><i class="feather-star"></i></li></ul>'; break;
            case 'admin': return '<ul class="rating-stars list-unstyled"><li><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star"></i><i class="feather-star"></i><i class="feather-star"></i></li></ul>'; break;
            case 'Customer': return '<app-otp></app-otp>'; break;
            case 'kot': return '<ul class="rating-stars list-unstyled"><li><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star"></i><i class="feather-star"></i><i class="feather-star"></i></li></ul>'; break;
            case 'dileveryBoy': return '<ul class="rating-stars list-unstyled"><li><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star"></i><i class="feather-star"></i><i class="feather-star"></i></li></ul>'; break;
            case 'hotel': return '<ul class="rating-stars list-unstyled"><li><i class="feather-star star_active"></i><i class="feather-star star_active"></i><i class="feather-star"></i><i class="feather-star"></i><i class="feather-star"></i></li></ul>'; break;
            default: return ''; break;
        }
    }
//#region 
// onButtonClick(URL: any) {
//     if (URL) {
//       // Remove '~' from the start of the URL
//       // const cleanedUrl = 'https://cgmsc.gov.in/' + URL.replace(/^~\//, '');
//       // console.log('Opening:', URL);
//     return  window.open(URL, '_blank');
//     } else {
//      return alert(
//         '⚠️ Alert: Attachment File Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.'
//       );
//     }
//   }

//#endregion



}
