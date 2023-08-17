import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { API } from "../services/api.service";
import { JsonPipe } from "@angular/common";
import { switchMap } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.template.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
})
export default class LoginComponent {
  protected readonly form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true
    })
  })

  constructor(private readonly api: API, private readonly router: Router) {}

  login() {
    return this.api.logIn(this.form.value.username!).pipe(
      switchMap(() => this.router.navigateByUrl('/dashboard'))
    ).subscribe()
  }
}
