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
				size: 150
				onClick: =>
					if @state.time < 0
						t = 1
					else
						t = -1
					@setState
						time: t

window.app = render(h(App),document.body)