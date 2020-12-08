import { useEffect, useRef, useState } from "react";



// https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
// https://codesandbox.io/s/04vvrxj79p

type Props = {
  root?: Element | null, 
  rootMargin?: string, 
  threshold?: number | number[],
  onObservedIntersection: (entry: IntersectionObserverEntry ) => void
}

export const thresholdsHelper = (steps: number) => Array.from(Array(steps).keys(), i => (i / steps) + (1 / (2 * steps)))

export const useIntersect = ({ root = null, rootMargin = "0px", threshold = [.25, .75], onObservedIntersection }: Props): [React.Dispatch<React.SetStateAction<Element | null>>, ()=>(IntersectionObserverEntry | null)]  => {

  // 1. Let's link to a html node (the target to observe) as state persistent through rerenders
  const [targetNode, setTargetNode] = useState<Element|null>(null);

  // Provide a way to send the intersectionObj to the client for debugging purposes
  const intersectionObj = useRef<IntersectionObserverEntry|null>(null);
  const getIntersectionObject = (): IntersectionObserverEntry|null => {return intersectionObj.current}



  // 2. let's create our observer. But we want it be remebered, and not recreated between re-renders
  // Also We cannot call useRef inside a callback
  // So we create here a bogus ref hook, that we will attach to an acutal observer later on
  const observer = useRef<IntersectionObserver>()


  
  

  // 3. useEffect: This happens after render is done, and just before re-render it is cleaned up
  const cleanupObserver = () => observer && observer.current && observer.current.disconnect && observer.current.disconnect();
  useEffect(()=>{

    // cleanupObserver();

    // Create the oberver after the render, and start the observation
    observer.current = new IntersectionObserver(([entry])=>{
      // console.log(entry.target.tagName, entry.intersectionRatio, entry.boundingClientRect)
      onObservedIntersection(entry)
      intersectionObj.current = entry;

    }, { root, rootMargin, threshold })
    targetNode && observer && observer.current && observer.current.observe && observer.current.observe(targetNode)


    // Before re-render clean up my observer. We will build another one just after next rerender
    return cleanupObserver;


  // Reactualize this hook and its oberver when these are changed
  // Node is included here, because at the very beginning it is null
  // onObservedIntersection is added to prevent a compiler warning
  }, [targetNode, root, rootMargin, threshold, onObservedIntersection])




  return [setTargetNode, getIntersectionObject];
};