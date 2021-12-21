var numerodelmes=[];
numerodelmes[0]="Ene";
numerodelmes[1]="Feb";
numerodelmes[2]="Mar";
numerodelmes[3]="Abr";
numerodelmes[4]="May";
numerodelmes[5]="Jun";
numerodelmes[6]="Jul";
numerodelmes[7]="Ago";
numerodelmes[8]="Sep";
numerodelmes[9]="Oct";
numerodelmes[10]="Nov";
numerodelmes[11]="Dic";
var cuerpo_Tabla=document.getElementById("amortizacion_Body");
var calcular=document.getElementById("boton_generar");
calcular.addEventListener("click",tabla_amortizacion);
var borrar=document.getElementById("boton_borrar");
borrar.addEventListener("click",borrar_tabla);

function tabla_amortizacion()
{
  var fecha_Inicial=document.getElementById("fechai").value;
  var plazo_mes=parseInt(document.getElementById("plazo_m").value);
  var valor_prestamo=parseFloat(document.getElementById("valor_p").value);
  var tasa_Interes=parseFloat(document.getElementById("tasa_int").value)/100;
  var seguro_Vida=parseFloat(document.getElementById("seguro_v").value);

  var result = Date.parse(fecha_Inicial);
  if(isNaN(seguro_Vida))
  {
    seguro_Vida=0;
  }

  if (Number.isNaN(result) || Number.isNaN(plazo_mes) ||Number.isNaN(valor_prestamo) || Number.isNaN(tasa_Interes) || Number.isNaN(seguro_Vida))
  {
    while (cuerpo_Tabla.firstChild)
    {
    cuerpo_Tabla.removeChild(cuerpo_Tabla.firstChild);
    }
    //fila=document.createElement("p");
    //cuerpo_Tabla.appendChild(fila);
    //textoc1=document.createTextNode("Por favor ingrese correctamente los valores en la tabla");
    //fila.appendChild(textoc1);
    alert("Por favor ingrese correctamente los valores en la tabla");
  }
  else
  {

    if(plazo_mes<=0 || plazo_mes>360|| valor_prestamo<=0 || tasa_Interes<=0)
    {
      if(plazo_mes>360)
      {
          alert("plazo máximo de 30 años, es decir 360 meses.");
      }
      else
      {
        alert("Ingrese datos mayores a 0.");
      }
    }
    else
    {
      var cuentan=cuerpo_Tabla.childElementCount;
      while (cuerpo_Tabla.firstChild)
      {
      cuerpo_Tabla.removeChild(cuerpo_Tabla.firstChild);
      }

      var date = new Date(fecha_Inicial);
      date.setDate(date.getDate() +1);
      date.setMonth(date.getMonth());
      var hilera=document.createElement("tr");
      cuerpo_Tabla.appendChild(hilera);
      var celda = document.createElement("td");
      var dia=date.getDate();
      var mes=numerodelmes[date.getMonth()];
      var año=date.getFullYear();
      var fechas=dia+"/"+mes+"/"+año
        var textoCelda = document.createTextNode(fechas);
        hilera.appendChild(celda);
        celda.appendChild(textoCelda);
        var repite=0;
        var col2=document.createElement("th");
        var col3=document.createElement("th");
        var col4=document.createElement("th");
        var col5=document.createElement("th");
        var col6=document.createElement("th");
        var col7=document.createElement("th");
        var col8=document.createElement("th");
        hilera.appendChild(col2);
        hilera.appendChild(col3);
        hilera.appendChild(col4);
        hilera.appendChild(col5);
        hilera.appendChild(col6);
        hilera.appendChild(col7);
        hilera.appendChild(col8);
         var textocol2=document.createTextNode(repite);
        col2.appendChild(textocol2);
        var textocol8=document.createTextNode(valor_prestamo);
        var saldo_final=valor_prestamo;
       col8.appendChild(textocol8);

       var dia_Inicial=cuerpo_Tabla.getElementsByTagName("td")[0].innerText;
       var indice=dia_Inicial.indexOf("/");
       var extraido=dia_Inicial.substring(0,indice);
       var mes_extraido=date.getMonth();
       var año_extraido=date.getFullYear();

       var total_intereses=0;
       var total_seguro=0;
       var total_amortizacion=0;
       var total_cuotas=0;
      for(var itera=0;itera<plazo_mes;itera++)
      {
        date=new Date(año_extraido,mes_extraido,extraido);
        date.setMonth(date.getMonth() + itera+1);
        if(date.getDate()!=extraido)
        {
          fecha_nueva = new Date(date.getFullYear(),date.getMonth(),1);
          date = new Date(fecha_nueva-1);
        }
        hilera=document.createElement("tr");
        cuerpo_Tabla.appendChild(hilera);
        celda = document.createElement("td");
        dia=date.getDate();
        mes=numerodelmes[date.getMonth()];
        año=date.getFullYear();
        fechas=dia+"/"+mes+"/"+año;

        textoCelda = document.createTextNode(fechas);
        hilera.appendChild(celda);
        celda.appendChild(textoCelda);

        col2=document.createElement("th");
        hilera.appendChild(col2);
        repite=repite+1;
        textocol2=document.createTextNode(repite);
        col2.appendChild(textocol2);

        col3=document.createElement("th");
        hilera.appendChild(col3);
        var saldo_Inicial=saldo_final;
        textocol3=document.createTextNode(saldo_Inicial.toFixed(2));
        col3.appendChild(textocol3);

        col4=document.createElement("th");
        hilera.appendChild(col4);


        col5=document.createElement("th");
        hilera.appendChild(col5);
        var intereses_pesos=saldo_Inicial*tasa_Interes;
        textocol5=document.createTextNode(intereses_pesos.toFixed(2));
        col5.appendChild(textocol5);

        col6=document.createElement("th");
        hilera.appendChild(col6);
        var segurovida=seguro_Vida;
        textocol6=document.createTextNode(segurovida);
        col6.appendChild(textocol6);

        col7=document.createElement("th");
        hilera.appendChild(col7);
        var cuota_prestamo=valor_prestamo/((1-(1+tasa_Interes)**(-plazo_mes))/tasa_Interes)+seguro_Vida;
        textocol7=document.createTextNode(cuota_prestamo.toFixed(2));
        col7.appendChild(textocol7);

        var amortizacion=cuota_prestamo-intereses_pesos-segurovida;
        textocol4=document.createTextNode(amortizacion.toFixed(2));
        col4.appendChild(textocol4);

        col8=document.createElement("th");
        hilera.appendChild(col8);
        saldo_final=saldo_Inicial-amortizacion;
        if(saldo_final<0)
        {
          saldo_final=0;
        }
        textocol8=document.createTextNode(saldo_final.toFixed(2));
        col8.appendChild(textocol8);

        total_intereses=parseFloat(total_intereses)+parseFloat(intereses_pesos);

        total_seguro=parseFloat(total_seguro)+parseFloat(segurovida);

        total_cuotas=parseFloat(total_cuotas)+parseFloat(cuota_prestamo);
        console.log(total_cuotas);
        total_amortizacion=parseFloat(total_amortizacion)+parseFloat(amortizacion);
        //Math.round(
        var totales=[];
        totales[0]=total_amortizacion;
        totales[1]=total_intereses;
        totales[2]=total_seguro;
        totales[3]=total_cuotas;

        if(plazo_mes-itera==1)
        {
          hilera=document.createElement("tr");
          cuerpo_Tabla.appendChild(hilera);

        for(var repeticion=0;repeticion<8;repeticion++)
        {
            columnas = document.createElement("th");
            hilera.appendChild(columnas);
            if(repeticion>=3&&repeticion<7)
            {
              textocolumnas=document.createTextNode(totales[repeticion-3].toFixed(2));
              columnas.appendChild(textocolumnas);
            }
        }


        }
      }
    }
  }

}

function borrar_tabla()
{
  while (cuerpo_Tabla.firstChild)
  {
  cuerpo_Tabla.removeChild(cuerpo_Tabla.firstChild);
  }
}
