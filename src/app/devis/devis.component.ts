import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {

  name = '';
  firstName = '' ;
  val = {
    name: '',
    firstName: '',
    adress: '',
    adress2 : '',
    codePostal : '',
    ville : '',
    description : '',
    condPaiement : '' ,
    dateInter : '',
    descriptSup : '',
    dateValide : '',
    designations: '',
    qte: '',
    prixHt : '',
  };


  productForm: FormGroup;
  // tslint:disable-next-line:variable-name


  constructor(private fb: FormBuilder) {



    this.productForm = this.fb.group({

      name: '',
      firstName: '',
      adress: '',
      adress2 : '',
      codePostal : '',
      ville : '',
      description : '',
      condPaiement : '' ,
      dateInter : '',
      descriptSup : '',
      dateValide : '',

      quantities: this.fb.array([]) ,

    });

  }
  quantities(): FormArray {

    return this.productForm.get('quantities') as FormArray;

  }



  newQuantity(): FormGroup {

    return this.fb.group({

      designations: '',

      qte: '',

      prixHt : '',

    });

  }



  // tslint:disable-next-line:typedef
  addQuantity() {

    this.quantities().push(this.newQuantity());

  }



  // tslint:disable-next-line:typedef
  removeQuantity(i: number) {

    this.quantities().removeAt(i);

  }





  // tslint:disable-next-line:typedef
  onSubmit() {

    console.log(this.productForm.value);


  }

  ngOnInit(): void {
  }



}
