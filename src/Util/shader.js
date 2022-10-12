var particleShader = {
    vertexShader: [
        // 전역변수
        'uniform float uScale;',

        // 속성 (변화값)
        'attribute vec3 positionStart;',
        'attribute vec3 velocity;',
        'attribute vec3 acceleration;',
        'attribute vec3 color;',
        'attribute float size;',
        'attribute float activate;',

        // fragment 셰이더에 넣는 값
        'varing vec4 vColor;',
        'varying float isActivate;',

        'void main(){',
            'vColor = vec4(color, 1.0);',
            'isActivate = activate;',
            
            'vec3 newPosition;',
            'vec3 vel;',
            
            'gl_pointSize = (uScale * size);',

            'vel.x = (vel.x + acceleration.x);',
            'vel.y = (vel.y + acceleration.y);',
            'vel.z = (vel.z + acceleration.z);',
            
            'velocity = vel',

            'newPosition = positionStart + velocity',

            'if (isActivate > 0) {',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );',
            '} ',

            'else {',
                'gl_Position.x = 0;',
                'gl_Position.y = 0;',
                'gl_Position.z = 0;',
                'gl_PointSize = 0.;',
            '}',
        '}'
    ].join('\n'),
    fragmentShader:[
        'varying vec4 vColor;',
        'varying float isActivate;',

        'void main() {',
            'float alpha = 0.;',
            'if( isActivate ) {',
                'alpha = 1.;',
            '} else {',
                'alpha = 0.;',
            '}',
            'gl_FragColor = vec4( vColor.rgb, alpha );',
        '}',
    ].join('\n')
}

var lifeShader = {
    vertexShader: [
        'uniform vec3 viewVector;',
		'uniform float c;',
		'uniform float p;',
		'varying float intensity;',
		'void main() ',
		'{',
			'vec3 vNormal = normalize( normalMatrix * normal );',
			'vec3 vNormel = normalize( normalMatrix * viewVector );',
			'intensity = pow( c - dot(vNormal, vNormel), p );',
			
			'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
		'}'
    ].join('\n'),
    fragmentShader:[
        'uniform vec3 glowColor;',
		'varying float intensity;',
		'void main() ',
		'{',
			'vec3 glow = glowColor * intensity;',
			'gl_FragColor = vec4( glow, 1.0 );',
		'}'
    ].join('\n')
}