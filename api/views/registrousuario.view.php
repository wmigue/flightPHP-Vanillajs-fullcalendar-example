   <?php include 'header.php' ?>


   <!-- header_start  -->

   <!-- bradcam_area_start -->
   <!--     <div class="contact_anipat anipat_bg_1">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="contact_text text-center">
						<div class="section_title text-center">
                        <h3>REGISTRO DE USUARIO</h3>
                    </div>
                </div>
            </div>
        </div>
			</div>
    </div> -->
   <!-- bradcam_area_end -->
   <div class="service_area ">
       <div class="container">
           <div class="d-flex justify-content-lg-around flex-sm-wrap">
               <div class="col-lg-6 col-md-10">
                   <h2 class="pb-2">Registro Usuarios</h2>
                   <form>
                       <div class="col-sm-6">
                           <div class="form-group">
                               <input class="form-control" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese su nombre completo'" placeholder='Ingrese su nombre completo' required>
                           </div>
                       </div>
                       <div class="col-sm-6">
                           <div class="form-group">
                               <input class="form-control" name="email" type="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese su email'" placeholder='Ingrese un email' required>
                           </div>
                       </div>
                       <div class="col-sm-6">
                           <div class="form-group">
                               <input class="form-control" name="pass" type="password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ingrese una contraseña'" placeholder='contraseña nueva' required>
                           </div>
                       </div>
                       <div class="col-sm-6">
                           <div class="form-group">
                               <input class="form-control" name="localidad" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'localidad'" placeholder='localidad' required>
                           </div>
                       </div>
                       <div class="col-sm-6">
                           <div class="form-group">
                               <input class="form-control" name="provincia" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'provincia'" placeholder='provincia' required>
                           </div>
                       </div>
                       <div class="col-sm-6">
                           <div class="form-group">
                               <input class="form-control" name="direccion" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'direccion'" placeholder='direccion' required>
                           </div>
                       </div>
                       <div class="col-sm-6">
                           <div class="form-group">
                               <input class="form-control" name="celular" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'numero celular'" placeholder='numero celular' required>
                           </div>
                       </div>
                       <div class="col-sm-6">
                           <div class="form-group">
                               <button id="enviar" class="btn btn-primary" type="submit">enviar formulario</button>
                           </div>
                       </div>
               </div>
               <div class="col-lg-6 col-md-10">
                   <h2 class="mb-3">Datos de su mascota</h2>
                   <button class="btn btn-danger m-3" id="add-mascota-wm" type="button">Agregar</button>
                   <div id="mascotanueva">

                       <div class="d-flex justify-content-center bg-primary p-4 m-1 ">
                           <input type="text" name="nombreMascota[]" placeholder='nombre' class="form-control">
                           <input type="text" name="razaMascota[]" placeholder='raza' class="form-control">
                           <select class="custom-select" name="edadMascota[]">
                               <option selected="">Edad</option>
                               <option value="1">3 meses</option>
                               <option value="2">6 meses</option>
                               <option value="3">1 año</option>
                               <option value="4">2 años</option>
                               <option value="5">3 años</option>
                               <option value="6">4 años</option>
                               <option value="7">5 años</option>
                               <option value="8">6 años</option>
                               <option value="9">7 años</option>
                               <option value="10">8 años</option>
                               <option value="11">9 años</option>
                               <option value="12">10 años</option>
                               <option value="13">11 años</option>
                               <option value="14">12 años</option>
                               <option value="15">13 años</option>
                               <option value="16">14 años</option>
                               <option value="17">15 años</option>
                               <option value="18">16 años</option>
                               <option value="19">17 años</option>
                               <option value="20">18 años</option>
                           </select>
                           <select class="custom-select" name="pesoMascota[]">
                               <option selected="">Peso</option>
                               <option value="1">1 kg</option>
                               <option value="2">2 kg</option>
                               <option value="3">3 kg</option>
                               <option value="4">4 kg</option>
                               <option value="5">5 kg</option>
                               <option value="6">6 kg</option>
                               <option value="7">7 kg</option>
                               <option value="8">8 kg</option>
                               <option value="9">9 kg</option>
                               <option value="10">10 kg</option>
                               <option value="11">11 kg</option>
                               <option value="12">12 kg</option>
                               <option value="13">13 kg</option>
                               <option value="14">14 kg</option>
                               <option value="15">15 kg</option>
                               <option value="16">16 kg</option>
                               <option value="17">17 kg</option>
                               <option value="18">18 kg</option>
                               <option value="19">19 kg</option>
                               <option value="20">20 kg</option>
                               <option value="21">21 kg</option>
                               <option value="22">22 kg</option>
                               <option value="23">23 kg</option>
                               <option value="24">24 kg</option>
                               <option value="25">25 kg</option>
                               <option value="26">26 kg</option>
                               <option value="27">27 kg</option>
                               <option value="28">28 kg</option>
                               <option value="29">29 kg</option>
                               <option value="30">30 kg</option>
                               <option value="31">31 kg</option>
                               <option value="32">32 kg</option>
                           </select>

                       </div>
                       <div class="d-flex justify-content-center ">
                           foto: <input type="file" name="files[]" multiple>
                       </div>

                   </div>
               </div>

               </form>

           </div>



       </div>
   </div>
   </div>






   <!-- footer_start  -->
   <footer class="footer">

       <div class="copy-right_text">
           <div class="container">
               <div class="bordered_1px"></div>
               <div class="row">
                   <div class="col-xl-12">
                       <p class="copy_right text-center">
                       <p>Copyright &copy;
                           <script>
                               document.write(new Date().getFullYear());
                           </script> All rights reserved | Nutribarf
                           marca registrada.
                       </p>
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
   <script src="views-scripts/registrousuario.script.js" type="module" defer></script>

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