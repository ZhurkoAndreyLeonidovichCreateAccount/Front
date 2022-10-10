<template>
<head>
    <script src="https://api-maps.yandex.ru/2.1/?apikey=ваш b46105a9-b0d5-4498-8369-1f42a5fb0dcd&lang=ru_RU" type="text/javascript">
    </script>
    <script type="text/javascript">
        ymaps.ready(init);
        function init(){
            var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 7
            });
        }
    </script>
</head>
    <body>
    <div id="map" style="width: 600px; height: 400px"></div>
</body>
</template>


<script>
export default {
    
}
</script>
