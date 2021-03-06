import { Component, OnInit, TemplateRef } from "@angular/core";
import { EventoService } from "../_services/evento.service";
import { Evento } from "../_models/Evento";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-eventos",
  templateUrl: "./eventos.component.html",
  styleUrls: ["./eventos.component.css"]
})
export class EventosComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  _filtroLista = "";
  eventosFiltrados: any = [];
  eventos: Evento[];
  imagemLargura = 50;
  imagemMargem = 50;
  mostrarImagem = false;
  modalRef: BsModalRef;
  registerForm: FormGroup;

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  validation() {
    this.registerForm = new FormGroup({
      Tma: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      Local: new FormControl('', Validators.required),
      ImagemURL: new FormControl('', Validators.required),
      DataEvento: new FormControl('', Validators.required),
      QtdPessoas: new FormControl('', [Validators.required, Validators.max(12000)]),
      Telefone: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  salvarAlteracao() {}
  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      // tslint:disable-next-line: variable-name
      (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
        console.log(_eventos);
      },
      error => {
        console.log(error);
      }
    );
  }
}
