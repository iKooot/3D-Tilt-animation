$(function () {

	//3d animation

	const body = document.querySelector('body')
	cx = window.innerWidth / 2
	cy = window.innerHeight / 2

	body.addEventListener('mousemove', e => {
		clientX = e.pageX
		clientY = e.pageY

		// console.log(e.pageX + ' / ' + e.pageY)

		reqest = requestAnimationFrame(updateMe)

		mouseCoords(e)
		cursor.classList.remove('hidden')
		follower.classList.remove('hidden')
	})

	function updateMe() {
		dx = clientX - cx
		dy = clientY - cy
		tiltx = dy / cy
		tilty = dx / cx
		radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2))
		degree = radius * 12
		gsap.to('.content', 1, { transform: `rotate3d(${tiltx}, ${tilty}, 0, ${degree}deg)` })
	}

	gsap.to('.card', { zoom: .98 })
	gsap.to('.mainL1', { opacity: 1, duration: .1 })
	gsap.to('.mainL2', { opacity: 1, left: -10, top: 15, duration: .5, delay: .25 })
	gsap.to('.mainL3', { opacity: 1, left: -20, top: 30, duration: .5, delay: .25 })
	gsap.to('.mapRussia', { opacity: .07, duration: .1 })
	gsap.to('.cardChip', { opacity: 1, duration: .225 })
	gsap.to('.cardLogo', { opacity: 1, duration: .225 })
	gsap.to('.cardValid', { opacity: 1, duration: .1, delay: .25 })
	gsap.to('.cardNumber', { opacity: 1, duration: .1, delay: .25 })

	//cursor

	const cursor = document.getElementById('cursor'),
		follower = document.getElementById('aura'),
		links = document.getElementsByTagName('a')

	mouseX = 0, mouseY = 0, posX = 0, posY = 0

	function mouseCoords(e) {
		mouseX = e.pageX
		mouseY = e.pageY
	}

	gsap.to({}, .01, {
		repeat: -1,

		onRepeat: () => {
			posX += (mouseX - posX) / 5
			posY += (mouseY - posY) / 5

			gsap.set(cursor, {
				css: {
					left: mouseX,
					top: mouseY
				}
			})
			gsap.set(follower, {
				css: {
					left: posX - 20,
					top: posY - 20
				}
			})
		}
	})

	//if cursor on link

	for (let i = 0; i < links.length; i++) {

		links[i].addEventListener('mouseover', () => {
			cursor.classList.add('active')
			follower.classList.add('active')
		})

		links[i].addEventListener('mouseout', () => {
			cursor.classList.remove('active')
			follower.classList.remove('active')
		})
	}

	// if cursor ges off screen

	body.addEventListener('mouseout', () => {
		cursor.classList.add('hidden')
		follower.classList.add('hidden')
	})
});
