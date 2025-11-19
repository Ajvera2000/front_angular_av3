import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl }  from '@angular/forms';
import { error } from 'console';
import Swal from 'sweetalert2'; 

interface Categoria {
  id?: number;
  nombre: string;
  detalle: string;
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

  private categoriaService = inject(CategoriaService);

  categorias: Categoria[] = [];
  visible: boolean = false
  categoria_id: number = -1;

  categoriaForm: FormGroup<any> = new FormGroup({
    nombre: new FormControl(''),
    detalle: new FormControl('')
  });

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.funListar().subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  mostrarDialog() {
    this.visible = true
  }

  guardarCategoria() {
    if (this.categoria_id > 0) {
      this.categoriaService.funModificar(this.categoria_id, this.categoriaForm.value).subscribe(
        (res: any) => {
          this.visible = false;
          this.getCategorias();
          this.categoria_id = -1;

          Swal.fire({
            title:"Registrado",
            text:"La Categoria se Creo con Exito",
            icon:"success"
          })
        },
        (error: any) => {
          console.log(error);
        }
      )
    }
    else {
      this.categoriaService.funGuardar(this.categoriaForm.value).subscribe(
        (res: any) => {
          this.visible = false;
          this.getCategorias();
        },
        (error: any) => {
          console.log(error)
        }
      )
    }
    this.categoriaForm.reset();
  }

  editarCategoria(cat: Categoria) {
    this.visible = true
    this.categoria_id = cat.id ?? -1
    this.categoriaForm.setValue({
      nombre: cat.nombre,
      detalle: cat.detalle
    })
  }

  eliminarCategoria(cat: Categoria) {
    Swal.fire({
      title:"¿Esta seguro de eliminar la categoria",
      text:"una vez eliminado no se podra recuperar!",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:"#3085d6",
      cancelButtonColor:"#d33",
      confirmButtonText:"si, eliminar!"
    }).then((result)=>{
      if(result.isConfirmed){
        this.categoriaService.funEliminar(cat.id!).subscribe(
          (res:any)=>{
            Swal.fire({
              title:"ELIMINADO!",
              text:"Categoria Eliminada.",
              icon:"success"
            });
            this.getCategorias();
            this.categoria_id=-1
          },
          (error:any)=>{
            Swal.fire({
              title:"ERROR!",
              text:"Error al Intentar Eliminar.",
              icon:"error"
            });
          }
        )
      }
    }
  )
  }

}
