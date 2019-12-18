import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect, MatDialogConfig, MatDialog } from '@angular/material';
import { take, takeUntil } from 'rxjs/operators';
import { GeneralServiceService } from '../../Services/general-service.service';
import { funciones } from '../../../assets/funciones';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalPrimeraSolicitudComponent } from './modal-primera-solicitud/modal-primera-solicitud.component';

export interface Servicio {
  id: number;
  nombre: string;
  tipo: number;
}



@Component({
  selector: 'app-solicitar-servicio',
  templateUrl: './solicitar-servicio.component.html',
  styleUrls: ['./solicitar-servicio.component.css']
})
export class SolicitarServicioComponent implements OnInit, AfterViewInit, OnDestroy {

  /** list of servicios */
  private servicios: Servicio[] = []


  /** control for the MatSelect filter keyword */
  public servicioFilterCtrl: FormControl = new FormControl();

  /** list of servicios filtered by search keyword */
  public filteredServicios: ReplaySubject<Servicio[]> = new ReplaySubject<Servicio[]>(1);

  @ViewChild('singleSelect' ) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  datos: Servicio;
  darray: any;
  parray: any;

  boolmodelo: boolean;
  booltec: boolean;
  boolpromo: boolean;
  user: any;
  primera: any;
  idProm: string;
  idServi: string;


