<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>confirmar cuenta</title>
    <link rel="stylesheet" href="../views-scripts/wm.js/utils/spinner/spinner.css">
    <link rel="stylesheet" href="../views-utils/css/bootstrap.min.css">
    <link rel="stylesheet" href="../views-utils/node_modules/sweetalert2/dist/sweetalert2.min.css">
    <script src="../views-utils/node_modules/sweetalert2/dist/sweetalert2.min.js"></script>
    <script src="../views-scripts/cambiarPassword.script.js" type="module" defer></script>
</head>

<body>
    <style>
        .mensaje {
            display: flex;
            height: 100vh;
            justify-content: center;
            align-items: center;
        }

        .hijo {
            text-align: center;
        }
    </style>

    <div class="mensaje">
        <div class="hijo">
            <?php
            if ($response == 1) {
            ?>
                <form>
                    <label>ingresa tu nueva password para: <b> <?php echo $email; ?></b></label>
                    <input type="hidden" value="<?php echo $token; ?>">
                    <input type="text" required class="form-control pb-3 mb-3 text-dark" name="update-pass-input" />
                    <button class="btn btn-primary" name="update-pass-btn">cambiar password</button>
                </form>
            <?php
            } else {
                include('types/config.php');
            ?>

            <p>token expirado o usuario no existe. genere otro token desde:  <a href="<?php echo $config['ingresarURL'];?>">olvide mi contraseña </a></p>

            <?php
            }
            ?>
        </div>
    </div>


            

</body>

</html>