<?php include 'header.php'?>
    <!-- header_start  -->

    <!-- bradcam_area_start -->
    <!--     <div class="contact_anipat anipat_bg_1">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="contact_text text-center">
						<div class="section_title text-center">
                        <h3>INGRESAR</h3>
                    </div>
                </div>
            </div>
        </div>
			</div>
    </div> -->
    <!-- bradcam_area_end -->
    <div class="service_area">
        <div class="container">
            <div class="row justify-content-center">

                <div class="col-lg-7 col-md-10">
                    <div class="section_title text-center mb-95">

                        <form class='formulario' >
                            <div class="form-group">
                                <input type="email" name="email" class="form-control" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese su email'" placeholder='Ingrese su email' required>
                            </div>
                            <div class="form-group">
                                <input type="password" name="pass" class="form-control" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese su contraseña'" placeholder='Ingrese su contraseña' required>
                            </div>
                            <button class="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn" type="submit">Enviar</button>
                            <br><br>
                            <a class="olvide-pass" style="cursor:pointer; color:blue;">Olvidé mi usuario o contraseña</a>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>





    <!-- ================ contact section end ================= -->

    <!-- footer_start  -->
    <footer class="footer">

        <div class="copy-right_text">
            <div class="container">
                <div class="bordered_1px"></div>
                <div class="row">
                    <div class="col-xl-12">
                        <p class="copy_right text-center">
                        <p>
                            Copyright &copy;<script>
                                document.write(new Date().getFullYear());
                            </script> All rights reserved | Nutribarf marca registrada</p>
                        </p>

                    </div>
                </div>
            </div>

    </footer>
    <!-- footer_end  -->

    <!-- JS here -->
    <script src="views-utils/js/vendor/modernizr-3.5.0.min.js"></script>
    <script src="views-utils/js/vendor/jquery-1.12.4.min.js"></script>
    <script src="views-utils/js/popper.min.js"></script>
    <script src="views-utils/js/bootstrap.min.js"></script>
    <script src="views-utils/js/owl.carousel.min.js"></script>
    <script src="views-utils/js/isotope.pkgd.min.js"></script>
    <script src="views-utils/js/ajax-form.js"></script>
    <script src="views-utils/js/waypoints.min.js"></script>
    <script src="views-utils/js/jquery.counterup.min.js"></script>
    <script src="views-utils/js/imagesloaded.pkgd.min.js"></script>
    <script src="views-utils/js/scrollIt.js"></script>
    <script src="views-utils/js/jquery.scrollUp.min.js"></script>
    <script src="views-utils/js/wow.min.js"></script>
    <script src="views-utils/js/nice-select.min.js"></script>
    <script src="views-utils/js/jquery.slicknav.min.js"></script>
    <script src="views-utils/js/jquery.magnific-popup.min.js"></script>
    <script src="views-utils/js/plugins.js"></script>
    <script src="views-utils/js/gijgo.min.js"></script>

    <!--contact js-->
    <script src="views-utils/js/contact.js"></script>
    <script src="views-utils/js/jquery.ajaxchimp.min.js"></script>
    <script src="views-utils/js/jquery.form.js"></script>
    <script src="views-utils/js/jquery.validate.min.js"></script>
    <script src="views-utils/js/mail-script.js"></script>
    <script src="views-utils/js/main.js"></script>
    <script src="views-utils/node_modules/sweetalert2/dist/sweetalert2.min.js"></script>

    <script src="views-scripts/ingresar.script.js" type="module" defer></script>


    <script>
        $('#datepicker').datepicker({
            iconsLibrary: 'fontawesome',
            disableDaysOfWeek: [0, 0],
            //     icons: {
            //      rightIcon: '<span class="fa fa-caret-down"></span>'
            //  }
        });
        $('#datepicker2').datepicker({
            iconsLibrary: 'fontawesome',
            icons: {
                rightIcon: '<span class="fa fa-caret-down"></span>'
            }

        });
        var timepicker = $('#timepicker').timepicker({
            format: 'HH.MM'
        });
    </script>

</body>

</html>