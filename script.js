document.addEventListener('DOMContentLoaded', function() {
    // Configurar QuaggaJS para iniciar el escaneo de códigos de barras
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#interactive'), // El contenedor donde se mostrará la vista de la cámara
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment" // Usa la cámara trasera
            },
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "upc_reader", "upc_e_reader", "code_93_reader"] // Tipos de códigos de barras a leer
        },
    }, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("QuaggaJS inicializado correctamente.");
        Quagga.start();
    });

    // Detectar cuando se escanea un código de barras
    Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
        document.getElementById('result').innerText = "Código escaneado: " + code;
    });

    // Funcionalidad para minimizar/expandir la cámara
    const toggleButton = document.getElementById('toggle-camera');
    const container = document.querySelector('.container');

    toggleButton.addEventListener('click', function() {
        container.classList.toggle('minimized');
        if (container.classList.contains('minimized')) {
            toggleButton.innerText = 'Expandir Cámara';
        } else {
            toggleButton.innerText = 'Minimizar Cámara';
        }
    });
});
