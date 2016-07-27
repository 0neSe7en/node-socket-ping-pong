let net = require('net');

let pingpong = net.createServer();

pingpong.on('connection', (client) => {
	client.name = client.remoteAddress + ':' + client.remotePort;
	console.log(client.name + ' is connected.');
	client.write('Hello ' + client.name + '\n');

	client
		.on('data', (data) => {
			client.write('res:' + data);
			console.log('[GET]', data.toString());
		})
		.on('end', () => {
			console.log(client.name + ' disconnected...');
		})
		.on('error', (err) => {
			console.error('err:', err);
		})
});

pingpong.listen(8088);