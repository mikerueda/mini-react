;(() => {
	let rootElement, rootDomElement
	let unwantedProps = [ 'tagName', 'children', 'textcontent' ]

	const clearProps = (obj) => {
		if (obj.hasOwnProperty('componentClass')) throw Error()
		let newObj = { ...obj }
		unwantedProps.forEach((e) => {
			newObj.hasOwnProperty(e) && delete newObj[e]
		})
		return newObj
	}

	const isAnEvent = (property) => {
		return /^on.*$/.test(property)
	}

	const appendProp = (element, name, value) => {
		if (isAnEvent(name)) {
			element.addEventListener(name.substring(2).toLowerCase(), value)
		} else if (name === 'className') {
			element.setAttribute('class', value)
		} else {
			element.setAttribute(name, value)
		}
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
		rootDomElement.innerHTML = ''
		MiniReact.render(rootElement, rootDomElement)
	}

	const appendChild = (element, child) => {
		if (child instanceof Array) {
			child.forEach((children) => appendChild(element, children))
		} else if (child instanceof HTMLElement) {
			element.appendChild(child)
		} else {
			appendChild(element, child.render())
		}
	}

	const handleClass = (element) => {
		let { componentClass, props } = element
		const reactElement = new componentClass(props)
		return reactElement
	}

	const handleHtmlElement = (props) => {
		let { tagName, textContent, children } = props
		const domElement = document.createElement(tagName)
		if (textContent) domElement.innerText = textContent
		children && children.forEach((child) => appendChild(domElement, child))
		Object.entries(clearProps(props)).forEach((prop) => appendProp(domElement, prop[0], prop[1]))
		return domElement
	}

	window.Component = Component
	window.node = (element) => {
		try {
			return (element.tagName && handleHtmlElement(element)) || (element.componentClass && handleClass(element))
		} catch (e) {
			throw new SyntaxError(
				'Your instance of Render() should have either a tagName or a componentClass and never both'
			)
		}
	}

	window.MiniReact = {
		render: (element, domElement) => {
			rootElement = element
			rootDomElement = domElement
			const currentDom = rootElement.render()
			rootDomElement.appendChild(currentDom)
		}
	}
})()
