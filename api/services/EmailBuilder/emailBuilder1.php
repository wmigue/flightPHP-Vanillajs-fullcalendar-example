<?php

class EmailBuilder1
{
    private $email, $mensaje, $remitenteName, $remitenteEmail, $logoURL, $remitente, $asunto;

    public function __construct($email, $mensaje, $logoURL, $remitente, $asunto)
    {
        $this->email = $email;
        $this->mensaje = $mensaje;
        $this->logoURL = $logoURL;
        $this->remitente = $remitente;
        $this->asunto = $asunto;
    }

    public function setRemitenteName($rName){
        $this->remitenteName=$rName;
    }
    public function setRemitenteEmail($rEmail){
        $this->remitenteEmail=$rEmail;
    }

    public function send()
    {
        $txt = '';
        $txt = $this->mensaje;
        //ini_set("SMTP", "smtp.gmail.com");
        $mensaje = "";
        $cabecera = "MIME-Version: 1.0\n";
        //$cabecera .= "Content-Type: text/html; charset=\"iso-8859-1\"\n";
        $cabecera .= "Content-Type: text/html; charset=\"utf-8\"\n";
        $cabecera .= 'From: ' . $this->remitenteName .' <' . $this->remitenteEmail . '>' . "\r\n" .
        'Reply-To: '. $this->remitenteEmail . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
        $mensaje .= "<img src='$this->logoURL' width='100' height='100' alt='logo' /></body></html>";
        $mensaje .= "<h4> $txt </h4>";
        $mensaje = wordwrap($mensaje, 70, "\r\n");
        $email_to =  $this->email; //separados por comas si son varios.
        $email_to = str_replace(';', ',', $this->email);
        // [email-to, asunto, cuerpo, cabecera html type, remitente nombre]
        $success = mail($email_to, $this->asunto, $mensaje, $cabecera);
    }

    public function setMensaje($m){
        $this->mensaje=$m;
    }

    public function setEmail($e){
        $this->email=$e;
    }
}
