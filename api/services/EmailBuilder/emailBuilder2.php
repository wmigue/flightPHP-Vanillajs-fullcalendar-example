<?php

class EmailBuilder2
{
    private $email, $mensaje, $remitenteName, $remitenteEmail, $logoURL, $tokenAEnviar,$servidorURL ;

    public function __construct($email, $mensaje, $tokenAEnviar)
    {
        $this->email = $email;
        $this->mensaje = $mensaje;
        $this->tokenAEnviar =  $tokenAEnviar;
        $this->logoURL = '';
        $this->servidorURL = '';
    }

    public function setMensaje($m){
        $this->mensaje=$m;
    }

    public function setEmail($e){
        $this->email=$e;
    }

    public function setLogoURL($url){
        $this->logoURL=$url;
    }

    public function setToken($t){
        $this->tokenAEnviar=$t;
    }

    public function setServidorURL($url){
        $this->servidorURL=$url;
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
        $mensaje = "";
        $cabecera = "MIME-Version: 1.0\n";
       // $cabecera .= "Content-Type: text/html; charset=\"iso-8859-1\"\n";
        $cabecera .= "Content-Type: text/html; charset=\"utf-8\"\n";
        $cabecera .= 'From: ' . $this->remitenteName .' <' . $this->remitenteEmail . '>' . "\r\n" .
        'Reply-To: '. $this->remitenteEmail . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
        $mensaje .= "<img src='$this->logoURL' width='100' height='100' alt='logo' /></body></html>";
        $mensaje .= "<h4> $txt $this->servidorURL/$this->tokenAEnviar </h4>";
        $mensaje = wordwrap($mensaje, 70, "\r\n");
        $email_to =  $this->email; 
        $email_to = str_replace(';', ',', $this->email); 
        // Enviarlo  [email, asunto, cuerpo, cabecera html type, remitente nombre]
        $success = mail($email_to, 'Validar registro', $mensaje, $cabecera);
    }
}
