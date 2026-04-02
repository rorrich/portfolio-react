import { useEffect, type MutableRefObject } from 'react'

import { usePageTransition } from './usePageReady'

type PlayableTimeline = {
  play: (from?: number) => unknown
}

export function useEnterAfterTransition(timelineRef: MutableRefObject<PlayableTimeline | null>) {
  const { isTransitioning } = usePageTransition()

  useEffect(() => {
    if (!isTransitioning && timelineRef.current) {
      timelineRef.current.play(0)
    }
  }, [isTransitioning, timelineRef])
}
