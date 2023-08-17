import { inject } from "@angular/core";
import { API } from "../services/api.service";
import { Router } from "@angular/router";
import { catchError, map, of } from "rxjs";

export const isAuthorised = () => {
  const api = inject(API);
  const router = inject(Router);
  return api.getWhoami().pipe(
    map((whoami) => !!whoami?.username || router.createUrlTree(["/login"])),
    catchError(() => of(router.createUrlTree(["/login"])))
  );
};

export const isUnauthorized = () => {
  const api = inject(API);
  const router = inject(Router);
  return api.getWhoami().pipe(
    map((whoami) => !whoami?.username || router.createUrlTree(["/dashboard"])),
    catchError(() => of(true))
  );
};
