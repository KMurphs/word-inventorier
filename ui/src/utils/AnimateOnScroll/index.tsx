

export default function animateOnScroll(entry: IntersectionObserverEntry, animateClassName: string = "animate"){

  // console.log(entry.target.className, entry.intersectionRatio, entry.boundingClientRect.top, (entry.rootBounds ? entry.rootBounds.bottom : -1))

  if(entry.intersectionRatio >= .5){
    entry.target.classList.add(animateClassName);
  }

  if(entry.boundingClientRect.top >= (entry.rootBounds ? entry.rootBounds.bottom : 0)){
    entry.target.classList.remove(animateClassName);
  }

}


