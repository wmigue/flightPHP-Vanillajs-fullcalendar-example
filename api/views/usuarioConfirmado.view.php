<script src="../views-scripts/usuarioConfirmado.script.js" type="module" defer></script>

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
        require './types/config.php';
        if ($response == 1) {
            echo 'usuario confirmado con ÉXITO!! <br> <a href="' . $config['serverURL'] . '/api/ingresar">volver al sitio </a>';
        } else {
            echo 'ERROR: usuario no valido o validacion expirada. (si paso mas de un dia del registro contacte al admin.)<br>';
            if (isset($errorMessage)) echo "<b>file: </b>" . $errorMessage->getFile() . "<b> message: </b>" . $errorMessage->getMessage(); //viene del catch.
        };

        ?>

    </div>
</div>