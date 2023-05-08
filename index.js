// Steps
const MainContainer = document.querySelector(".main_container");
const stepContainers = document.querySelectorAll(".step_container");

const TabOneClass = "main_container flex gap tab_one";
const TabTwoClass = "main_container flex gap tab_two";
const TabThreeClass = "main_container flex gap tab_three";
const TabFourClass = "main_container flex gap tab_four";
const tabWelcome = "main_container flex gap tab_welcome";

const first = "Arcade";
const second = "Advanced";
const third = "Pro";
let submitted = false;

let data = [];
let billsArray;
let addONs = [];
let selected = true;
const sectionData = {
  firstSection: false,
  secondSection: false,
  thirdSection: false,
  fourthSection: false,
};

const setTab = (number) => {
  switch (number) {
    case 1:
      submitted ? "" : (MainContainer.className = TabOneClass);
      break;
    case 2:
      sectionData.firstSection ? (MainContainer.className = TabTwoClass) : "";
      break;
    case 3:
      sectionData.secondSection
        ? (MainContainer.className = TabThreeClass)
        : "";
      break;
    case 4:
      sectionData.thirdSection ? (MainContainer.className = TabFourClass) : "";
      break;
    default:
      sectionData.fourthSection ? (MainContainer.className = tabWelcome) : "";
  }
};

stepContainers.forEach((step, index) => {
  step.addEventListener("click", () => {
    setTab(index + 1);
  });
});

// pricing Section

const bills = document.querySelectorAll(".bill");

bills.forEach((bill) => {
  bill.addEventListener("click", () => {
    removeAllClasses();
    bill.classList.add("selected");
    billsArray = bill.dataset.id;
  });
});

function removeAllClasses() {
  bills.forEach((bill) => {
    bill.classList.remove("selected");
  });
}

//toggle Button Section

const toggleAre = document.querySelector(".toggle_btn");
const billingSection = document.querySelector(".billing_section");

toggleAre.addEventListener("click", () => {
  if (billingSection.classList.contains("monthly")) {
    billingSection.classList.remove("monthly");
    billingSection.classList.add("yearly");
    billsArray = "";
  } else {
    billingSection.classList.add("monthly");
    billingSection.classList.remove("yearly");
    billsArray = "";
  }
});

//add on section
const addonSection = document.querySelectorAll(".add_on .add_on_left input");

addonSection.forEach((addon) => {
  addon.addEventListener("change", () => {
    if (addon.checked) {
      addon.parentElement.parentElement.classList.add("border");
      addONs.push(addon.parentElement.parentElement.dataset.id);
    } else {
      addon.parentElement.parentElement.classList.remove("border");
      addONs.splice(addONs.indexOf(addon.parentElement.dataset.id), 1);
    }
  });
});

// setting up button
// Step 1

const nameInput = document.querySelector(".firstInput");
const emailInput = document.querySelector(".secondInput");
const phoneInput = document.querySelector(".thirdInput");
const firstSectionButton = document.querySelector("#firstButton input");

function chageSettings(input) {
  input.querySelector("input").addEventListener("input", (e) => {
    if (e.target.value) {
      input.classList.remove("error");
    } else {
      input.classList.add("error");
    }
  });
}

chageSettings(nameInput);
chageSettings(emailInput);
chageSettings(phoneInput);

firstSectionButton.addEventListener("click", (e) => {
  e.preventDefault();
  let nameValue = nameInput.querySelector("input").value;
  let emailValue = emailInput.querySelector("input").value;
  let phoneValue = phoneInput.querySelector("input").value;
  if (!nameValue) {
    nameInput.classList.add("error");
  } else {
    nameInput.classList.remove("error");
  }
  if (!emailValue) {
    emailInput.classList.add("error");
  } else {
    emailInput.classList.remove("error");
  }
  if (!phoneValue) {
    phoneInput.classList.add("error");
  } else {
    phoneInput.classList.remove("error");
  }
  if (nameValue && emailValue && phoneValue) {
    let obj = {
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
    };
    data.push(obj);
    sectionData.firstSection = true;
    setTab(2);
  } else {
    sectionData.firstSection = false;
    data = [];
  }
});

//step -2

const stepTwoNextBtn = document.getElementById("stepTwoNextBtn");

