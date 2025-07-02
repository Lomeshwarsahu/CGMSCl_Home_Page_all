// import { NgModule, ModuleWithProviders } from '@angular/core';
// import { CollapseDirective } from './collapse.directive';


// @NgModule({
//     imports: [CollapseDirective],
// //   declarations: [CollapseDirective],
//   exports: [CollapseDirective]
// })
// export class CollapseModule {
//   static forRoot(): ModuleWithProviders {
//     return { ngModule: CollapseModule, providers: [] };
//   }
// }

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CollapseDirective } from './collapse.directive';

@NgModule({
  imports: [CollapseDirective],         // ✅ for standalone directive
  exports: [CollapseDirective]
})
export class CollapseModule {
//   static forRoot(): ModuleWithProviders<CollapseModule> {  // ✅ Add type here
//     return { ngModule: CollapseModule, providers: [] };
//   }
static forRoot(): ModuleWithProviders<CollapseModule> {
    return {
      ngModule: CollapseModule,
      providers: []
    };
  }
  
}
