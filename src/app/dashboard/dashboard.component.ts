import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, signal } from "@angular/core";
import { API } from "../services/api.service";
import { switchMap } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe]
})
export default class DashboardComponent {
  @Input() username!: string

  public readonly counter = signal(0)

  constructor(private readonly api: API, private readonly router: Router) {}

  count() {
    this.counter.update(val => ++val)
  }

  logout(): void {
    this.api.logOut().pipe(switchMap(() => this.router.navigateByUrl('/login'))).subscribe()
  }
}
