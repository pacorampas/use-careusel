import React from 'react'
import {render} from 'react-dom'

import useCarousel, { useCarouselSwipe } from '../../src'

const DemoCarousel = () => {
  const [
    idActive, 
    indexActive, 
    {
      next,
      nextDisabled
    }, 
    {
      back,
      backDisabled
    }
  ] = useCarousel({ 
    slidesId: ['hola', 'como', 'estas'], 
    activeId: 'como'
  })

  return (
    <div>
      <h1>indexActive: {indexActive}, idActive: {idActive}</h1>
      <button onClick={back} disabled={backDisabled} >Back</button>
      <button onClick={next} disabled={nextDisabled}>Next</button>
    </div>
  )
}

const DemoSwipe = () => {
  const [
    ref,
    swipeProps,
    deltaX,
    deltaXPerc,
    isSwiping
  ] = useCarouselSwipe({ 
    next: () => { console.log('next') }, 
    back: () => { console.log('back') }
  })

  return (
    <div
      style={{
        width: '500px',
        height: '500px',
        border: 'solid 1px #333'
      }}
      {...swipeProps}
      ref={ref}
    >
      <div>DeltaX: {deltaX}</div>
      <div>deltaXPerc: {deltaXPerc}</div>
      <div>isSwipping: {isSwiping ? 'true' : 'false'}</div>
    </div>
  )
}

const DemoCarouselSwipe = () => {
  const [
    idActive, 
    indexActive, 
    {
      next,
      nextDisabled
    }, 
    {
      back,
      backDisabled
    }
  ] = useCarousel({ 
    slidesId: ['hola', 'como', 'estas'], 
    activeId: 'como'
  })

  const [
    ref,
    swipeProps,
    deltaX,
    deltaXPerc,
    isSwiping
  ] = useCarouselSwipe({ 
    next, 
    back
  })

  return (
    <div>
      <h1>indexActive: {indexActive}, idActive: {idActive}</h1>
      <button onClick={back} disabled={backDisabled} >Back</button>
      <button onClick={next} disabled={nextDisabled}>Next</button>
      <div
        style={{
          width: '500px',
          height: '500px',
          border: 'solid 1px #333'
        }}
        {...swipeProps}
        ref={ref}
      >
        <div>DeltaX: {deltaX}</div>
        <div>deltaXPerc: {deltaXPerc}</div>
        <div>isSwipping: {isSwiping ? 'true' : 'false'}</div>
      </div>
    </div>
  )
}

const Demo = () => {
  return (
    <div>
      demo1:
      <DemoCarousel />
      <hr />
      demo2: 
      <DemoSwipe />
      <hr />
      demo3: 
      <DemoCarouselSwipe />
    </div>
  )
}

render(<Demo/>, document.querySelector('#demo'))
