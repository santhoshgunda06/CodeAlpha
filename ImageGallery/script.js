// Image list

const images = [

    "https://picsum.photos/id/1015/1200/800",

    "https://picsum.photos/id/1016/1200/800",

    "https://picsum.photos/id/1025/1200/800",

    "https://picsum.photos/id/1031/1200/800",

    "https://picsum.photos/id/237/1200/800",

    "https://picsum.photos/id/1043/1200/800"

];



let currentIndex = 0;




function openLightbox(index) {

    currentIndex = index;

    document.getElementById("lightboxImage").src =
        images[currentIndex];

    document.getElementById("lightbox").style.display =
        "flex";
}




function closeLightbox() {

    document.getElementById("lightbox").style.display =
        "none";
}




function nextImage() {

    currentIndex++;

    if (currentIndex >= images.length) {

        currentIndex = 0;

    }

    document.getElementById("lightboxImage").src =
        images[currentIndex];
}




function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = images.length - 1;

    }

    document.getElementById("lightboxImage").src =
        images[currentIndex];
}




function filterImages(category) {

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    galleryItems.forEach(function(item) {

        if (category === "all") {

            item.style.display = "block";

        }

        else if (item.classList.contains(category)) {

            item.style.display = "block";

        }

        else {

            item.style.display = "none";

        }

    });

}




document.addEventListener("keydown", function(event) {


    

    if (event.key === "ArrowRight") {

        nextImage();

    }


    

    if (event.key === "ArrowLeft") {

        previousImage();

    }


    

    if (event.key === "Escape") {

        closeLightbox();

    }

});