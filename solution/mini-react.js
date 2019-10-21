;(() => {
	let rootElement, rootDomElement
	let classCounter = 0
	const classesGroup = {}

	const appendProp = (element, name, value) => {
		if (isAnEvent(name)) {
			element.addEventListener(name.substring(2).toLowerCase(), value)
		} else {
			element.setAttribute(name, value)
		}
	}

	const isAnEvent = (property) => {
		return /^on.*$/.test(property)
	}

	const handleClass = (element) => {
		let { componentClass, props } = element
		classCounter++
		if (classesGroup[classCounter]) {
			return classesGroup[classCounter]
		}
		const reactElement = new componentClass(element)
		reactElement.render()
		classesGroup[classCounter] = reactElement
		return reactElement
	}

	class Component {
		constructor(props) {
			this.props = props
		}

		setState(state) {
			let newState = state()
			this.state = { ...this.state, ...newState }
			reRender()
		}
	}

	const reRender = () => {
		classCounter = 0
		rootDomElement.innerHTML = ''
		MiniReact.render(rootElement, rootDomElement)
	}

	const appendChild = (element, child) => {
		if (child.componentClass) {
			appendChild(element, child.render())
		} else if (child instanceof Array) {
			child.forEach((children) => appendChild(element, children))
		} else if (child instanceof HTMLElement) {
			element.appendChild(child)
		}
	}

	const handleHtmlElement = (props) => {
		let { tagName, textContent, children } = props
		const domElement = document.createElement(tagName)
		if (textContent) domElement.innerText = textContent
		children && children.forEach((child) => appendChild(domElement, child))
		Object.entries(props).forEach((prop) => appendProp(domElement, prop[0], prop[1]))
		return domElement
	}

	const newElement = (element) => {
		if (element.tagName) {
			return handleHtmlElement(element)
		} else if (element.componentClass) {
			return handleClass(element)
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
