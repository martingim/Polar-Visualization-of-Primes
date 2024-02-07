const input = document.getElementById('input') as HTMLInputElement
const button = document.getElementById('btn') as HTMLButtonElement
const zoomInn = document.getElementById('zx1') as HTMLHeadingElement
const zoomOut = document.getElementById('zx2') as HTMLHeadingElement
const primeNumber = document.getElementById('primeNumber') as HTMLHeadingElement
let zoomNum: number = 200
let numberOfPrimes: number = 0
let color = 'rgb(255,255,255)'

function polarToCartesian(r: number, a: number): [number, number] {
	const aRad: number = (a * Math.PI) / 180
	const x: number = r * Math.cos(aRad)
	const y: number = r * Math.sin(aRad)
	return [x, y]
}

const main = (inputUser: number, zoom: number): void => {
	const canvas = document.getElementById('primeCanvas') as HTMLCanvasElement | null
	let n: number = 0
	if (canvas) {
		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

		if (ctx) {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight

			ctx.fillStyle = color

			for (let k:  number = 0; k < inputUser; k++) {
				for (let r: number = 0; r < 113; r++) {
					n = 710*k + r
					const coordinates: [number, number] = polarToCartesian(n, n)
					const x: number = coordinates[0] * (zoom / inputUser) + window.innerWidth / 2
					const y: number = coordinates[1] * (zoom / inputUser) + window.innerHeight / 2
	
					ctx.fillRect(x, y, 1, 1) // Draw a pixel
				}
			}
		} else {
			console.error('Canvas context not available')
		}
	} else {
		console.error('Canvas element not found')
	}
}

zoomInn.addEventListener('click', (): void => {
	zoomNum /= 2
	initMain()
})

zoomOut.addEventListener('click', (): void => {
	zoomNum *= 2
	initMain()
})

button.addEventListener('click', (): void => {
	zoomNum = 200
	initMain()
})

const initMain = () => {
	let userInput: number = input.valueAsNumber < 1500000 ? input.valueAsNumber : 1500000
	primeNumber.textContent = `number of primes\nbetween\n0-${userInput}\u00A0=\u00A0${numberOfPrimes}`
	main(userInput, zoomNum)

	primeNumber.textContent = `number of primes\nbetween\n0-${userInput}\u00A0=\u00A0${numberOfPrimes}`
	input.valueAsNumber = userInput
	numberOfPrimes = 0
}
