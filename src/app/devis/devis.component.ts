import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {saveAs} from 'file-saver';
import {ajaxGetJSON} from 'rxjs/internal-compatibility';
import {any} from 'codelyzer/util/function';





@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {


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
  societe = {
    Nom: 'ATELIER JACQUES CANGUILIEME',
    CorpDetat: ' Décoration ~ Rénovation ~ Tous corps détat',
    Status: ' SARL au capital de 50 000F',
    adress : '26,rue des Rigoles',
    codePostal : '75020 ',
    ville : 'PARIS',
    telephone : ' 01 48 23 92 18',
    siret : '394 064 927 00012' ,
    ape: ' 452 V',
    tva : '',
  };

  productForm: FormGroup;
  // tslint:disable-next-line:variable-name
  private selectedFile: any;

  sumToTal = '';

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
  public openPDF(): void {
    const DATA = document.getElementById('htmlpdf');

    if (DATA) {
      html2canvas(DATA).then(canvas => {

        const fileWidth = 208;
        const fileHeight = canvas.height * fileWidth / canvas.width;

        const FILEURI = canvas.toDataURL('image/png');
        const PDF = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

        PDF.save('angular-demo.pdf');
      });
    }
  }
  // tslint:disable-next-line:typedef
  public saveJson(){
    const blob = new Blob([JSON.stringify(this.productForm.value)], {type : 'application/json'});
    saveAs(blob, 'test.json');
  }
  // tslint:disable-next-line:typedef
   onFileChanged(event: Event) {
   // @ts-ignore
    console.log(event.target.files[0]);
    // @ts-ignore
    this.readFile(event.target.files[0]);
   }

  // tslint:disable-next-line:typedef
  readFile(event: Event) {
    // @ts-ignore
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.val = JSON.parse(fileReader.result);
        console.log(JSON.parse(fileReader.result));
      }
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }
  // tslint:disable-next-line:typedef
  total(){

    // const data = this.productForm.value;
    let sum: any[];
    sum = [];
    console.log(this.productForm.value.quantities);

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.productForm.value.quantities.length; i++) {
     // sum.push( this.productForm.value.quantities.qte) ;
      sum.push(this.productForm.value.quantities[i].qte * this.productForm.value.quantities[i].prixHt);
      console.log(this.productForm.value.quantities[i].qte * this.productForm.value.quantities[i].prixHt);
      console.log(sum + 'test');

    }
    return sum.reduce((accumulator, currentValue) => accumulator + currentValue);

    }




}
