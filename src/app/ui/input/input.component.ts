import { Component, ElementRef, forwardRef, input, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FontAwesomeModule,ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  additionalClass=input<string>();
  submited=input<boolean>(false)
  form=input<FormGroup>()
  placeholder=input<string>();
  type=input<string>('text');
  @Input() icon?:IconProp;

  public formControl: FormControl = new FormControl();
  writeValue(value: any) {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: Function) {
    this.formControl.valueChanges.subscribe((val) => fn(val));
  }

  registerOnTouched(fn: Function) {
    this.formControl.valueChanges.subscribe((val) => fn(val));
  }

  @ViewChild("inputField") inputField!:ElementRef;

  focusOnInput(){
    this.inputField.nativeElement.focus();
  }
}
