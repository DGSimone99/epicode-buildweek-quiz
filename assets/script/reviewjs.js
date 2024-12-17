const allStars = document.querySelectorAll(".star")

 allStars.forEach((star, i) => {
    star.onclick = function(){
        let currentStarLevel = i + 1;

        allStars.forEach ((star, x) =>{
            if (currentStarLevel >= x+1) {
                star.classList.add("starClicked");
            } else {
                star.classList.remove("starClicked");
            }
        })
    }
 })