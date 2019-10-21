;(() => {
	let rootElement,
		rootDomElement,
		classCounter = 0
	const classesGroup = {}

	function isClass(fun) {
		return typeof fun === 'function' && /^class\s/.test(Function.prototype.toString.call(func))
	}

	const isFunctionalComponent = (element) => {
		return !isClass(element) && typeof element === 'function'
	}

	function shouldAddListener(prop) {
		return /^on.*$/.test(prop)
	}

	const newElement = (element) => {
		if (element.hasOwnProperty('tagName')) {
			return handleHtmlElement(element)
		} else if (element.hasOwnProperty('componentClass')) {
			return handleClass(element)
		} else if (isFunctionalComponent(element)) {
			return element(props)
		} else {
			console.log(`no sé que es ${element.componentClass}`)
		}
	}

	const handleHtmlElement = ({ tagName, type, children, value, textContent, min, max, onchange }) => {
		const domElement = document.createElement(tagName)
		if (textContent) domElement.innerText = textContent
		children && children.forEach((child) => appendChild(domElement, child))
		//_.forEach(props, (value, name) => appendProp(domElement, name, value))
		//Object.entries(props).forEach((prop) => appendProp(domElement, prop[0], prop[1]))
		return domElement
	}

	const appendChild = (element, child) => {
		if (child && child.componentClass) {
			appendChild(element, child.render())
		} else if (Array.isArray(child)) {
			child.forEach((ch) => appendChild(element, ch))
		} else if (typeof child === 'object') {
			debugger
			element.appendChild(child)
		} else {
			element.innerHTML += child
		}
	}

	const handleClass = (element) => {
		let { componentClass, props } = element

		classCounter++
		if (classesGroup[classCounter]) {
			return classesGroup[classCounter]
		}
		const reactElement = new componentClass(props)
		reactElement.render()
		classesGroup[classCounter] = reactElement
		return reactElement
	}

	const appendProp = (element, propName, propVal) => {
		if (shouldAddEventListener(propName)) {
			element.addEventListener(propName.substring(2).toLowerCase(), propVal)
		} else {
			element.setAttribute(propName, propVal)
		}
	}

	class Component {
		constructor(props) {
			this.props = props
		}

		setState(state) {
			this.state = Object.assign({}, this.state, state)
		}
	}

	window.Component = Component
	window.node = (props) => newElement(props)
	window.MiniReact = {
		render: (element, domElement) => {
			rootElement = element
			rootDomElement = domElement
			const currentDom = rootElement.render()
			rootDomElement.appendChild(currentDom)
		}
	}
})()
