from django.db import models

class Usuario(models.Model):
    codigoBiometrico = models.IntegerField(blank=False,null=False,primary_key=True)
    cedula = models.CharField(max_length=10,blank=False,null=False)
    rol = models.CharField(max_length=15)
    fechaNacimiento = models.DateField()
    email = models.CharField(blank=False,null=False,max_length=50)
    password = models.CharField(max_length=20)
    fechaContrato = models.DateField()
    nombres = models.CharField(max_length=150)
    apellidos = models.CharField(max_length=150)
    genero = models.CharField(max_length=1)

    class Meta:
        managed = False
        db_table = 'Usuario'

class Marcacion(models.Model):
    idMarcacion = models.AutoField(blank=False,null=False,primary_key=True)
    codigoBiometrico = models.ForeignKey(
        Usuario, models.DO_NOTHING, db_column='codigoBiometrico',blank=False,null=False)
    fecha = models.DateField(blank=False,null=False)
    horaEntrada = models.TimeField()
    horaSalida = models.TimeField()
    publicado = models.BooleanField(default=False)

    class Meta:
        managed = False
        db_table = 'Marcacion'

class TipoJustificacion(models.Model):
    idTipo = models.AutoField(blank=False,null=False,primary_key=True)
    descripcion = models.CharField(max_length=500)
    codigoBiometrico = models.ForeignKey(
        Usuario, models.DO_NOTHING, db_column='codigoBiometrico',blank=False,null=False)
    fechaIngreso = models.DateField()
    fechaUltimaModificacion = models.DateField()

    class Meta:
        managed = False
        db_table = 'TipoJustificacion'

class Inconsistencia(models.Model):
    idInconsistencia = models.AutoField(blank=False,null=False,primary_key=True)
    idMarcacion = models.ForeignKey(
        Marcacion, models.DO_NOTHING, db_column='idMarcacion',null=False,blank=False)
    estado = models.CharField(max_length=15)
    idTipo = models.ForeignKey(
        TipoJustificacion, models.DO_NOTHING, db_column='idTipo', null=False, blank=False)
    
    class Meta:
        managed = False
        db_table = 'Inconsistencia'