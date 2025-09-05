'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

export default function SnakeGame() {
  const [aiFood, setAiFood] = useState<{ x: number; y: number; color: string }[]>([])
  const [aiSnakes, setAiSnakes] = useState([
    { body: [{ x: 35, y: 5 }, { x: 36, y: 5 }, { x: 37, y: 5 }, { x: 38, y: 5 }], direction: { x: -1, y: 0 }, color: 'text-blue-500 dark:text-blue-400' },
    { body: [{ x: 5, y: 25 }, { x: 4, y: 25 }, { x: 3, y: 25 }, { x: 2, y: 25 }], direction: { x: 1, y: 0 }, color: 'text-green-500 dark:text-green-400' },
    { body: [{ x: 30, y: 25 }, { x: 30, y: 26 }, { x: 30, y: 27 }, { x: 30, y: 28 }], direction: { x: 0, y: -1 }, color: 'text-purple-500 dark:text-purple-400' },
    { body: [{ x: 2, y: 2 }, { x: 1, y: 2 }, { x: 0, y: 2 }, { x: 39, y: 2 }], direction: { x: 1, y: 0 }, color: 'text-red-500 dark:text-red-400' },
    { body: [{ x: 37, y: 27 }, { x: 38, y: 27 }, { x: 39, y: 27 }, { x: 0, y: 27 }], direction: { x: -1, y: 0 }, color: 'text-yellow-500 dark:text-yellow-400' },
    { body: [{ x: 1, y: 15 }, { x: 1, y: 14 }, { x: 1, y: 13 }, { x: 1, y: 12 }], direction: { x: 0, y: 1 }, color: 'text-cyan-500 dark:text-cyan-400' },
    { body: [{ x: 38, y: 10 }, { x: 38, y: 9 }, { x: 38, y: 8 }, { x: 38, y: 7 }], direction: { x: 0, y: 1 }, color: 'text-pink-500 dark:text-pink-400' },
    { body: [{ x: 15, y: 1 }, { x: 15, y: 0 }, { x: 15, y: 29 }, { x: 15, y: 28 }], direction: { x: 0, y: 1 }, color: 'text-orange-500 dark:text-orange-400' },
    { body: [{ x: 25, y: 28 }, { x: 25, y: 29 }, { x: 25, y: 0 }, { x: 25, y: 1 }], direction: { x: 0, y: -1 }, color: 'text-indigo-500 dark:text-indigo-400' },
    { body: [{ x: 39, y: 20 }, { x: 0, y: 20 }, { x: 1, y: 20 }, { x: 2, y: 20 }], direction: { x: -1, y: 0 }, color: 'text-emerald-500 dark:text-emerald-400' },
    { body: [{ x: 0, y: 8 }, { x: 39, y: 8 }, { x: 38, y: 8 }, { x: 37, y: 8 }], direction: { x: 1, y: 0 }, color: 'text-violet-500 dark:text-violet-400' },
    { body: [{ x: 12, y: 29 }, { x: 11, y: 29 }, { x: 10, y: 29 }, { x: 9, y: 29 }], direction: { x: 1, y: 0 }, color: 'text-rose-500 dark:text-rose-400' }
  ])
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const rafIdRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const accumulatorRef = useRef(0)

  const getRandomDirection = () => {
    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 }
    ]
    return directions[Math.floor(Math.random() * directions.length)]
  }

  const moveAiSnakes = useCallback(() => {
    setAiSnakes(currentAiSnakes => 
      currentAiSnakes.map(aiSnake => {
        const newBody = [...aiSnake.body]
        const head = { ...newBody[0] }
        let newDirection = aiSnake.direction
        const matchingFood = aiFood.filter(food => food.color === aiSnake.color)
        if (matchingFood.length > 0) {
          let nearestFood = matchingFood[0]
          let minDistance = Math.abs(head.x - nearestFood.x) + Math.abs(head.y - nearestFood.y)
          matchingFood.forEach(food => {
            const distance = Math.abs(head.x - food.x) + Math.abs(head.y - food.y)
            if (distance < minDistance) {
              nearestFood = food
              minDistance = distance
            }
          })
          const dx = nearestFood.x - head.x
          const dy = nearestFood.y - head.y
          if (Math.abs(dx) > Math.abs(dy)) {
            newDirection = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 }
          } else {
            newDirection = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 }
          }
        } else if (Math.random() < 0.1) {
          newDirection = getRandomDirection()
        }
        head.x += newDirection.x
        head.y += newDirection.y
        if (head.x < 0) head.x = 39
        if (head.x > 39) head.x = 0
        if (head.y < 0) head.y = 29
        if (head.y > 29) head.y = 0
        newBody.unshift(head)
        let ateFood = false
        const foodToEat = aiFood.find(food => head.x === food.x && head.y === food.y && food.color === aiSnake.color)
        if (foodToEat) {
          ateFood = true
          setAiFood(currentFood => currentFood.filter(food => !(food.x === foodToEat.x && food.y === foodToEat.y && food.color === foodToEat.color)))
        }
        while (newBody.length > 12) newBody.pop()
        if (!ateFood && newBody.length > 3) newBody.pop()
        return { ...aiSnake, body: newBody, direction: newDirection }
      })
    )
  }, [aiFood])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const attr = document.documentElement.dataset.animations
    const initial = attr ? attr === 'on' : !media.matches
    setAnimationsEnabled(initial)
    const onToggle = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setAnimationsEnabled(!!detail)
    }
    window.addEventListener('animations:toggle', onToggle as EventListener)
    return () => window.removeEventListener('animations:toggle', onToggle as EventListener)
  }, [])

  useEffect(() => {
    let interval: number | null = null
    if (animationsEnabled) {
      const snakeColors = [
        'text-blue-500 dark:text-blue-400',
        'text-green-500 dark:text-green-400',
        'text-purple-500 dark:text-purple-400',
        'text-red-500 dark:text-red-400',
        'text-yellow-500 dark:text-yellow-400',
        'text-cyan-500 dark:text-cyan-400',
        'text-pink-500 dark:text-pink-400',
        'text-orange-500 dark:text-orange-400',
        'text-indigo-500 dark:text-indigo-400',
        'text-emerald-500 dark:text-emerald-400',
        'text-violet-500 dark:text-violet-400',
        'text-rose-500 dark:text-rose-400'
      ]
      const localContentAreas = [{ x1: 8, y1: 8, x2: 32, y2: 22 }]
      const localUpperCorners = [
        { x1: 0, y1: 0, x2: 8, y2: 6 },
        { x1: 32, y1: 0, x2: 39, y2: 6 }
      ]
      const localCenterArea = { x1: 15, y1: 10, x2: 25, y2: 20 }
      const isInLocalContentArea = (x, y) => localContentAreas.some(area => x >= area.x1 && x <= area.x2 && y >= area.y1 && y <= area.y2)
      const isInLocalUpperCorner = (x, y) => localUpperCorners.some(corner => x >= corner.x1 && x <= corner.x2 && y >= corner.y1 && y <= corner.y2)
      const isInLocalCenter = (x, y) => x >= localCenterArea.x1 && x <= localCenterArea.x2 && y >= localCenterArea.y1 && y <= localCenterArea.y2
      const getLocalValidFoodPosition = () => {
        let newFood
        do {
          newFood = { x: Math.floor(Math.random() * 40), y: Math.floor(Math.random() * 30) }
        } while (isInLocalContentArea(newFood.x, newFood.y) || isInLocalUpperCorner(newFood.x, newFood.y) || isInLocalCenter(newFood.x, newFood.y))
        return newFood
      }
      const generateAiFood = () => {
        setAiFood(currentFood => {
          const newFoodArray = [...currentFood]
          snakeColors.forEach(color => {
            const colorFoodCount = newFoodArray.filter(food => food.color === color).length
            if (colorFoodCount < 3) {
              const newFood = getLocalValidFoodPosition()
              newFoodArray.push({ ...newFood, color })
            }
          })
          return newFoodArray
        })
      }
      generateAiFood()
      interval = window.setInterval(generateAiFood, 1500)
    }
    return () => {
      if (interval) window.clearInterval(interval)
    }
  }, [animationsEnabled])

  useEffect(() => {
    const stepMs = 300
    const loop = (time: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time
      const delta = time - lastTimeRef.current
      lastTimeRef.current = time
      if (animationsEnabled) {
        accumulatorRef.current += delta
        while (accumulatorRef.current >= stepMs) {
          moveAiSnakes()
          accumulatorRef.current -= stepMs
        }
      }
      rafIdRef.current = requestAnimationFrame(loop)
    }
    rafIdRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
      lastTimeRef.current = null
      accumulatorRef.current = 0
    }
  }, [animationsEnabled, moveAiSnakes])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 font-mono">
      <div className="absolute inset-0 opacity-30">
        {aiSnakes.map((aiSnake, snakeIndex) => 
          aiSnake.body.map((segment, segmentIndex) => {
            const headOpacity = 0.9
            const tailOpacity = 0.15
            const gradientOpacity = segmentIndex === 0 
              ? headOpacity 
              : headOpacity - ((headOpacity - tailOpacity) * (segmentIndex / Math.max(aiSnake.body.length - 1, 1)))
            return (
              <div
                key={`ai-${snakeIndex}-${segmentIndex}`}
                className={`absolute text-xs leading-none select-none ${aiSnake.color}`}
                style={{ left: `${segment.x * 2.5}%`, top: `${segment.y * 3.33}%`, opacity: gradientOpacity }}
              >
                {segmentIndex === 0 ? '●' : '▪'}
              </div>
            )
          })
        )}
        {aiFood.map((aiFoodItem, index) => (
          <div
            key={`ai-food-${index}`}
            className={`absolute text-xs leading-none select-none opacity-70 ${aiFoodItem.color}`}
            style={{ left: `${aiFoodItem.x * 2.5}%`, top: `${aiFoodItem.y * 3.33}%` }}
          >
            ○
          </div>
        ))}
      </div>
    </div>
  )
}
