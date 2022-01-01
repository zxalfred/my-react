function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'object'
        ? child : createTextElement(child))
    },
  }
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(element.type)

  const isProperty = key => key !== 'children'

  Object.keys(element.props)
    .filter(isProperty)
    .forEach(key => {
      dom[key] = element.props[key]
    })

  element.props.children.forEach(child => render(child, dom))
  container.appendChild(dom)
}

const MyReact = {
  createElement,
  render,
}

/** @jsx MyReact.createElement */
const element = (
  <div style="background: cornflowerblue">
    <h1>Hello World</h1>
    <h2 style="text-align: right">from my react</h2>
  </div>
)

MyReact.render(element, document.querySelector('#root'))
