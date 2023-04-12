import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1> <button type="button" (click)= "clicar()">click</button>`,

  styles: [`h1 { font-family: Lato; }`]
})

export class HelloComponent  {
  @Input() name=" ";

  clicar(){
    console.log(this.name)
  }
}
