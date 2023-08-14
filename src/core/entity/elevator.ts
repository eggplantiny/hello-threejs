import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

interface Props {
  buildingHeight: number
  floorHeight: number
  duration: number
}

const DEFAULT_PROPS: Props = {
  buildingHeight: 50,
  floorHeight: 10,
  duration: 1000,
}

export function createElevator(props: Partial<Props>) {
  const { buildingHeight, floorHeight, duration } = { ...DEFAULT_PROPS, ...props }

  const elevatorGeometry = new BoxGeometry(5, 5, 5)
  const elevatorMaterial = new MeshBasicMaterial({ color: 0x00FF00 })
  const elevator = new Mesh(elevatorGeometry, elevatorMaterial)
  elevator.position.y = -(buildingHeight / 2)

  function moveToFloor(floorNumber: number) {
    const startY = elevator.position.y
    const targetY = (floorNumber * floorHeight) - (buildingHeight / 2) + (floorHeight / 2) - (elevatorGeometry.parameters.height / 2) - (floorHeight / 2)
    const distance = targetY - startY
    const startTime = Date.now()

    function animateElevator() {
      const elapsed = Date.now() - startTime
      const progress = elapsed / duration

      if (progress < 1) {
        elevator.position.y = startY + distance * progress
        requestAnimationFrame(animateElevator)
      }
      else {
        elevator.position.y = targetY
      }
    }

    requestAnimationFrame(animateElevator)
  }

  return {
    elevator,
    moveToFloor,
  }
}
