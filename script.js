const chatbotBtn = document.getElementById("chatbot-button");
    const chatbotContainer = document.getElementById("chatbot-container");

    chatbotBtn.addEventListener("click", () => {
      chatbotContainer.style.display =
        chatbotContainer.style.display === "block" ? "none" : "block";
    });

    const resizers = document.querySelectorAll(".resizer");
    let currentResizer;
    let originalWidth, originalHeight, originalX, originalY, originalMouseX, originalMouseY;

    for (let resizer of resizers) {
      resizer.addEventListener("mousedown", mousedown);

      function mousedown(e) {
        e.preventDefault();
        currentResizer = resizer;
        originalWidth = parseFloat(getComputedStyle(chatbotContainer).width);
        originalHeight = parseFloat(getComputedStyle(chatbotContainer).height);
        originalX = chatbotContainer.getBoundingClientRect().left;
        originalY = chatbotContainer.getBoundingClientRect().top;
        originalMouseX = e.pageX;
        originalMouseY = e.pageY;
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);
      }

      function mousemove(e) {
        if (!currentResizer) return;
        if (currentResizer.classList.contains("right")) {
          chatbotContainer.style.width = originalWidth + (e.pageX - originalMouseX) + "px";
        } else if (currentResizer.classList.contains("left")) {
          chatbotContainer.style.width = originalWidth - (e.pageX - originalMouseX) + "px";
          chatbotContainer.style.left = originalX + (e.pageX - originalMouseX) + "px";
        } else if (currentResizer.classList.contains("bottom")) {
          chatbotContainer.style.height = originalHeight + (e.pageY - originalMouseY) + "px";
        } else if (currentResizer.classList.contains("top")) {
          chatbotContainer.style.height = originalHeight - (e.pageY - originalMouseY) + "px";
          chatbotContainer.style.top = originalY + (e.pageY - originalMouseY) + "px";
        } else if (currentResizer.classList.contains("bottom-right")) {
          chatbotContainer.style.width = originalWidth + (e.pageX - originalMouseX) + "px";
          chatbotContainer.style.height = originalHeight + (e.pageY - originalMouseY) + "px";
        } else if (currentResizer.classList.contains("bottom-left")) {
          chatbotContainer.style.width = originalWidth - (e.pageX - originalMouseX) + "px";
          chatbotContainer.style.height = originalHeight + (e.pageY - originalMouseY) + "px";
          chatbotContainer.style.left = originalX + (e.pageX - originalMouseX) + "px";
        } else if (currentResizer.classList.contains("top-right")) {
          chatbotContainer.style.width = originalWidth + (e.pageX - originalMouseX) + "px";
          chatbotContainer.style.height = originalHeight - (e.pageY - originalMouseY) + "px";
          chatbotContainer.style.top = originalY + (e.pageY - originalMouseY) + "px";
        } else if (currentResizer.classList.contains("top-left")) {
          chatbotContainer.style.width = originalWidth - (e.pageX - originalMouseX) + "px";
          chatbotContainer.style.height = originalHeight - (e.pageY - originalMouseY) + "px";
          chatbotContainer.style.top = originalY + (e.pageY - originalMouseY) + "px";
          chatbotContainer.style.left = originalX + (e.pageX - originalMouseX) + "px";
        }
      }

      function mouseup() {
        currentResizer = null; // ✅ stop resizing automatically
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    }