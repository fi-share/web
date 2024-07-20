function auto_grow_y(element) {
    console.log(element);
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}