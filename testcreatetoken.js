
//openssl genrsa -des3 -out private.pem 2048 PRIVATE KEY
//openssl rsa -in private.key -outform PEM -pubout -out public.key PUBLIC KEY

var jwt = require('jsonwebtoken');
var jws = require('jws');
var fs = require('fs');
var path = require('path');

  
// console.log(__dirname);

// var pub = fs.readFileSync(path.join(__dirname+'/keys/', 'public.key'));
// var priv = fs.readFileSync(path.join(__dirname+'/keys/', 'private.key'));

// var header = { alg: 'RS256' };
// var payload = { iat: Math.floor(Date.now() / 1000 ), user: 'Vova', expiresIn: '1h'};

// var signed = jws.sign({
// 	header: header,
// 	payload: payload,
// 	secret: priv,
// 	encoding: 'utf8'
// });


// console.log("signed")
// console.log(signed)

// jwt.verify(signed, pub, {typ: 'JWT'}, function(err, p) {
// 	console.log("======================= verify ==================================")
// 	console.log("ERROR")
// 	console.log(err)
// 	console.log("RESULT")
// 	console.log(p)
// 	console.log(p.user)
// });



// console.log(Math.floor(Date.now() / 1000 ))

// console.log(Date.now())









// console.log("======================= key  one ==================================")
// console.log()
// console.log()



// var token = jwt.sign({ foo: 'vovan' }, 'shhhhh');

// console.log(token)


// console.log("====================== key two  ==================================")
// console.log()
// console.log()


 var cert = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDL0rwkGmwFHGDd\ngvKxoVj4h+G0rFvaVl5zViXE9CFWvcaYKZwH8KFab6jgqiL/ydfuzrSWg8ym3Rbp\nJn8aX5ZY82lGTtzFlXKCBLNMZ9BIT2poXOH5WJSDvWJd6qXyRlua9ssU0A6ZtMRG\nCWd7DgLyQrG+smpyKMjo0F58DV+59OE0iArVY2AT8tPMdlo+AERHLVNTKpLaPcLd\nmbj+liOyIZTv1zq1aCDGnyhKoHyv0SkrqKFC2rFvidON3VrEz/BBOBHViqedgncx\nJNXNf98GiIhEFFeSAoZiBRVLo2isVIly4EbG25ZbTghBm9Q1yDljfaQQpWkBGYYX\nmkVQ5F6zAgMBAAECggEAIiGXZNpR1WdDp0Ra3Lj+m5uxhZ5JQV4uMdUuvPT+sjZU\nT73EBaZbdrf1CS4kbz3/HVva7MuEVTr3r7JFHYb9N8cHDYF+Qc39X11nIvfNbpZx\n5KkNJEKbmBX6J2z4PgJfK6uBJWqTz1Rwe6PugrI9dxEJD7xzy8sdnbLq544bxhk5\nPc/v/evUqhp4ssZPYcKQ0TSxgMQx1GlmsNAU6lsr57a33Qa68/GzRglzQIDipENV\naUGv0SKt1d1QCLUvIQR7atwR94e4jkBgPK7mv9djAUVFdx4fNMM7j1qkMlXmGyK3\n9TWnJ++sh61mTZbh2QW0zPrF1OvopTBbVNCGjgkhTQKBgQD+PyOFSUxGv3SfU5Yl\njx9QXrtKdhIoWqOb7AmSRYykj2/8rXNP6JrJ784WohmnPta5lPSpQRNYBJuCp8tc\nWeZwPyKs9qsw+SGyOfJnHyqPgVsEjiYco98SaGfWkjNtSL1YctEDQiTuPK3wnz5Y\nSvO3mfH+JStVaHAM8G58kE72ZwKBgQDNOpNmxVOhR7rk7wafEzVh4Dj18lFyoxOr\ns/9PUBl1LXrAbCGlbwZYR6So4Bl/ZZ5iXzfJbW6Xa1jr/4bCi3BRnWTKdNwgLpRJ\ncuVTwZYaul49Gl+vKKHCmJTqidk446ulltpoiTU3kj8No5LnZdTBi/kCMjW0QeXd\nqgmo/czt1QKBgQC/QZfi6CStA9EjGanVTzjrKJgTh4ZZPPXekU0R76fBEvXXSlN4\nRS5Lwk1x0TcjDK5SpK73s7BtgenJ+5eLPUWQIq5fFp/pE0A55kVnNZa6pUBmyNf6\nq3tfSZLzYr+08gcdxiFdJiDJ5nOikug/WwLDltbnq+ZRNWM1GJjEs3ny+QKBgDmb\nY5zJbvwqgk+YuKcWYTmkEtkWt74SAIeF8vh0Z3D43yf8MkWZsJI/Kf0tSnr0L001\npRcpXI2sWD2GcHFTaqe+Inih7NgruvwTAEROZrAB+En2iT1FjoJtCf/7ybmqTpgg\njBYjzYhXyNMvQyEo+FuLys3PAjwi8z8RZ7zD4S4xAoGALnfH8IMw4twW3hbicAr6\nV4L63DLP8Xkt15rEb/KKeRnirxerTC0/gN8kIOuyMXJYrgSaTb8GC593FGg7wcX6\ncCyqAs/GymqWGx+C98HJm1Bwuxp1y8IpDnH5r5u2voXNIni+PqiMSn/6vsiyIVcb\nZz6kb4Az7hHeXsyQz11JZ1Y=\n-----END PRIVATE KEY-----\n"


