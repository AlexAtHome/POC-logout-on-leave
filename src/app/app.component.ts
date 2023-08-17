import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {
  @HostListener('window:beforeunload')
  logout(): void {
    fetch('/api/logout', {
      method: 'DELETE',
      keepalive: true
    })
  }
}
