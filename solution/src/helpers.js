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

module.exports = { clearProps, isAnEvent }
