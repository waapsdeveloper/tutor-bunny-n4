import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router'; // Your data service
import { CartService } from 'src/app/services/cart.service';

export const cartListResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(CartService);
  const router = inject(Router);
  let count = await service.getCountPromise();
  if (!count || count == 0) {
    service.getGlobalCartFromApi();
  }

  return count;
  
};
