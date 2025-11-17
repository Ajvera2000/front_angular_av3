import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';


interface categoria{
  id?: number,
  nombre: string;
  detalle?: string
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

  private categoriaService = inject(CategoriaService)

  categorias: categoria[]=[]

  ngOnInit(): void {
      this.getCategorias()
  }

  getCategorias(){
    
  }

}
