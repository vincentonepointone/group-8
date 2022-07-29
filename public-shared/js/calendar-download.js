function takeshot() {
    let div = document.getElementById('photo');
    // Use the html2canv function to take a screen and append to the output div
    html2canvas(div).then(
        function (canvas) {
            let dataURl = canvas.toDataURL();
            var link = document.createElement("a");
            link.download = "rooster";
            link.href = dataURl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            delete link;
        })    
}
