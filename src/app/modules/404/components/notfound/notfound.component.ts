// not-found.component.ts
import { Component } from '@angular/core';

@Component({
  template: `
    <div>
      <h2>404 - Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  `,
  styles: [
    `
      div {
        text-align: center;
        margin-top: 50px;
      }

      h2 {
        color: #d9534f;
      }
    `,
  ],
})
export class NotFoundComponent {}
