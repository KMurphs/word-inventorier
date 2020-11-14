import { useEffect, useRef, useState } from "react";



// https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
// https://codesandbox.io/s/04vvrxj79p

type Props = {
  root?: Element | null, 
  rootMargin?: string, 
  threshold?: number | number[],
  onObservedIntersection: (entry: IntersectionObserverEntry ) => void
}



export const useIntersect = ({ root = null, rootMargin = "0px", threshold = 1, onObservedIntersection }: Props): [React.Dispatch<React.SetStateAction<Element | null>>]  => {

  // 1. Let's link to a html node (the target to observe) as state persistent through rerenders
  const [targetNode, setTargetNode] = useState<Element|null>(null);


  // 2. let's create our observer. But we want it be remebered, and not recreated between re-renders
  // Also We cannot call useRef inside a callback
  // So we create here a bogus ref hook, that we will attach to an acutal observer later on
  const observer = useRef<IntersectionObserver>()
  

  // 3. useEffect: This happens after render is done, and just before re-render it is cleaned up
  const cleanupObserver = () => observer && observer.current && observer.current.disconnect && observer.current.disconnect();
  useEffect(()=>{

    // observer && observer.current && observer.current.disconnect && observer.current.disconnect();
    cleanupObserver();

    // Create the oberver after the render, and start the observation
    observer.current = new IntersectionObserver(([entry])=>{
      // console.log(entry.target.tagName, entry.intersectionRatio)
      onObservedIntersection(entry)
    }, { root, rootMargin, threshold })
    targetNode && observer && observer.current && observer.current.observe && observer.current.observe(targetNode)
   

    // Before re-render clean up my observer. We will build another one just after next rerender
    return cleanupObserver;
    // return () => { observer && observer.current && observer.current.disconnect && observer.current.disconnect(); }


  // Reactualize this hook and its oberver when these are changed
  // Node is included here, because at the very beginning it is null
  }, [targetNode, root, rootMargin, threshold])


  return [setTargetNode];
};



