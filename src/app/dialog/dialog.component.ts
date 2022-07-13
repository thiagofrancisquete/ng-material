import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand new', 'Second hand', 'Refurbished'];
  productForm!: FormGroup;
  actionBtn = 'Save'

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any, // passando os dados da tabela pro modal
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    // se recebe um dado é edição
    if(this.editData) {
      // setando o valor em cada prop
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date )

      this.actionBtn = 'Update'
    }
  }

  addProduct() {
    if(!this.editData) {
      if (this.productForm.valid) {
        this.api.add(this.productForm.value).subscribe(
          (success) => {
            alert('sucesso');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          (err) => console.log(err.message)
        );
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.edit(this.productForm.value, this.editData.id).subscribe(
      (res) => {
        alert('Editado com sucesso');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      (err)=> alert(`Erro: ${err.message}`)
    )
  }

}
