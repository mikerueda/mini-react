import { isAnEvent, clearProps } from './helpers'
;(() => {
	let rootElement, rootDomElement
	// checks for type of props to either set them as a event of pass it down to element as html props renaming className to class if found.
	const appendProp = (element, name, value) => {
		if (isAnEvent(name)) {
			element.addEventListener(name.substring(2).toLowerCase(), value)
		} else if (name === 'className') {
			element.setAttribute('class', value)
		} else {
			element.setAttribute(name, value)
		}
	}
	// definition for class component with base constructor handling props and setState
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
	// clear the document and re runs through first element render method
	const reRender = () => {
		rootDomElement.innerHTML = ''
		renderElement(rootElement, rootDomElement)
	}
	// appends a child to it's parente depending on listo of elements or single one, leaving exeption for class components
	const appendChild = (element, child) => {
		if (child instanceof Array) {
			child.forEach((children) => appendChild(element, children))
		} else if (child instanceof HTMLElement) {
			element.appendChild(child)
		} else {
			appendChild(element, child.render())
		}
	}
	// on a given classComponent, apply render method and pass its props
	const handleClass = (element) => {
		let { componentClass, props } = element
		const reactElement = new componentClass(props)
		return reactElement
	}
	// create an html node whith given tag, sets texts if one if given and add props to it
	const handleHtmlElement = (props) => {
		let { tagName, textContent, children } = props
		const domElement = document.createElement(tagName)
		if (textContent) domElement.innerText = textContent
		children && children.forEach((child) => appendChild(domElement, child))
		Object.entries(clearProps(props)).forEach((prop) => appendProp(domElement, prop[0], prop[1]))
		return domElement
	}
	// checks for element props to either render as a html element or handle it a a class
	const createElement = (element) => {
		try {
			return (element.tagName && handleHtmlElement(element)) || (element.componentClass && handleClass(element))
		} catch (e) {
			throw new SyntaxError(
				'Your instance of Render() should have either a tagName or a componentClass and never both'
			)
		}
	}
	// recibes a classComponent to render and a node as parent element
	const renderElement = (element, domElement) => {
		rootElement = element
		rootDomElement = domElement
		const currentDom = rootElement.render()
		rootDomElement.appendChild(currentDom)
	}
	// exposing functions to window scope as used on App.js
	window.Component = Component
	window.node = createElement
	window.MiniReact = {
		render: renderElement
	}
})()
