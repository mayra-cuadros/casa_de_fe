<?php
// Correo donde llegarán las reservas
$destino = "tucorreo@ejemplo.com";  // ← CAMBIA ESTO POR EL CORREO REAL

// Datos recibidos del formulario
$nombre = $_POST["nombre"];
$tipoEvento = $_POST["tipoEvento"];
$fecha = $_POST["fecha"];
$hora = $_POST["hora"];
$asistentes = $_POST["asistentes"];
$comentarios = $_POST["comentarios"];

// Armamos el mensaje
$mensaje = "
📌 NUEVA RESERVA DE EVENTO  
----------------------------------
Nombre: $nombre
Fecha: $fecha
Hora: $hora
Tipo de evento: $tipoEvento
Asistentes: $asistentes

Comentarios:
$comentarios
";

// Encabezados del correo
$headers = "From: Casa de Fe <no-reply@casadefe.com>\r\n";
$headers .= "Reply-To: $destino\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

// Enviar
if (mail($destino, "Nueva reserva de evento", $mensaje, $headers)) {
    echo "success";
} else {
    echo "error";
}
?>
