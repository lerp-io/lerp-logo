{h,Component} = require 'preact'
{Shader,Box} = require 'shader-box'
lerp_shader = require './logo-shader.glsl'

class LerpLogo extends Component
	componentDidMount: ->
		@_t = .1
		@base.width = 50
		@base.height = 50
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

		@stage = 
			alpha: -4
			time: -1
		@state = 
			alpha: 1
			time: 1
		@box.add(@shader)

		if !@_anim
			@_anim = true
			@draw()
	onClick: =>
		if @stage.time < 0
			@state.time = 1
		else
			@state.time = -1
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


	render: ->
		h 'canvas',
			style:
				cursor: 'pointer'
			onClick: @onClick
			width: 50
			height: 50


module.exports = LerpLogo