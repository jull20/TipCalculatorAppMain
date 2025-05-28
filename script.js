let reset_btn = document.querySelector(".reset-btn");
let people_input = document.querySelector(".people-count");
let form = document.querySelector(".form");
let custom_btn = document.querySelector(".custom-btn");
let radio_btn = document.querySelectorAll(".radio-input");
let prev = null;

let handleReset = (e) => {
    document.querySelectorAll(".num-input").forEach(input => input.value="");
    document.querySelector(".radio-input:checked").checked = false;
    document.querySelectorAll(".result-sum span").forEach(span => span.textContent="0.00");
    e.target.setAttribute("disabled", "disabled");
}
let handleHidden = (e) => {
    let custom_input = document.querySelector("#custom .num-input");
    let custom_label = document.querySelector("#custom .radio-label");
    if(e.target == custom_btn){
        custom_input.classList.remove("hidden");
        custom_input.focus();
        custom_label.classList.add("hidden");
    }
    if(prev == custom_btn){
            custom_input.value = "";
            custom_input.classList.add("hidden");
            custom_label.classList.remove("hidden");
    }
    if (e.target !== prev) {
        prev = e.target;
    }
}
let handleInputError = (e) => {
    if(e.target.value[0] == "0"){
        let error = document.querySelector(".people-error"); 
        e.target.classList.add("error");
        error.classList.remove("hidden");
        error.textContent = "Can’t be zero";
    }
    else{
        e.target.classList.remove("error");
        document.querySelector(".people-error").classList.add("hidden");
    }
}
let peopleValidation = (el) => {
    if(el.value[0] == "0"){
        document.querySelectorAll(".result-sum span").forEach(span => span.textContent="0.00");
        return false;
    }
    else if(el.value == "") {
        document.querySelectorAll(".result-sum span").forEach(span => span.textContent="0.00");
        return false;
    }
    return true
}
let percentValidation = (el) => {
    if(el.validity.valueMissing == false){
        if(el.value != "") {
            console.log(el.value)
            return true;
        }
    }
    return false;
}
let handleChange = (e) => {
    let bill_amount = document.querySelector(".bill-amount")
    let people_count = document.querySelector(".people-count")
    let percent_btn = document.querySelector(".radio-input:checked");

    if(percent_btn == document.querySelector(".custom-btn")){
        percent_btn.value = document.querySelector("#custom .num-input").value;
    }

    if(bill_amount.value != "" && peopleValidation(people_count) == true && percentValidation(percent_btn) == true){
        form.requestSubmit();
    }
}
let handleSubmit = (e) => {
    e.preventDefault();
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data);
    console.log(data)
    let tip_amount, total_amount;
    [tip_amount, total_amount] = calculateResult(parseFloat(data.bill), parseInt(data.percent), parseInt(data.people));
    console.log(`${tip_amount} ${total_amount}`)
    document.querySelector(".tips-sum span").textContent  = tip_amount == Infinity ? '0.00': tip_amount;
    document.querySelector(".total-sum span").textContent = total_amount == Infinity ? '0.00': total_amount;
    document.querySelector(".reset-btn").removeAttribute("disabled");
}
let calculateResult = (bill, percent, people_num) => {
    let tip_amount = parseFloat((bill / people_num * percent / 100).toFixed(2));
    let total_amount= (bill / people_num + tip_amount).toFixed(2);
    return [tip_amount, total_amount];
}

reset_btn.addEventListener('click', handleReset);
people_input.addEventListener('input', handleInputError);
radio_btn.forEach(inp => inp.addEventListener("change", handleHidden))
form.addEventListener("submit", handleSubmit);
form.addEventListener("input", handleChange);