import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidacionesService } from '../../services/validaciones.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  constructor( private fb: FormBuilder,
               private validator: ValidacionesService) {

    this.crearFormulario();
    this.crearListeners();

  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.form.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }
  get apellidoNoValido() {
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }
  get correoInvalido() {
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }
  get usuarioNoValido() {
    return this.form.get('usuario').invalid && this.form.get('usuario').touched;
  }
  get distritoNoValido() {
    return this.form.get('direccion.distrito').invalid && this.form.get('direccion.distrito').touched;
  }
  get ciudadNoValido() {
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
  }
  get pass1NoValido() {
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;

    return (pass1 === pass2) ? false : true;
  }

  crearFormulario() {
    this.form = this.fb.group({
      nombre: ['',
      [
        Validators.required,
        Validators.minLength(5)]
      ],
      apellido: ['',
      [
        Validators.required,
        this.validator.noHerrera,
        Validators.minLength(2)]
      ],
      correo: ['',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]
      ],
      usuario: ['', Validators.required, this.validator.existeUsuario
      ],
      pass1: ['',
      [
        Validators.required,
      ]
      ],
      pass2: ['',
      [
        Validators.required,
      ]
      ],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validator.samePasswords('pass1', 'pass2')
    });
  }

  crearListeners() {
    // this.form.valueChanges.subscribe(valor => {
    //   console.log(valor);

    // });

    // this.form.statusChanges.subscribe(value => {
    //   console.log({status});
    // });

    this.form.get('nombre').valueChanges.subscribe( console.log);
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.form);
    if (this.form.invalid) {
      return this.form.markAllAsTouched();

    }

    this.form.reset();

  }

}
