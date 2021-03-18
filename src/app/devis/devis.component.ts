import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {saveAs} from 'file-saver';


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
  public onFileChanged(event: HTMLInputElement) {
   console.log(event);



   const fileReader = new FileReader();

   fileReader.onload = () => {

     const {files} = event;
     // @ts-ignore
     console.log(JSON.parse(files));

    };
   fileReader.onerror = (error) => {
      console.log(error);
    };

    }



}
