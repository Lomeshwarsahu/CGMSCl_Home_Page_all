import { CommonModule, NgClass, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component ,HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CollapseModule } from 'src/app/collapse';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
declare var bootstrap: any;
@Component({
  standalone: true,
  imports: [NavbarComponent, NgFor, NgClass, CollapseModule, CommonModule,TranslateModule],
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  isCollapsed = false;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  selectedColor: any;
  groupedNews: string[][] = [];
  constructor(
    public Service: ApiServiceService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService,) {
    const lang = sessionStorage.getItem('language') || 'en';
    this.translate.use(lang);}

  ngOnInit(): void {
    this.selectedColor = sessionStorage.getItem('selectedColor');
    document.documentElement.style.setProperty(
      '--theme-gradient',
      this.selectedColor
    );
    // this.groupImages(1);
    this.setGroupingBasedOnViewport();
  }
  @HostListener('window:resize', [])
  onResize() {
    this.setGroupingBasedOnViewport();
  }
  setGroupingBasedOnViewport() {
    const width = window.innerWidth;
    this.groupedNews = []; // reset before grouping

    if (width < 768) {
      this.groupImages(1); // mobile
    } else {
      this.groupImages(3); // desktop/tablet
    }
  }

  groupImages(size: number) {
    for (let i = 0; i < this.News.length; i += size) {
      this.groupedNews.push(this.News.slice(i, i + size));
    }
  }

  scrollLeft(container: HTMLElement) {
    container.scrollLeft -= 320; // adjust based on card width + margin
  }

  scrollRight(container: HTMLElement) {
    container.scrollLeft += 320;
  }
  isEventOpen = false;

  toggleEvent() {
    this.isEventOpen = !this.isEventOpen;
  }
  News: string[] = [
    'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-08-04%20at%2015.03.00.jpeg',
    'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-08-04%20at%2015.01.38.jpeg',
    'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-08-04%20at%2015.02.03.jpeg',
    'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-30%20at%2011.25.44%20(1).jpeg',
    'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-30%20at%2011.25.44.jpeg',
    'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-30%20at%2011.25.45.jpeg',
    'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-30%20at%2011.25.46%20(1).jpeg',
    'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-30%20at%2011.25.46.jpeg',
    'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-30%20at%2011.25.47.jpeg',
    'https://dpdmis.in/cdn/News/48385277-51e6-4dcb-a2ff-5beb3b1f8528.jfif',
    'https://dpdmis.in/cdn/News/b2bdb353-f7ed-484b-9d12-f53e2c8cfe85.jfif',
    'https://dpdmis.in/cdn/News/ba0ed618-ec63-4f2b-b977-786fbe807576.jfif',
    'https://dpdmis.in/cdn/News/Capture.JPG',
    'https://dpdmis.in/cdn/News/cd01d37c-4a6c-486b-b3f6-bc94fb650a96.jfif',
    'https://dpdmis.in/cdn/News/img1.jpg.jfif',
    'https://dpdmis.in/cdn/News/news.JPG',
    'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-05-19%20at%209.42.17%20PM.jpeg',
    'https://dpdmis.in/cdn/News/img1.jpg.jfif',
    'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-11%20at%2012.03.15.jpeg',
  ];
  events: string[] = [
    'https://dpdmis.in/cdn/Event/DSC_2677.JPG',
    'https://dpdmis.in/cdn/Event/photo_5.jpg',
    'https://dpdmis.in/cdn/Event/DSC_2865.JPG',
    'https://dpdmis.in/cdn/Event/DSC_2581.JPG',
    'https://dpdmis.in/cdn/Event/DSC_2674.JPG',
    'https://dpdmis.in/cdn/Event/DSC_2804.JPG',
    'https://dpdmis.in/cdn/Event/DSC_2873.JPG',
    'https://dpdmis.in/cdn/Event/DSC_2883.JPG',
    'https://dpdmis.in/cdn/Event/DSC_4610.JPG',
    'https://dpdmis.in/cdn/Event/WhatsApp%20Image%202025-07-02%20at%2010.59.50%20(2).jpeg',
    'https://dpdmis.in/cdn/Event/ev1.jpeg',
    'https://dpdmis.in/cdn/Event/ev2.jpeg',
    'https://dpdmis.in/cdn/Event/ev3.jpeg',
    // 'https://dpdmis.in/cdn/Event/ev4.jpeg',
    'https://dpdmis.in/cdn/Event/ev5.jpeg',
    'https://dpdmis.in/cdn/Event/ev6.jpeg',
    'https://dpdmis.in/cdn/Event/ev7.jpeg',
    // '',
  ];
  drugs: string[] = [
    'https://dpdmis.in/cdn/drugs/drug_sukh.jpeg',
    'https://dpdmis.in/cdn/drugs/2.jpg',
    'https://dpdmis.in/cdn/drugs/4.jpeg',
    'https://dpdmis.in/cdn/drugs/8.jpeg',
    'https://dpdmis.in/cdn/drugs/9.jpeg',
    'https://dpdmis.in/cdn/drugs/3.jpeg',
    'https://dpdmis.in/cdn/drugs/19.jpeg',
    'https://dpdmis.in/cdn/drugs/37.jpeg',
    'https://dpdmis.in/cdn/drugs/27.jpeg',
    'https://dpdmis.in/cdn/drugs/40.jpeg',
    'https://dpdmis.in/cdn/drugs/36.jpeg',
    // 'https://dpdmis.in/cdn/drugs/WhatsApp%20Image%202025-07-02%20at%2010.59.45%20(1).jpeg',
    'https://dpdmis.in/cdn/drugs/WhatsApp%20Image%202025-07-02%20at%2010.59.46.jpeg',
    'https://dpdmis.in/cdn/drugs/WhatsApp%20Image%202025-07-02%20at%2010.59.49%20(2).jpeg',
    'http://dpdmis.in/cdn/drugs/WhatsApp%20Image%202025-07-02%20at%2010.59.49.jpeg',
  ];
  Infrastructure: string[] = [
    'https://dpdmis.in/cdn/Infrastructure/Picture4.png',
    'https://dpdmis.in/cdn/Infrastructure/Picture2.png',
    'https://dpdmis.in/cdn/Infrastructure/Picture1.png',
    'https://dpdmis.in/cdn/Infrastructure/Picture5.png',
    'https://dpdmis.in/cdn/Infrastructure/Picture3.png',
    'https://dpdmis.in/cdn/Infrastructure/Picture6.jfif',
    'https://dpdmis.in/cdn/Infrastructure/picture7.jfif',
    'https://dpdmis.in/cdn/Infrastructure/Picture10.png',
    'https://dpdmis.in/cdn/Infrastructure/Picture11.png',
    'https://dpdmis.in/cdn/Event/WhatsApp%20Image%202025-07-02%20at%2010.59.51%20(1).jpeg',
    'https://dpdmis.in/cdn/Event/WhatsApp%20Image%202025-07-02%20at%2010.59.51.jpeg',
    'https://dpdmis.in/cdn/Event/WhatsApp%20Image%202025-07-02%20at%2010.59.51%20(2).jpeg',
  ];
  equipment: string[] = [
    'https://dpdmis.in/cdn/equipment/equipLeader.jpeg',
    'https://dpdmis.in/cdn/equipment/equipLeader1.jpeg',
    'https://dpdmis.in/cdn/equipment/32%20slice%20CT%20scan.jfif',
    'https://dpdmis.in/cdn/equipment/CT%20SCAN.jpeg',
    'https://dpdmis.in/cdn/equipment/Multipara%20monitor.jpeg',
    'https://dpdmis.in/cdn/equipment/VENTILATOR.jpeg',
  ];
  selectedIndex = 0;

  get selectedImage(): string {
    return this.News[this.selectedIndex];
  }
  openModal(index: number) {
    this.selectedIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('NewimageModal'));
    modal.show();
  }
  get selectedImage1(): string {
    return this.events[this.selectedIndex];
  }
  openModal1(index: number) {
    this.selectedIndex = index;
    const modal = new bootstrap.Modal(
      document.getElementById('EventimageModal')
    );
    modal.show();
  }
  get selectedImageDrug(): string {
    return this.drugs[this.selectedIndex];
  }
  openModalDrug(index: number) {
    this.selectedIndex = index;
    const modal = new bootstrap.Modal(
      document.getElementById('DrugimageModal')
    );
    modal.show();
  }
  get selectedImageCivil(): string {
    return this.Infrastructure[this.selectedIndex];
  }
  openModalCivil(index: number) {
    this.selectedIndex = index;
    const modal = new bootstrap.Modal(
      document.getElementById('InfrastructureimageModal')
    );
    modal.show();
  }
  get selectedImageEquipment(): string {
    return this.equipment[this.selectedIndex];
  }
  openModalEquipment(index: number) {
    this.selectedIndex = index;
    const modal = new bootstrap.Modal(
      document.getElementById('equipmentimageModal')
    );
    modal.show();
  }
  prevImage() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.News.length) % this.News.length;
  }

  nextImage() {
    this.selectedIndex = (this.selectedIndex + 1) % this.News.length;
  }
  prevImage1() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.events.length) % this.events.length;
  }

  nextImage1() {
    this.selectedIndex = (this.selectedIndex + 1) % this.events.length;
  }
  prevImageDrug() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.drugs.length) % this.drugs.length;
  }

  nextImageDrug() {
    this.selectedIndex = (this.selectedIndex + 1) % this.drugs.length;
  }
  prevImageCivil() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.Infrastructure.length) %
      this.Infrastructure.length;
  }

  nextImageCivil() {
    this.selectedIndex = (this.selectedIndex + 1) % this.Infrastructure.length;
  }
  prevImageequipment() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.equipment.length) % this.equipment.length;
  }

  nextImageequipment() {
    this.selectedIndex = (this.selectedIndex + 1) % this.equipment.length;
  }
  // EventimageModal
}