stepTwoNextBtn.addEventListener("click", () => {
  if (!billsArray.length > 0) {
    return alert("select a plan");
  }

  let type = "none";
  if (billsArray === "1M" || billsArray === "2M" || billsArray === "3M") {
    type = "month";
  } else if (
    billsArray === "1Y" ||
    billsArray === "2Y" ||
    billsArray === "3Y"
  ) {
    type = "year";
  } else {
    type = "none";
  }
  let obj;
  if (data[1]) {
    let user = data[0];
    data = [];
    obj = {
      type: type,
      plan: billsArray,
    };
    data.push(user);
  } else {
    obj = {
      type: type,
      plan: billsArray,
    };
  }
  data.push(obj);
  sectionData.secondSection = true;
  setTab(3);
});

// step -3

const stepThreeNextBtn = document.getElementById("stepThreeNextBtn");

stepThreeNextBtn.addEventListener("click", () => {
  console.log(data);
  data.push(addONs);
  sectionData.thirdSection = true;
  setTab(4);
  showData();
});

//step - 4

const planValue = document.querySelector("#main_plan");
const planChange = document.querySelector("#changePlan");
const planPrice = document.querySelector("#plan_price");
const addOnsContainer = document.getElementById("addOns");
const totalPrice = document.getElementById("totalPrice");

planChange.addEventListener("click", () => {
  setTab(2);
  removeAllClasses();
  sectionData.secondSection = false;
});

function showData() {
  let plan = data[1].plan;
  let type = data[1].type;
  let addOnPrice = data[2].length == 1 ? 2 : data[2].length == 2 ? 4 : 6;
  if (type === "month") {
    planPrice.innerText =
      plan === "1M"
        ? "$9/mo"
        : plan === "2M"
        ? "$12/mo"
        : plan === "3M"
        ? "$15/mo"
        : "";
    planValue.innerText =
      plan === "1M" || plan === "1Y"
        ? first + "(Monthly)"
        : plan === "2M" || plan === "2Y"
        ? second + "(Monthly)"
        : plan === "3M" || plan === "3Y"
        ? third + "(Monthly)"
        : "";
    totalPrice.innerText =
      plan === "1M"
        ? `$${parseInt("$9/mo".match(/\d+/)[0]) + addOnPrice}/mo`
        : plan === "2M"
        ? `$${parseInt("$12/mo".match(/\d+/)[0]) + addOnPrice}/mo`
        : plan === "3M"
        ? `$${parseInt("$15/mo".match(/\d+/)[0]) + addOnPrice}/mo`
        : "";
  } else {
    planPrice.innerText =
      plan === "1Y"
        ? `$${parseInt("$90/mo".match(/\d+/)[0]) + addOnPrice}/yr`
        : plan === "2Y"
        ? `$${parseInt("$120/mo".match(/\d+/)[0]) + addOnPrice}/yr`
        : plan === "3Y"
        ? `$${parseInt("$150/mo".match(/\d+/)[0]) + addOnPrice}/yr`
        : "";
    planValue.innerText =
      plan === "1M" || plan === "1Y"
        ? first + "(Yearly)"
        : plan === "2M" || plan === "2Y"
        ? second + "(Yearly)"
        : plan === "3M" || plan === "3Y"
        ? third + "(Yearly)"
        : "";
  }
  let addOns = data[2];
  if (data[2] && data[2].length > 0) {
    addOnsContainer.innerHTML = "";
    let html = addONs
      .map((add) => {
        return `<div class="price p_two flex items-center justify-between">
      <div class="price_left">
        <h1>${
          add == "1"
            ? "Online Services"
            : add == "2"
            ? "Larger Storage"
            : add == "3"
            ? "Customizable Profile"
            : ""
        }</h1>
      </div>
      <p>+$2/mo</p>
    </div>`;
      })
      .join(" ");
    console.log(html);
    addOnsContainer.innerHTML = html;
  }
}

// step - 4

const lastbtn = document.getElementById("thirdNextBtn");
lastbtn.addEventListener("click", () => {
  submitted = true;
  sectionData.firstSection = false;
  sectionData.secondSection = false;
  sectionData.thirdSection = false;
  sectionData.fourthSection = true;
  setTab();
});
