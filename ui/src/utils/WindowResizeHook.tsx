import React, { useLayoutEffect, useState } from 'react';



// https://stackoverflow.com/a/19014495/9034699
function useWindowSize() {

  const [size, setSize] = useState([0, 0]);


  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }


    window.addEventListener('resize', updateSize);
    updateSize();


    return () => window.removeEventListener('resize', updateSize);
  }, []);


  return size;
}

function ShowWindowDimensions() {
  const [width, height] = useWindowSize();
  return <span>Window size: {width} x {height}</span>;
}
