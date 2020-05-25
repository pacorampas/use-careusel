import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSwipeable } from 'react-swipeable'

function useCarousel({ slidesId, activeId }) {
  const [idActiveInternal, setIdActiveInternal] = useState(activeId)
  const [indexActiveInternal, setIndexActiveInternal] = useState()
  const [nextDisabled, setNextDisabled] = useState(true)
  const [backDisabled, setBackDisabled] = useState(true)
  
  const getIndexItemById = useCallback(id => {
    const index = slidesId.findIndex(_id => _id === id)
    return index
  }, [slidesId])

  const handleClickBack = useCallback(() => {
    const index = getIndexItemById(idActiveInternal)
    if (index === 0) {
      return
    }
    
    const nextIndex = index - 1
    const nextActive = slidesId[nextIndex]
    setIdActiveInternal(nextActive)
  }, [idActiveInternal, slidesId, getIndexItemById])

  const handleClickNext = useCallback(() => {
    const index = getIndexItemById(idActiveInternal)

    if (index === slidesId.length - 1) {
      return
    }

    const nextIndex = index + 1
    const nextActive = slidesId[nextIndex]
    setIdActiveInternal(nextActive)
  }, [idActiveInternal, slidesId, getIndexItemById])

  useEffect(() => {
    setIdActiveInternal(activeId)
  }, [activeId])

  useEffect(() => {
    const indexActive = slidesId.findIndex(id => id === idActiveInternal)
    setIndexActiveInternal(indexActive)
    setNextDisabled(indexActive === slidesId.length - 1)
    setBackDisabled(indexActive === 0)
  }, [slidesId, idActiveInternal])

  return [
    idActiveInternal,
    indexActiveInternal, 
    {
      next: handleClickNext,
      nextDisabled
    }, {
      back: handleClickBack,
      backDisabled
    }
  ]
}

export default useCarousel

export function useCarouselSwipe({ back, next }) {
 
  const [deltaX, setDeltaX] = useState(0)
  const [deltaXPerc, setDeltaXPerc] = useState(0)
  const [isSwiping, setSwiping] = useState(false)
  const [width, setWidth] = useState()
  const ref = useRef()

  useEffect(() => {
    console.log('hola', ref.current)
    setWidth(ref.current.offsetWidth)
  }, [])

  const handleSwiped = ({ dir }) => {
    setSwiping(false)
    handleSwipeNext(dir)
  }


  const hanldeSwiping = ({ deltaX }) => {
    setDeltaX(deltaX)
    setDeltaXPerc(deltaX / width * 100)
    setSwiping(true)
  }

  const swipeProps = useSwipeable({ 
    onSwiped: handleSwiped,
    onSwiping: hanldeSwiping,
    trackMouse: true
  })


  const handleSwipeNext = useCallback(dir => {
    if ( !(deltaXPerc > 20 || deltaXPerc < -20) ) {
      setDeltaXPerc(0)
      return
    }

    // eslint-disable-next-line default-case
    switch(dir) {
      case 'Right':
        back()
        setDeltaXPerc(0)
        setDeltaX(0)
        return
      case 'Left':
        next()
        setDeltaXPerc(0)
        setDeltaX(0)
        return
    }
  }, [deltaXPerc, next, back])

  return [
    ref,
    swipeProps,
    deltaX,
    deltaXPerc,
    isSwiping
  ]
}
