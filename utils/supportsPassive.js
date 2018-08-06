export const supportsPassive = () => {
    let supported = false;
  
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supported = true;
        }
      });
  
      window.addEventListener('test', null, opts);
      window.removeEventListener('test', null, opts);
    } catch (e) {}
  
    return supported;
  }
