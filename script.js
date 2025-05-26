let typeTips_btns = document.querySelectorAll(".percent-btn");
let addActiveState = (e) => {
    if(document.querySelector(".active")) document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
}
typeTips_btns.forEach(btn => {btn.addEventListener("click", addActiveState)})

let form = document.querySelector(".form");
let people_input = document.querySelector(".people-count");
people_input.addEventListener("input", function(){
    if(this.value == "0") {
        this.classList.add("error");
        document.querySelector(".people-error").classList.remove("hidden");
    }
    else{
        this.classList.remove("error");
        document.querySelector(".people-error").classList.add("hidden");
    }
})