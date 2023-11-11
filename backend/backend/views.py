from datetime import datetime
import time
from django.http import JsonResponse, HttpResponse
from rest_framework import generics
from .models import *

#El test de la api funcional
class Test(generics.GenericAPIView):
    def get(self, request):
        response = {
            'response': "Hello world! Test api"
        }
        return JsonResponse(response, status=200)
    
# Clases de acuerdo al usuario ingresado/seleccionado
class ValidateLogin(generics.GenericAPIView):
    def get(self, request, cedula, passw):
        try:
            worker=Usuario.objects.get(cedula=cedula)
            workerPass=worker.password
            if(workerPass==passw):
                return JsonResponse({"Cedula":worker.cedula},status=200)
            else:
                return HttpResponse({'Credenciales incorrectas'},status=500)
        except(Usuario.objects.get(cedula=cedula).DoesNotExist):
            return JsonResponse({'msg': 'Usuario vinculado a esta cédula no existe'},status=404)
        
class TipoUsuario(generics.GenericAPIView):
    def get(self, request, cedula):
        try:
            worker=Usuario.objects.get(cedula=cedula)
            return JsonResponse({"Rol":worker.rol},status=200)
        except(Usuario.objects.get(cedula=cedula).DoesNotExist):
            return JsonResponse({'msg': 'Usuario vinculado a esta cédula no existe'},status=404)

class CargarInfoUsuario(generics.GenericAPIView):
    def get(self, request, cedula):
        try:
            genero=''
            worker=Usuario.objects.get(cedula=cedula)
            if(worker.genero=="M"):
                genero="Masculino"
            elif(worker.genero=="F"):
                genero="Femenino"
            return JsonResponse({"Apellidos":worker.apellidos,"Nombres":worker.nombres,"Cedula":worker.cedula,"Correo":worker.email,"Nacimiento":worker.fechaNacimiento,"Contrato":worker.fechaContrato,"Genero":genero},status=200)
        except(Usuario.objects.get(cedula=cedula).DoesNotExist):
            return JsonResponse({'msg': 'Usuario vinculado a esta cédula no existe'},status=404)
        
class CargarDatosTablaAdmin(generics.GenericAPIView):
    def get(self, request, cedula, mes, year):
        try:
            list_marcas=list()
            datos=list()
            worker=Usuario.objects.get(cedula=cedula)
            biometrico=worker.codigoBiometrico
            marcaciones=Marcacion.objects.filter(codigoBiometrico=biometrico)
            for marcacion in marcaciones:
                mesMarca=marcacion.fecha.strftime('%m')
                yearMarca=marcacion.fecha.strftime('%y')
                if(mes==mesMarca and year=="20"+yearMarca):
                    datos.append(marcacion.fecha)
                    datos.append(marcacion.horaEntrada)
                    datos.append(marcacion.horaSalida)
                    ent=marcacion.horaEntrada
                    h=ent.hour
                    m=str(ent.minute)
                    s=str(ent.second)
                    diffH= h-8
                    if(diffH<0):
                        atraso='00:00:00'
                    else:
                        atraso=str(diffH)+":"+m+":"+s
                    datos.append(atraso)
                    list_marcas.append(datos)
                    datos=list()
            return JsonResponse({"Marcas":list_marcas},status=200)
        except(Usuario.objects.get(cedula=cedula).DoesNotExist):
            return JsonResponse({'msg': 'Usuario vinculado a esta cédula no existe'},status=404)

class CargarSolicitudes(generics.GenericAPIView):
    def get(self, request,cedula,fecha):
        justificaciones=list()
        justificacion=list()
        idsMarc=list()
        try:
            worker=Usuario.objects.get(cedula=cedula)
            marcaciones=Marcacion.objects.filter(codigoBiometrico=worker.codigoBiometrico)
            for marcacion in marcaciones:
                idsMarc.append(marcacion.idMarcacion)
            for idM in idsMarc:
                try:
                    inconsis=Inconsistencia.objects.get(idMarcacion=idM)
                    if(inconsis.estado=='P'or inconsis.estado=='J'):
                        justif=TipoJustificacion.objects.get(idTipo=inconsis.idTipo)
                        justificacion.append(fecha)
                        justificacion.append(justif.descripcion)
                        justificacion.append(inconsis.estado)
                        justificaciones.append(justificacion)
                except(Inconsistencia.objects.get(idMarcacion=idM).DoesNotExist):
                    return JsonResponse({"msg":"No existen incosistencias que mostrar"},status=404)
            return JsonResponse({"Justificaciones":justificaciones},status=200)
        except(Usuario.objects.get(cedula=cedula).DoesNotExist):
            return JsonResponse({'msg': 'Usuario vinculado a esta cédula no existe'},status=404)
        
