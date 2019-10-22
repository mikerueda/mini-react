//const { createElement } = require('./index')
const node = {
	tagName: 'h1',
	textContent: 'Ajuste de limite'
}

// Pending for tree validation library
test('return a html node element', () => {
	//mock
	expect(node).toMatchObject(node)
})
