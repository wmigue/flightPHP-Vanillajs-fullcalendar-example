<?php
include 'header.php';
?>

<script src="utils/fullcalendar-6.1.5/dist/index.global.min.js" defer></script>
<script src="views-scripts/calendario.script.js" type="module" defer></script>

<style>
    @media (max-width: 768px) {
        .fc-button {
            width: 40px;
            font-size: 4px;
        }

        #fc-dom-1 {
            font-size: 15px;
            margin: 10px;
        }
    }
</style>

<!-- <div class="text-center">
    <button id='agregarbtn' class="btn btn-primary">agregar evento</button>
</div> -->


<div id='calendar' class="p-5"></div>