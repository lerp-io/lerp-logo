LerpLogo = require './lerp-logo.coffee'
{render,h,Component} = require 'preact'
require './view.less'


class App extends Component
	constructor: (props)->
		super(props)
		@state=
			time: 1
	render: (props,state)->
		h 'div',
			className: 'main'
			h LerpLogo,
				time: @state.time
				size: 250
				onClick: =>
					@setState
						time: @state.time * -1

window.app = render(h(App),document.body)