  ngAfterViewInit(): void {
    this.setInitialValue();
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  resultado: any;
  constructor(private _formBuilder: FormBuilder,private datePipe: DatePipe,
    public servi: GeneralServiceService,public alert: funciones,private router: Router,public dialog: MatDialog,route: ActivatedRoute) {
    this.idProm = route.snapshot.paramMap.get('idProm')
    this.idServi = route.snapshot.paramMap.get('idServi')
    console.log("Promo:"+this.idProm)
    console.log("Servicio:"+this.idServi)
    this.cargarServicio()
    this.primeraVez()
    this.cargarBloques()
    this.cargarRango()
    this.boolmodelo=true
    this.booltec=false
    this.boolpromo=false
    this.user=alert.getLocal()
   }

  cargarServicio(){



  }

  primeraVez(){
    if(localStorage.getItem('rol_tipo')=='cliente'){

      this.servi.getAll('solicitudServicio/cliente').then((result) => {
        this.primera = result;
        if(this.primera.data.length==0){
          this.showModal();
        }
        
      }, (err) => {
        console.log(err);
      });

    }
  }



  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;


  today: any;
  sdate:any;
  
  costo: any[]=[
    {
      minimo: '10000',
      maximo: '20000'
    }
  ];

  montos: any;
  min: number;
  max: number;

  promocion:  any[]=[];

  marca:  any[]=[];
  modelo:  any[]=[];
  bloque:  any[]=[];

  ngOnInit() {

    this.today=new Date();

    this.today=this.datePipe.transform(this.today, 'dd-MM-yyyy')

    this.firstFormGroup = new FormGroup({

      servicio: new FormControl('', [Validators.required]),
      promocion: new FormControl('', []),

    })

    this.secondFormGroup = new FormGroup({

      marca_equipo: new FormControl('', [Validators.required]),
      modelo_equipo: new FormControl('', [Validators.required]),
      problema: new FormControl('', [Validators.required])

    })

    this.thirdFormGroup = new FormGroup({

      dia: new FormControl({value:'', disabled:true}, [Validators.required]),
      hora: new FormControl('', [Validators.required]),
      tecnico: new FormControl('', [Validators.required])

    })

    this.servi.getAll('catalogoservicio').then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.datos = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].descripcion,
          tipo: this.resultado.data[i].tipoEquipo.id,
        };
        this.servicios.push(this.datos);
      }

      if(this.idServi!=null && this.idProm!=null){

        this.boolpromo=false
        this.firstFormGroup.get('servicio').setValue(this.getServicio(this.servicios,this.idServi))
        let id=this.firstFormGroup.get('servicio').value.id;
        this.firstFormGroup.get('promocion').setValue('');

        this.promocion=[];
        this.servi.getAll('promocion/servicio/'+id).then((result) => {
          this.resultado = result;
          this.parray = {
            id: '',
            nombre: ''
          };
          this.promocion.push(this.parray);
          for (let i = 0; i < this.resultado.data.length; i++) {
            this.boolpromo=true
            this.parray = {
              id: this.resultado.data[i].id,
              nombre: this.resultado.data[i].nombre
            };
            
          }
          this.promocion.push(this.parray);
          this.firstFormGroup.get('promocion').setValue(this.getServicio(this.promocion,this.idProm))
        }, (err) => {
          console.log(err);
        });
        
        this.cargarMarca()

      }

      // load the initial servicio list
      this.filteredServicios.next(this.servicios.slice());
      
    }, (err) => {
      console.log(err);
    });



    // listen for search field value changes
    this.servicioFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });

  }

  setPromo(id) {
    this.firstFormGroup.get('promocion').setValue(id)
  }

  protected filterBanks() {
    if (!this.servicios) {
      return;
    }
    // get the search keyword
    let search = this.servicioFilterCtrl.value;
    if (!search) {
      this.filteredServicios.next(this.servicios.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredServicios.next(
      this.servicios.filter(bank => bank.nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  protected setInitialValue() {
    this.filteredServicios
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Servicio, b: Servicio) => a && b && a.id === b.id;
      });
  }

  showModal(){
    // constante creada para un nuevo modal.
    const dialogConfig = new MatDialogConfig();
    // configuracion del modal con sus caracteristicas, ancho...
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.disableClose=true;
    // constante donde se guardan los datos que se ingresan en el modal, los parametros
    const dialogRef = this.dialog.open(ModalPrimeraSolicitudComponent, dialogConfig);
    // RECARGA LA TABLA CUANDO SE INSERTA EN LA BD, luego de ser cerrado el modal.
  }

  cargarMarca(){

    this.boolpromo=false

    let id=this.firstFormGroup.get('servicio').value.id;
    this.firstFormGroup.get('promocion').setValue('');

    this.promocion=[];
    this.servi.getAll('promocion/servicio/'+id).then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.boolpromo=true
        this.parray = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre
        };
        this.promocion.push(this.parray);
      }
    }, (err) => {
      console.log(err);
    });


    let tipo=this.firstFormGroup.get('servicio').value.tipo;
    this.thirdFormGroup.get('tecnico').setValue('');

    this.marca=[];
    this.servi.getAll('tipoEquipo/'+tipo+'/marcas').then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.darray = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre
        };
        this.marca.push(this.darray);
      }
    }, (err) => {
      console.log(err);
    });

  }

  cargarBloques(){

    this.bloque=[];
    this.servi.getAll('bloquehorario').then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.darray = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].descripcion
        };
        this.bloque.push(this.darray);
      }
    }, (err) => {
      console.log(err);
    });

  }

  cargarModelo(){

    let marca=this.secondFormGroup.get('marca_equipo').value;
    let tipo=this.firstFormGroup.get('servicio').value.tipo;

    this.modelo=[];
    this.servi.getAll('modeloEquipo?idMarca='+marca+'&idTipoEquipo='+tipo).then((result) => {
      this.resultado = result;
      for (let i = 0; i < this.resultado.data.length; i++) {
        this.darray = {
          id: this.resultado.data[i].id,
          nombre: this.resultado.data[i].nombre
        };
        this.modelo.push(this.darray);
      }
      this.boolmodelo=false;
    }, (err) => {
      console.log(err);
    });

  }

  cargarRango(){
    this.servi.getAll('precio').then((result) => {
      this.montos = result;
      this.min=this.montos.data.precioMinimoRevision
      this.max=this.montos.data.precioMaximoRevision
      
    }, (err) => {
      console.log(err);
    });
  }
  
  fecha(){


    this.sdate=new Date();
    console.log(this.thirdFormGroup.get('dia').value);
    this.sdate=this.thirdFormGroup.get('dia').value;
    this.sdate=this.datePipe.transform(this.sdate, 'dd-MM-yyyy');

  }

  //busca si hay tecnicos disponible el dia y la hora dada
  buscarTecnico(){

    if(this.thirdFormGroup.get('dia').value!="" && this.thirdFormGroup.get('hora').valid){

      let bloque=this.thirdFormGroup.get('hora').value;
      this.sdate=this.datePipe.transform(this.thirdFormGroup.get('dia').value, 'dd-MM-yyyy');
      let ser=this.firstFormGroup.get('servicio').value.id;
      
      this.servi.getAll('agenda/tecnicosDisponibles?idBloqueHorario='+bloque+'&idCatalogoServicio='+ser+'&fecha='+this.sdate).then((result) => {
        this.resultado = result;
        if (this.resultado.data.length>0) {
          this.thirdFormGroup.get('tecnico').setValue(this.resultado.data[0].id)
        }
        this.booltec=true;
      }, (err) => {
        console.log(err);
      });

    }

  }


  showNombre(array: any[],val) {
    var i = null;
    for (i = 0; array.length > i; i += 1) {
      if (array[i].id == val) {
        return array[i].nombre;
      }
    }
    
  }

  getServicio(array: any[],val) {
    var i = null;
    for (i = 0; array.length > i; i += 1) {
      if (array[i].id == val) {
        return array[i];
      }
    }
    
  }

  //solo lo use para probar si podia obtener el valor del form group
  print(){
    console.log(this.thirdFormGroup.get(['hora']).value)
  }

  crearSolicitud(){

    const datos = new FormData();
    datos.append('idModeloEquipo',this.secondFormGroup.get('modelo_equipo').value);
    datos.append('idCatalogoServicio',this.firstFormGroup.get('servicio').value.id);
    datos.append('descripcion',this.secondFormGroup.get('problema').value);
    datos.append('idUsuario',this.user.id);
    datos.append('idTecnico',this.thirdFormGroup.get('tecnico').value);
    datos.append('fechaActividad',this.sdate);
    datos.append('idBloqueHorario',this.thirdFormGroup.get('hora').value);
    if(this.firstFormGroup.get('promocion').value!=''){
      console.log("Promocion:"+this.firstFormGroup.get('promocion').value)
      datos.append('idPromocion',this.firstFormGroup.get('promocion').value.id)
    }
    
    console.log(this.thirdFormGroup.get('tecnico').value);
  

    this.servi.postFormData(datos,'solicitudServicio').then((result) => {
      this.alert.okAlert("Solicitud Enviada");
      this.goToPage("dashboard")
    }, (err) => {
      console.log(err);
    });
    
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
