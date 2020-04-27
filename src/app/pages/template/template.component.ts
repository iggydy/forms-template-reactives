import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: ''
  };

  paises: any[] = [];

  constructor( private pais: PaisService) { }

  ngOnInit(): void {

    this.pais.getPaises()
    .subscribe( (paises: any) => {
      this.paises = paises;

      this.paises.unshift({
        nombre: 'Selecciones País',
        codigo: ''
      });
    });
  }

  guardar( form: NgForm) {
    console.log(form.value);

    if (form.invalid) {

      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }
  }

}
