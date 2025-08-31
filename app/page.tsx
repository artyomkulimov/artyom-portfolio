'use client'

import { Github, Mail, Linkedin, MessageSquare, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'

function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState<{ x: number; y: number } | null>(null)
  const [aiFood, setAiFood] = useState<{ x: number; y: number; color: string }[]>([])
  const [direction, setDirection] = useState({ x: 0, y: 0 })
  const [moveQueue, setMoveQueue] = useState<{ x: number; y: number }[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [lastInputTime, setLastInputTime] = useState(Date.now())
  const [autoPlay, setAutoPlay] = useState(false)
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

  // Define content areas (approximate positions where content blocks are)
  const contentAreas = [
    { x1: 8, y1: 8, x2: 32, y2: 22 }, // Main content area
  ]

  // Define upper corner areas to avoid
  const upperCorners = [
    { x1: 0, y1: 0, x2: 8, y2: 6 },   // Top left corner
    { x1: 32, y1: 0, x2: 39, y2: 6 }, // Top right corner
  ]

  // Define center area to avoid
  const centerArea = { x1: 15, y1: 10, x2: 25, y2: 20 }

  const isInContentArea = (x, y) => {
    return contentAreas.some(area => 
      x >= area.x1 && x <= area.x2 && y >= area.y1 && y <= area.y2
    )
  }

  const isInUpperCorner = (x, y) => {
    return upperCorners.some(corner => 
      x >= corner.x1 && x <= corner.x2 && y >= corner.y1 && y <= corner.y2
    )
  }

  const isInCenter = (x, y) => {
    return x >= centerArea.x1 && x <= centerArea.x2 && y >= centerArea.y1 && y <= centerArea.y2
  }

  const getValidFoodPosition = useCallback(() => {
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * 40),
        y: Math.floor(Math.random() * 30)
      }
    } while (isInContentArea(newFood.x, newFood.y) || isInUpperCorner(newFood.x, newFood.y) || isInCenter(newFood.x, newFood.y))
    return newFood
  }, [])

  const getAutoDirection = useCallback(() => {
    if (!food) return direction

    const head = snake[0]
    const dx = food.x - head.x
    const dy = food.y - head.y

    // Simple AI: move towards food
    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 }
    } else {
      return dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 }
    }
  }, [food, snake, direction])

  const getRandomDirection = () => {
    const directions = [
      { x: 0, y: -1 }, // up
      { x: 0, y: 1 },  // down
      { x: -1, y: 0 }, // left
      { x: 1, y: 0 }   // right
    ]
    return directions[Math.floor(Math.random() * directions.length)]
  }

  const moveAiSnakes = useCallback(() => {
    setAiSnakes(currentAiSnakes => 
      currentAiSnakes.map((aiSnake, snakeIndex) => {
        const newBody = [...aiSnake.body]
        const head = { ...newBody[0] }
        
        // AI behavior: ALWAYS move toward nearest food of matching color (winning behavior!)
        let newDirection = aiSnake.direction
        const matchingFood = aiFood.filter(food => food.color === aiSnake.color)
        
        if (matchingFood.length > 0) {
          // Find nearest food of matching color
          let nearestFood = matchingFood[0]
          let minDistance = Math.abs(head.x - nearestFood.x) + Math.abs(head.y - nearestFood.y)
          
          matchingFood.forEach(food => {
            const distance = Math.abs(head.x - food.x) + Math.abs(head.y - food.y)
            if (distance < minDistance) {
              nearestFood = food
              minDistance = distance
            }
          })
          
          // ALWAYS move toward nearest matching food (deterministic winning)
          const dx = nearestFood.x - head.x
          const dy = nearestFood.y - head.y
          
          if (Math.abs(dx) > Math.abs(dy)) {
            newDirection = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 }
          } else {
            newDirection = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 }
          }
        } else if (Math.random() < 0.1) {
          // Only 10% random movement when no food available
          newDirection = getRandomDirection()
        }
        
        head.x += newDirection.x
        head.y += newDirection.y

        // Wrap around screen edges
        if (head.x < 0) head.x = 39
        if (head.x > 39) head.x = 0
        if (head.y < 0) head.y = 29
        if (head.y > 29) head.y = 0

        newBody.unshift(head)
        
        // Check if AI snake ate food of matching color
        let ateFood = false
        
        // First check if we ate food (synchronously)
        const foodToEat = aiFood.find(food => 
          head.x === food.x && head.y === food.y && food.color === aiSnake.color
        )
        
        if (foodToEat) {
          ateFood = true
          // Remove the eaten food
          setAiFood(currentFood => 
            currentFood.filter(food => 
              !(food.x === foodToEat.x && food.y === foodToEat.y && food.color === foodToEat.color)
            )
          )
        }
        
        // Keep AI snakes within reasonable size limits
        while (newBody.length > 12) {
          newBody.pop()
        }
        
        // If didn't eat food, remove tail (otherwise snake grows)
        // But maintain minimum size of 3 segments
        if (!ateFood && newBody.length > 3) {
          newBody.pop()
        }

        return {
          ...aiSnake,
          body: newBody,
          direction: newDirection
        }
      })
    )
  }, [aiFood])

  const moveSnake = useCallback(() => {
    if (!gameStarted) return
    
    // Check for auto-play
    const timeSinceLastInput = Date.now() - lastInputTime
    if (timeSinceLastInput > 10000 && !autoPlay) {
      setAutoPlay(true)
    }
    
    // Process move queue or auto-play
    setMoveQueue(currentQueue => {
      if (currentQueue.length > 0) {
        const nextMove = currentQueue[0]
        setDirection(nextMove)
        return currentQueue.slice(1)
      } else if (autoPlay) {
        // Auto-play: move towards food
        const autoDirection = getAutoDirection()
        setDirection(autoDirection)
      }
      return currentQueue
    })
    
    setSnake(currentSnake => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }
      head.x += direction.x
      head.y += direction.y

      // Wrap around screen edges
      if (head.x < 0) head.x = 39
      if (head.x > 39) head.x = 0
      if (head.y < 0) head.y = 29
      if (head.y > 29) head.y = 0

      newSnake.unshift(head)

      // Check if food eaten
      if (food && head.x === food.x && head.y === food.y) {
        setFood(getValidFoodPosition())
        // Don't remove tail when food is eaten (this grows the snake)
        return newSnake
      } else {
        // Remove tail when no food eaten
        newSnake.pop()
        return newSnake
      }
    })
  }, [direction, food, gameStarted, getValidFoodPosition, lastInputTime, autoPlay, getAutoDirection])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) setGameStarted(true)
      
      let newDirection
      switch(e.key.toLowerCase()) {
        case 'w':
          newDirection = { x: 0, y: -1 }
          break
        case 's':
          newDirection = { x: 0, y: 1 }
          break
        case 'a':
          newDirection = { x: -1, y: 0 }
          break
        case 'd':
          newDirection = { x: 1, y: 0 }
          break
        default:
          return
      }

      // Reset auto-play on user input
      setLastInputTime(Date.now())
      setAutoPlay(false)

      // Add to queue if different from current direction and queue isn't too long
      setMoveQueue(currentQueue => {
        const lastDirection = currentQueue.length > 0 ? currentQueue[currentQueue.length - 1] : direction
        if (newDirection.x !== lastDirection.x || newDirection.y !== lastDirection.y) {
          return currentQueue.length < 3 ? [...currentQueue, newDirection] : currentQueue
        }
        return currentQueue
      })
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, direction])

  // Initialize food position
  useEffect(() => {
    if (!food) {
      setFood(getValidFoodPosition())
    }
  }, [food, getValidFoodPosition])

  // Generate AI food periodically for each snake color
  useEffect(() => {
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

    // Content areas to avoid (copied locally to avoid dependency issues)
    const localContentAreas = [{ x1: 8, y1: 8, x2: 32, y2: 22 }]
    const localUpperCorners = [
      { x1: 0, y1: 0, x2: 8, y2: 6 },
      { x1: 32, y1: 0, x2: 39, y2: 6 }
    ]
    const localCenterArea = { x1: 15, y1: 10, x2: 25, y2: 20 }

    const isInLocalContentArea = (x, y) => {
      return localContentAreas.some(area => 
        x >= area.x1 && x <= area.x2 && y >= area.y1 && y <= area.y2
      )
    }

    const isInLocalUpperCorner = (x, y) => {
      return localUpperCorners.some(corner => 
        x >= corner.x1 && x <= corner.x2 && y >= corner.y1 && y <= corner.y2
      )
    }

    const isInLocalCenter = (x, y) => {
      return x >= localCenterArea.x1 && x <= localCenterArea.x2 && y >= localCenterArea.y1 && y <= localCenterArea.y2
    }

    const getLocalValidFoodPosition = () => {
      let newFood
      do {
        newFood = {
          x: Math.floor(Math.random() * 40),
          y: Math.floor(Math.random() * 30)
        }
      } while (isInLocalContentArea(newFood.x, newFood.y) || isInLocalUpperCorner(newFood.x, newFood.y) || isInLocalCenter(newFood.x, newFood.y))
      return newFood
    }

    const generateAiFood = () => {
      setAiFood(currentFood => {
        const newFoodArray = [...currentFood]
        
        snakeColors.forEach(color => {
          const colorFoodCount = newFoodArray.filter(food => food.color === color).length
          // Keep 2-3 food items per color (more food = more success!)
          if (colorFoodCount < 3) {
            const newFood = getLocalValidFoodPosition()
            newFoodArray.push({ ...newFood, color })
          }
        })
        
        return newFoodArray
      })
    }

    // Initial AI food for each color
    generateAiFood()

    // Add new AI food every 1.5 seconds (faster food generation = more success!)
    const foodInterval = setInterval(generateAiFood, 1500)
    return () => clearInterval(foodInterval)
  }, []) // Empty dependency array

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 200)
    return () => clearInterval(gameLoop)
  }, [moveSnake])

  useEffect(() => {
    const aiGameLoop = setInterval(moveAiSnakes, 300) // Slightly slower than player snake
    return () => clearInterval(aiGameLoop)
  }, [moveAiSnakes])

    const getHeadChar = () => {
    if (direction.x === 1) return '▶'
    if (direction.x === -1) return '◀'
    if (direction.y === 1) return '▼'
    if (direction.y === -1) return '▲'
    return '●'
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 font-mono">
      <div className="absolute inset-0 opacity-30">
        {/* AI Snakes */}
        {aiSnakes.map((aiSnake, snakeIndex) => 
          aiSnake.body.map((segment, segmentIndex) => {
            // Create a smooth gradient from head (0.9) to tail (0.15)
            const headOpacity = 0.9
            const tailOpacity = 0.15
            const gradientOpacity = segmentIndex === 0 
              ? headOpacity 
              : headOpacity - ((headOpacity - tailOpacity) * (segmentIndex / Math.max(aiSnake.body.length - 1, 1)))
            
            return (
              <div
                key={`ai-${snakeIndex}-${segmentIndex}`}
                className={`absolute text-xs leading-none select-none ${aiSnake.color}`}
                style={{
                  left: `${segment.x * 2.5}%`,
                  top: `${segment.y * 3.33}%`,
                  opacity: gradientOpacity
                }}
              >
                {segmentIndex === 0 ? '●' : '▪'}
              </div>
            )
          })
        )}

        {/* Player Snake */}
        {snake.map((segment, index) => {
          // Create a smooth gradient from head (1.0) to tail (0.2)
          const headOpacity = 1.0
          const tailOpacity = 0.2
          const gradientOpacity = index === 0 
            ? headOpacity 
            : headOpacity - ((headOpacity - tailOpacity) * (index / Math.max(snake.length - 1, 1)))
          
          return (
            <div
              key={index}
              className="absolute text-neutral-600 dark:text-neutral-400 text-xs leading-none select-none"
              style={{
                left: `${segment.x * 2.5}%`,
                top: `${segment.y * 3.33}%`,
                opacity: gradientOpacity
              }}
            >
              {index === 0 ? getHeadChar() : '■'}
            </div>
          )
        })}
        
        {/* Player Food */}
        {food && (
          <div
            className="absolute text-neutral-700 dark:text-neutral-300 text-xs leading-none select-none"
            style={{
              left: `${food.x * 2.5}%`,
              top: `${food.y * 3.33}%`
            }}
          >
            ◆
          </div>
        )}

        {/* AI Food */}
        {aiFood.map((aiFoodItem, index) => (
          <div
            key={`ai-food-${index}`}
            className={`absolute text-xs leading-none select-none opacity-70 ${aiFoodItem.color}`}
            style={{
              left: `${aiFoodItem.x * 2.5}%`,
              top: `${aiFoodItem.y * 3.33}%`
            }}
          >
            ○
          </div>
        ))}
      </div>

      {!gameStarted && (
        <div className="absolute bottom-4 right-4 text-xs text-neutral-500 dark:text-neutral-400 opacity-50">
          Press WASD to start snake
        </div>
      )}
      
      {autoPlay && (
        <div className="absolute bottom-4 left-4 text-xs text-neutral-500 dark:text-neutral-400 opacity-50">
          Auto-playing... Press any key to take control
        </div>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <>
      <SnakeGame />
      <section className="relative z-10">
      <div className="mb-16 flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h1 className="mb-2 text-4xl font-semibold tracking-tighter text-neutral-700 dark:text-neutral-300">
            artyom kulimov
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 tracking-wide">
            developer - student
          </p>
        </div>
        <div className="mt-4 sm:mt-0 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <a href="https://github.com/wumpiee" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
            github
          </a>
          <a href="mailto:artyomkulimov@gmail.com" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
            email
          </a>
          <a href="https://www.linkedin.com/in/artyom-kulimov-7a5032265/" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors">
            linkedin
            </a> 
          <div className="text-neutral-600 dark:text-neutral-400">
            discord: wumpiee
          </div>
        </div>
      </div>

      <div className="relative mb-16">
        <div className="absolute left-0 top-0 w-8 h-px bg-neutral-300 dark:bg-neutral-600"></div>
        <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-8">projects</h2>
        
        <div className="space-y-8">
          <motion.div
            className="relative group pb-4"
            whileHover="hover"
            initial="initial"
          >
            {/* Vertical line */}
            <motion.div
              className="absolute -left-4 -top-2 w-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { height: 0 },
                hover: { height: "calc(100% + 1rem)" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Horizontal line */}
            <motion.div
              className="absolute -left-4 -top-2 h-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { width: 0 },
                hover: { width: "calc(100% + 1rem)" }
              }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            />
            <div>
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">examvault</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">co-founder & head of mobile engineering</p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                ai-powered revision assistant for a-level students—learn where you're weak, get tailored questions, practice smart. 
                built with next.js, tailwind, drizzle orm, neon db. fine-tuning models to help students level up.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative group pb-4"
            whileHover="hover"
            initial="initial"
          >
            {/* Vertical line */}
            <motion.div
              className="absolute -left-4 -top-2 w-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { height: 0 },
                hover: { height: "calc(100% + 1rem)" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Horizontal line */}
            <motion.div
              className="absolute -left-4 -top-2 h-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { width: 0 },
                hover: { width: "calc(100% + 1rem)" }
              }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-neutral-800 dark:text-neutral-200">svoitaxi</h3>
                <span className="px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded">high-wip</span>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                localized ride-hailing app for rostunovo, russia. inspired by yandex go—simple ui, next.js backend, bundled for ios. 
                targeting small towns, low friction.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative group pb-4"
            whileHover="hover"
            initial="initial"
          >
            {/* Vertical line */}
            <motion.div
              className="absolute -left-4 -top-2 w-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { height: 0 },
                hover: { height: "calc(100% + 1rem)" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Horizontal line */}
            <motion.div
              className="absolute -left-4 -top-2 h-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { width: 0 },
                hover: { width: "calc(100% + 1rem)" }
              }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            />
            <div>
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">tap.tm</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                real-estate listing app in react native (expo). clean, intuitive browsing and posting. client project, not deployed yet—screenshots coming soon
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative group pb-4"
            whileHover="hover"
            initial="initial"
          >
            {/* Vertical line */}
            <motion.div
              className="absolute -left-4 -top-2 w-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { height: 0 },
                hover: { height: "calc(100% + 1rem)" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Horizontal line */}
            <motion.div
              className="absolute -left-4 -top-2 h-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { width: 0 },
                hover: { width: "calc(100% + 1rem)" }
              }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            />
            <div>
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">transfer ledger</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                lightweight hawala-style transaction tracker in next.js. tracks transfers securely and simply.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative group pb-4"
            whileHover="hover"
            initial="initial"
          >
            {/* Vertical line */}
            <motion.div
              className="absolute -left-4 -top-2 w-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { height: 0 },
                hover: { height: "calc(100% + 1rem)" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Horizontal line */}
            <motion.div
              className="absolute -left-4 -top-2 h-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { width: 0 },
                hover: { width: "calc(100% + 1rem)" }
              }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-neutral-800 dark:text-neutral-200">smac khalifa university app</h3>
                <a href="https://github.com/danielarbabian/martab" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors text-xs">
                  github
                </a>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                garbage organization app using ai to detect the correct garbage bin that the item should be put in, tracks saved carbon emissions
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative group pb-4"
            whileHover="hover"
            initial="initial"
          >
            {/* Vertical line */}
            <motion.div
              className="absolute -left-4 -top-2 w-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { height: 0 },
                hover: { height: "calc(100% + 1rem)" }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Horizontal line */}
            <motion.div
              className="absolute -left-4 -top-2 h-0.5 bg-neutral-800 dark:bg-neutral-200"
              variants={{
                initial: { width: 0 },
                hover: { width: "calc(100% + 1rem)" }
              }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            />
            <div>
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">sia node & media server</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                self-hosted infra project—16 TB siacoin node for passive income + media stack (jellyfin, radarr, sonarr, prowlarr, transmission), all behind tailscale VPN.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 w-8 h-px bg-neutral-300 dark:bg-neutral-600"></div>
        <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-8">experience</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">nebuladevs</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              experimented co-founding <strong>nebuladevs</strong>, built client sites, learned real dev + delivery.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">examvault</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              then co-founded <strong>examvault</strong>, where ai and education meet to help students learn smarter.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
