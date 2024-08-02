import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/breed-list/breed-list.component').then((c) => c.BreedListComponent),
    },
];
