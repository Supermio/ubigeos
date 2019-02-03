import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' }
  /*,  { path: 'prov/:id', redirectTo: '/tabs/tab2/:id', pathMatch: 'full' },
  { path: 'dist/:id', redirectTo: '/tabs/tab3/:id', pathMatch: 'full' }
  , { path: 'deps', loadChildren: './ubigeo/deps/deps.module#DepsPageModule' },
  { path: 'provs', loadChildren: './ubigeo/provs/provs.module#ProvsPageModule' },
  { path: 'dists', loadChildren: './ubigeo/dists/dists.module#DistsPageModule' }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
