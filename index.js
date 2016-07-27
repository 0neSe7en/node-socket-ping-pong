let net = require('net');
let fs = require('fs');

let policyFile =
	'<?xml version="1.0"?>' +
	'<!DOCTYPE cross-domain-policy SYSTEM "http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd">' +
	'<cross-domain-policy>' +
	'<allow-access-from domain="*" to-ports="*" />' +
	'</cross-domain-policy>';

console.log(policyFile);

let pingpong = net.createServer();

pingpong.on('connection', (client) => {
	client.name = client.remoteAddress + ':' + client.remotePort;
	console.log(client.name + ' is connected.');
	client.write('Hello ' + client.name + '\n');

	client
		.on('data', (data) => {
			if (data == '<policy-file-request/>\0') {
				console.log('Good request. Sending file to ' + client.remoteAddress + '.');
				console.log('成功建立连接');
				client.end(policyFile + '\0');
			} else {
				client.write('res:' + data);
				console.log('[GET]', data.toString());
			}
		})
		.on('end', () => {
			console.log(client.name + ' disconnected...');
		})
		.on('error', (err) => {
			console.error('err:', err);
		})
});

pingpong.listen(8088);
