const { isAnEvent, clearProps } = require('./helpers')

const props = {
	className: 'string',
	tagName: 'div',
	textcontent: 'sample text'
}

test('deletes unwanted props from props object', () => {
	expect(clearProps(props)).toEqual({ className: 'string' })
})

test('check if a given string prop and event', () => {
	expect(isAnEvent('onclick')).toBe(true)
	expect(isAnEvent('class')).toBe(false)
})
