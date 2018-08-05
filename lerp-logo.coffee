{h,Component} = require 'preact'
{Shader,Box} = require 'shader-box'
lerp_shader = require './logo-shader.glsl'

class LerpLogo extends Component
	componentDidMount: ->
		@_t = .1
		@base.width = @props.size || 50
		@base.height = @props.size || 50
		
		@box = new Box
			canvas: @base
			resize: false
			clearColor: [0,0,0,0]
			uv: [1,1]
			context:
				premultipliedAlpha: false
				antialias: no
				depth: no

		@shader = new Shader
			source: lerp_shader
			uniforms: 
				iTime:
					type: '1f'
					value: 0.0
				alpha:
					type: '1f'
					value: 0.0
				size:
					type: '1f'
					value: @props.size || 50

		@stage = 
			alpha: -4
			time: -1
		@state = 
			alpha: @props.alpha
			time: 1
		@box.add(@shader)

		if !@_anim
			@_anim = true
			@draw()
	onClick: =>
		
		@draw()
	draw: ()=>
		if !@base
			return
		
		if Math.abs(@stage.time - @state.time) < 0.01 &&  Math.abs(@stage.alpha - @state.alpha) < 0.01
			return
		
		@stage.time += (@state.time - @stage.time) * .1
		@stage.alpha += (@state.alpha - @stage.alpha) * .3
		@shader.uniforms.iTime.value = @stage.time
		@shader.uniforms.alpha.value = @stage.alpha
		
		requestAnimationFrame(@draw)
		@box.clear().draw(@shader)
	
	componentWillUpdate: (props)->
		if props.time != @state.time
			@state.time = props.time
			@draw()

			

	render: (props)->
		if @base
			@base.width = props.size || 50
			@base.height = props.size || 50
			@shader.uniforms.size.value = props.size || 50
		my_props = 
			style:
				cursor: 'pointer'
			width: props.size || 50
			height: props.size || 50
		Object.assign my_props,props
		
		h 'canvas',my_props

LerpLogo.defaultProps = 
	alpha: 1

module.exports = LerpLogo