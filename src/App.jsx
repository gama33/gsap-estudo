import { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import './App.css'

gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin);

function App() {
  const container = useRef();
  const stRef = useRef();

  useGSAP(() => {
    const st = SplitText.create("p", {
      type: "chars",
      charsClass: "char",
    });
    st.chars.forEach((char) => {
      gsap.set(char, {
        attr: {
          "data-content": char.innerHTML
        }
      });
    });
    stRef.current = st;
  }, []);

  const handlePointerMove = (e) => {
    if (!stRef.current) return;
    stRef.current.chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        gsap.to(char, {
          overwrite: true,
          duration: 1.2 - dist / 100,
          scrambleText: {
            text: char.dataset.content,
            chars: ".:",
            speed: 0.5,
          },
          ease: "none"
        });
      }
    });
  };

  return (
    <div className='texto' ref={container} onPointerMove={handlePointerMove}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  )
}

export default App
