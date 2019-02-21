import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {

  input: any

  @Input() label: string
  @Input() errorMessage: string

  @ContentChild(FormControlName) control: FormControlName

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.input = this.control
    if(this.input === undefined){
      throw new Error('Esse componente precisa ser utilizado com uma diretiva NgModel')
    }
  }

  hasSuccess() {
    return this.input.valid && (this.input.touched || this.input.dirty)
}

  hasError() {
    return this.input.invalid && (this.input.touched || this.input.dirty)
}
}
