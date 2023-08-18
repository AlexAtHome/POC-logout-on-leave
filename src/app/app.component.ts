import { Component, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {
  @HostListener("window:unload")
  logout(): void {
    const pageAccessedByReload = window.performance
      .getEntriesByType("navigation")
      .some((nav) => {
        const entry = nav as PerformanceNavigationTiming;
        return entry.type === "reload";
      });

    if (!pageAccessedByReload) {
      fetch("/api/logout", {
        method: "DELETE",
        keepalive: true,
      });
    }
  }
}
