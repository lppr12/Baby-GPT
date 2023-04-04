



function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}



  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  



  function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}





  const textarea = document.querySelector('textarea');
  const chatBox = document.querySelector('.texts');
  
  function loader(element) {
    element.textContent = '';
  
    const loadInterval = setInterval(() => {
      // Update the text content of the loading indicator
      element.textContent += '.';
  
      // If the loading indicator has reached three dots, reset it
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  
    return loadInterval;
  }
  



 // const conversation = []; //test



  async function sendMessage() {
    const prompt = textarea.value.trim();
    const time = getCurrentTime(); 
    if (prompt !== '') {
      const newMessage = `
        <div class="message sent ">
          <div class="message-content">
            <div class="sent_t">${prompt}
              <p class="text-end time text-muted">${time}</p>
            </div>
          </div>
        </div>
      `;
      chatBox.insertAdjacentHTML('beforeend', newMessage);
      chatBox.scrollTop = chatBox.scrollHeight;
      textarea.value = '';
  
      const loaderText = document.createElement('p');
      loaderText.textContent = 'Loading';
      const loaderInterval = loader(loaderText);
      chatBox.appendChild(loaderText);
  

      


      try {
        const response = await fetch('http://localhost:5000', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
           body: JSON.stringify({ prompt })
         // body: JSON.stringify({ prompt, conversation }) //test
        });
        console.log(response);
        clearInterval(loaderInterval);
  
        const data = await response.json();
        console.log('bsdiwala gpt',data.bot);


        //conversation.push({ prompt, bot: data.bot });  //test


        const botMessage = `
          <div class="message received">
            <div class="message-content">
              <div class="received_t" >
              ${data.bot.split('\n').filter(line => line.trim() !== '').map(line => `<p>${line.trim()}</p>`).join('<br>')}
              <p class="text-end time text-muted">${getCurrentTime()}</p>
              </div>
            </div>
          </div>
        `;
  
       



        chatBox.insertAdjacentHTML('beforeend', botMessage);
        loaderText.remove();
        chatBox.scrollTop = chatBox.scrollHeight;
      } catch (error) {
        console.log(error);
        clearInterval(loaderInterval);
        loaderText.remove();
      }
    }
  }




  function handleKeyDown(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }




  


