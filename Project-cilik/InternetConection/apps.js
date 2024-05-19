const wrapper = document.querySelector(".wraper"),
  toast = wrapper.querySelector(".toast"),
  wifiIcon = wrapper.querySelector(".icon"),
  title = wrapper.querySelector("span"),
  subTitle = wrapper.querySelector("p");

window.onload = () => {
  function ajax() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "typicode.com/post", true);
    xhr.onload = () => {
      if (xhr.status == 200 && xhr.status < 300) {
        // console.log("Online...");
      } else {
        toast.classList.add("Offline");
      }
    };
    xhr.onerror = () => {
      toast.classList.add("Offline");
    };
    xhr.send();
  }

  //   function Offline() {
  //     toast.classList.add("Offline...");
  //     title.innerText = "You're offline now...";
  //     subTitle.innerText = "Opps! ";
  //     wifiIcon.innerHTML = <i class="uil uil-wifi-slash"></i>;
  //   }

  ajax();
};
