import { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import './App.css'

gsap.registerPlugin(useGSAP, SplitText);

function App() {
  const container = useRef();
  const st = SplitText.create("p", {
    type: "chars",
    charsClass: "char",
  })

  st.chars.forEach((char) => { 
    gsap.set(char, { 
      attr: {
        "data-content": char.innerHTML
      }
    })
  });

  const textBlock = document.querySelector(".texto");

  textBlock.onpointermove = (e) => {
    st.chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        gsap.to(char, {
          overwrite: true,
          duration: 1.2 -dist / 100,
          scrambleText: { 
            text: char.dataset.contet,
            chars: ".:",
            speed: 0.5,
        },
          ease: "none"
        });
      }
    });
  };

  return (
    <div className="App">

      <div ref={container} className='texto'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>

    </div>
  )
}

export default App