// var cert = fs.readFileSync('./keys/private.key');
 var certP = fs.readFileSync('./keys/public.key');

//var token2 = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});

var token2 = jwt.sign({ foo: 'bar' }, cert);

console.log(token2)

console.log()
console.log()

// verify a token asymmetric

// jwt.verify(token2, certP, function(err, decoded) {
// 	console.log(err)
// 	console.log("======================  verify a token asymmetric  ==================================")
//   	console.log(decoded) // bar
// });



//var decoded = jwt.decode("eJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1NDA1NTMzOTB9.M6mdAJ9nD9S_MSaDQcilQJ5z1KjCreKQQboi5XqVHofe9inziqSbebhZaC4a9amwbrrWvMuJFq3Rj2aiogFT5UUx3NnYWhhtX6KR1DtaNencx3SeRRZQ9ggqHsVS57XnBak2hWt-f-o666FaIEOLPkthqZFwiIroaLKS9yYhwQuiPZE-m82rA_VaMs4ZS43_W1jGl4AcGwlsJOVtA5hLQcKkJyKoBnThLQxm0vHbt8r6Fq3EGqdg2pBeXzQ46oQrLQ8cA1spfJYBx8AFM0hApqt-xarHZQjmcA2Q6wTbnty5mbr4bNkEiblSWoQbqgpzHIs-I9svxJ5LPtUbKeTUvw");
var decoded = jwt.decode(token2)
console.log(decoded) // bar





// jwt.sign({ foo: 'bar', la: 'carbos', name: 'Vova' }, cert, function(err, token) {
// 	console.log("====================== Sign asynchronously  ==================================")
// 	console.log()
// 	console.log()

//   	console.log(token);

//   	console.log()
// 	console.log()


// 	jwt.verify(token, cert, function(err, decoded) {
// 		console.log(err)
// 		console.log("======================  verify a token asymmetric  ==================================")
//   		console.log(decoded) // bar
// 	});
// });

// console.log()
// console.log()
// console.log()
// console.log()


// console.log("====================== Backdate a jwt 30 seconds  ==================================")
// console.log()
// console.log()


// var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');


// console.log(older_token)

// console.log()
// console.log()


// console.log("======================  ==================================")


// var tokenLALALA =  jwt.sign({
//   exp: Math.floor(Date.now() / 1000) + (60 * 60),
//   data: 'foobar'
// }, 'secret');

// console.log(tokenLALALA)

// console.log()
// console.log()

// console.log("====================== Bs  ==================================")


// tokenLALALA =  jwt.sign({
//   data: 'foobar'
// }, 'secret', { expiresIn: 60 * 60 });

// console.log(tokenLALALA)

// console.log()
// console.log()


// console.log("====================== Bsccc  ==================================")


// tokenLALALA =  jwt.sign({
//   data: 'foobar'
// }, 'secret', { expiresIn: '1h' });

// console.log(tokenLALALA)

// console.log()
// console.log()


// var decoded = jwt.verify(older_token, 'shhhhh');
// console.log(decoded) // bar
















