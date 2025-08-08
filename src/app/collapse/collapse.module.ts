import { NgModule, ModuleWithProviders } from '@angular/core';
import { CollapseDirective } from './collapse.directive';

@NgModule({
  imports: [CollapseDirective],        
  exports: [CollapseDirective]
})
export class CollapseModule {

static forRoot(): ModuleWithProviders<CollapseModule> {
    return {
      ngModule: CollapseModule,
      providers: []
    };
  }
  
}
