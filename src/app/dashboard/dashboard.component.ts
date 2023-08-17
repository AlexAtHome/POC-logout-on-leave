import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
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

  constructor(private readonly api: API, private readonly router: Router) {}

  logout(): void {
    this.api.logOut().pipe(switchMap(() => this.router.navigateByUrl('/login'))).subscribe()
  }
}
