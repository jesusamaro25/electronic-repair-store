import Swal from 'sweetalert2';

export class funciones {
  usuario: any;

  formatDate(dateString) {
    return dateString.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");
  }

  getLocal() {
    this.usuario = {
      id: localStorage.getItem("id"),
      nombre: localStorage.getItem("nombre"),
      apellido: localStorage.getItem("apellido"),
      correo: localStorage.getItem("correo"),
      direccion: localStorage.getItem("direccion"),
      telefono: localStorage.getItem("telefono"),
      fechaNacimiento: localStorage.getItem("fechaNacimiento"),
      sexo: localStorage.getItem("sexo"),
      urlFoto: localStorage.getItem("urlFoto"),
      documentoIdentidad: localStorage.getItem("documentoIdentidad"),
      rol: {
        id: localStorage.getItem("rol_id"),
        tipo: localStorage.getItem("rol_tipo"),
        nombre: localStorage.getItem("rol")
      },
      token: localStorage.getItem("token")
    };
    return this.usuario;
  }

  destroyLocal() {
  localStorage.clear();
}

getToken() {

  return localStorage.getItem("token");

}

registroExitoso() {

  Swal.fire({
    toast: true,
    type: 'success',
    titleText: 'Datos Guardados',
    showConfirmButton: false,
    timer: 2000,
    position: 'top-right'
  });

}

okAlert(mensaje: string) {

  Swal.fire({
    toast: true,
    type: 'success',
    titleText: mensaje,
    showConfirmButton: false,
    timer: 2000,
    position: 'top-right'
  });

}

errorAlert(mensaje: string) {
  Swal.fire({
    toast: true,
    type: 'error',
    titleText: mensaje,
    showConfirmButton: false,
    timer: 2000,
    position: 'top-right'
  });
}

eliminar(dato) {

  return Swal.fire({

    title: 'Deseas eliminar' + ' ' + dato + '?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'

  }).then((result) => {
    if (result.value) {

      Swal.fire({
        toast: true,
        type: 'error',
        titleText: 'Datos Eliminados',
        showConfirmButton: false,
        timer: 2000,
        position: 'top-right'
      });
      return result.value;

    } else {
      return false;
    }
  });

}

aprobarSolicitud(data) {

  Swal.fire({
    text: "Quieres aprobar esta solicitud?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.value) {

      Swal.fire({
        toast: true,
        type: 'success',
        titleText: 'Solicitud aprobada',
        showConfirmButton: false,
        timer: 2000,
        position: 'top-right'
      });

    }
  });

}

async rechazarSolicitud(data) {

  const { value: text } = await Swal.fire({
    title: 'Quieres rechazar esta solicitud?',
    type: 'warning',
    input: 'textarea',
    inputPlaceholder: 'Motivo del rechazo',
    showCancelButton: true,
    confirmButtonText: 'Rechazar',
    inputValidator: (value) => {
      if (!value) {
        return 'Debes escribir algo!';
      }
    }
  });

  if (text) {
    Swal.fire(`Motivo del rechazo ${text}`);
  }

}



aprobarReclamo(data) {

  Swal.fire({
    text: "Quieres aprobar este Reclamo?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.value) {

      Swal.fire({
        toast: true,
        type: 'success',
        titleText: 'Reclamo aprobado',
        showConfirmButton: false,
        timer: 2000,
        position: 'top-right'
      });

    }
  });

}

rechazarReclamo(data) {

  Swal.fire({
    text: "Quieres rechazar este Reclamo?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.value) {

      Swal.fire({
        toast: true,
        type: 'error',
        titleText: 'Reclamo rechazado',
        showConfirmButton: false,
        timer: 2000,
        position: 'top-right'
      });

    }
  });

}


entregarEquipo(data) {

  Swal.fire({
    text: "Quieres confirmar que se entregó el equipo?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d1d1d1',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.value) {

      Swal.fire({
        toast: true,
        type: 'success',
        titleText: 'Equipo entregado',
        showConfirmButton: false,
        timer: 2000,
        position: 'top-right'
      });

    }
  });
}

finalizarReclamo(data) {

  Swal.fire({
    text: "Quieres finalizar la reparación por reclamo?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d1d1d1',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.value) {

      Swal.fire({
        toast: true,
        type: 'success',
        titleText: 'Servicio finalizado',
        showConfirmButton: false,
        timer: 2000,
        position: 'top-right'
      });

    }
  });
}

}