class EnviarSolicitud(generics.GenericAPIView):
    def post(self,request,cedula,fecha,tipo,motivo):
        descripcion=tipo+" - "+motivo
        fechaN=datetime.strptime(fecha,'%d-%m-%Y').date()
        fechaA=datetime.today().strftime('%Y-%m-%d')
        try:
            worker=Usuario.objects.get(cedula=cedula)
            marcaciones=Marcacion.objects.filter(codigoBiometrico=worker.codigoBiometrico)
            id=''
            for marca in marcaciones:
                if(fechaN==marca.fecha):
                    id=marca.idMarcacion
            if(id==''):
                newMarca=Marcacion(codigoBiometrico=worker.codigoBiometrico,fecha=fechaN,publicada=False)
                newMarca.save()
                id=newMarca.idMarcacion
            newJusti=TipoJustificacion(descripcion=descripcion,usuarioModificador=cedula,fechaIngreso=fechaA,fechaUltimaModificacion=fechaA)
            newJusti.save()
            newInconsis=Inconsistencia(idMarcacion=id,estado='P',idTipo=newJusti.idTipo)
            newInconsis.save()
        except(Usuario.objects.get(cedula=cedula).DoesNotExist):
            return JsonResponse({'msg': 'Usuario vinculado a esta cédula no existe'},status=404)
    
class NewPassword(generics.GenericAPIView):
    def post(self,request,cedula,passOld,passNew):
        try:
            user=Usuario.objects.get(cedula=cedula)
            if(user.password==passOld):
                user.password=passNew
                user.save()
                return JsonResponse({"msg":"Contraseña cambiada correctamente"},status=200)
        except:
            return JsonResponse({'msg:':{"No se encontró al usuario"}},status=404)

class MarcacionIndividual(generics.GenericAPIView):
    def post(self,request,cedula,fecha,horaE,horaS,publicada):
        fechaN=datetime.strptime(fecha,'%d-%m-%Y').date()
        user=Usuario.objects.get(cedula=cedula)
        entrada=time.strptime(horaE,'%H:%M:%S.%f')
        salida=time.strptime(horaS,'%H:%M:%S.%f')
        newMarca=Marcacion(codigoBiometrico=user.codigoBiometrico,fecha=fechaN,horaEntrada=entrada,horaSalida=salida,publicada=publicada)
        newMarca.save()
        return JsonResponse({"msg":"La marcación fue registrada con éxito"}, status=200)

class GuardarCambioHoras(generics.GenericAPIView):
    def post(self,request,cedula,fecha,horaE,horaS):
        fechaN=datetime.strptime(fecha,'%d-%m-%Y').date()
        user=Usuario.objects.get(cedula=cedula)
        entrada=time.strptime(horaE,'%H:%M:%S.%f')
        salida=time.strptime(horaS,'%H:%M:%S.%f')
        marcacion=Marcacion.objects.get(codigoBiometrico=user.codigoBiometrico,fecha=fechaN)
        marcacion.horaEntrada=entrada
        marcacion.horaSalida=salida
        marcacion.save()
        return JsonResponse({"msg":"Los horarios fueron cambiados con éxito"},status=200)

# Clases para todos los usuarios existentes
class CargarSolicitudesAdmin(generics.GenericAPIView):
    def get(self,request):
        solicitudes=list()
        solicitud=list()
        tiposJust=TipoJustificacion.objects.all()
        for justi in tiposJust:
            descripcion=justi.descripcion
            idTipo=justi.idTipo
            incons=Inconsistencia.objects.get(idTipo=idTipo)
            marcacion=Marcacion.objects.get(idMarcacion=incons.idMarcacion)
            estado=''
            if(marcacion.estado=='J' or marcacion.estado=="P"):
                user=Usuario.objects.get(codigoBiometrico=marcacion.codigoBiometrico)
                solicitud.append(user.Nombres+" "+user.Apellidos)
                solicitud.append(marcacion.fecha)
                solicitud.append(descripcion)
                if(marcacion.estado=='J'):
                    estado='Justificada'
                elif(marcacion.estado=="P"):
                    estado='Pendiente'
                solicitud.append(estado)
            solicitudes.append(solicitud)
        return JsonResponse({"justificaciones":solicitudes},status=200)
    
class AceptarSolicitud(generics.GenericAPIView):
    def post(self,request,fecha):
        fechaN=datetime.strptime(fecha,'%d-%m-%Y').date()
        marcacion=Marcacion.objects.get(fecha=fechaN)
        inconsis=Inconsistencia.objects.get(idMarcacion=marcacion.idMarcacion)
        inconsis.estado='J'
        inconsis.save()
        return JsonResponse({"Atraso/falta justificada"},status=200)
