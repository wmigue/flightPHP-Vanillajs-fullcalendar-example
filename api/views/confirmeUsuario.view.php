<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>confirmar cuenta</title>
    <link rel="stylesheet" href="../views-utils/css/bootstrap.min.css">
    <script src="../views-scripts/usuarioConfirmado.script.js" type="module" defer></script>
</head>

<body>
    <style>
        .mensaje {
            display: flex;
            height: 100vh;
            justify-content: center;
            align-items: center;
        }
        .hijo{
            text-align: center;
        }
    </style>

    <div class="mensaje">
        <div class="hijo">
            Se envio un link de confirmacion a:<br> <b> <?php echo $email; ?> </b>
        </div>
    </div>

</body>

</html>