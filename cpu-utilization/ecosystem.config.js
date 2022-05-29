module.exports = {
	apps: [
		{
			name: 'cpu-utilization',
			script: 'app.js',
			instances: 'max',
			args: 'one two',
			autorestart: true,
			watch: false,
			max_memory_restart: '2G',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};