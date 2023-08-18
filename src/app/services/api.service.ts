import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter, first, iif, tap } from "rxjs";

export interface Whoami {
  username: string;
}

@Injectable({ providedIn: "root" })
export class API {
  private readonly whoamiSubject = new BehaviorSubject<Whoami | null>(null);

  public readonly whoami$ = this.whoamiSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  init(): Observable<any> {
    return this.getWhoami();
  }

  logIn(username: string): Observable<Whoami> {
    return this.http
      .post<Whoami>(
        "/api/login",
        { username },
        {
          observe: "body",
        }
      )
      .pipe(tap((data) => this.whoamiSubject.next(data)));
  }

  logOut(): Observable<unknown> {
    return this.http.post("/api/logout", { observe: "body" }).pipe(
      tap(() => {
        this.whoamiSubject.next(null);
      })
    );
  }

  getWhoami(): Observable<Whoami> {
    return iif(
      () => !this.whoamiSubject.value,
      this.http
        .get<Whoami>("/api/whoami", {
          observe: "body",
        })
        .pipe(tap((data) => this.whoamiSubject.next(data))),
      this.whoamiSubject.pipe(
        filter((data): data is Whoami => data !== null),
        first()
      )
    );
  }
}
