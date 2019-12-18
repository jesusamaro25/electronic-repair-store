import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { funciones } from '../../assets/funciones';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {


  url=" http://68.183.117.24:8900/";



  constructor(public http: HttpClient,public fun: funciones) { }

  //metodo get general para recibir todos los datos de una entidad
  getAll(metodo: string) {

    const head = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: 'Bearer ' + this.fun.getToken()
    })

    return new Promise(resolve => {
      this.http.get(this.url + metodo , { headers: head  }).subscribe(data => {
        console.log(data);
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }

  //metodo para enviar peticiones post con imagenes, recibe datos de tipo form data para crear un objeto
  postFormData(datos,metodo: string) {

    const head = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
       Authorization: 'Bearer ' + this.fun.getToken()
    })

    console.log(head)

    return new Promise((resolve, reject) => {
      this.http.post(this.url +metodo,datos,{ headers: head })
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  //metodo para hacer peticiones put con imagenes, recibe datos de tipo formdata y el id del objeto a editar
  putFormData(datos, metodo: string, id) {
    const head = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
       Authorization: 'Bearer ' + this.fun.getToken()
    })
    return new Promise((resolve, reject) => {
      this.http.put(this.url + metodo + '/' + id, (datos),{ headers: head })
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  putFormDataSingle(datos, metodo: string) {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + metodo, (datos))
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  //metodo para eliminar objetos
  delete( nombreMetodo: string, id){
    const head = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
       Authorization: 'Bearer ' + this.fun.getToken()
    })
    console.log(head)

    return new Promise((resolve, reject) => {
      this.http.delete(this.url + nombreMetodo +'/'+id,{ headers: head })
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });

  }

  
   
  //metodo para iniciar sesion
  login(credentials) {
    return new Promise((resolve, reject) => {

      this.http.post(this.url +'login',credentials)
        .subscribe(res => {
          let datos = JSON.parse(JSON.stringify(res));

          resolve(datos);
        }, (err) => {
          reject(err);
        });
    });

  }


}

