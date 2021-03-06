var svg = document.querySelector('#svg');
var processBar = document.querySelector('.loading-process>p');

var imgList = ['cimg/car.png', 'cimg/hotel.png', 'cimg/staff0.png', 'cimg/staff1.png', 'cimg/staff2.png', 'cimg/staff3.png'];
Object.keys(Array.apply(null, {length: 8})).forEach(function(i){
	i = (i|0) + 1;
	imgList.push('cimg/b' + i + '.png')
});
var imgCount = imgList.length;
var loadingTimer;
var imgCache = {};

function getImgObj(url){
	if(!url) return {};
	if(imgCache[url]) return imgCache[url];
	var img = new Image();
	img.src = url;
	imgCache[url] = img;
	return img
}

function startLoading(){
	var sharps = [];
	sharps.push("M296.17,393.49c2.99,2.62,7.34,6.63,12.54,11.05 c0.71,0.3,1.48,0.46,2.29,0.46c3.31,0,6-2.69,6-6c0-0.51-0.06-1-0.18-1.47l-0.99-0.81c-3.32-2.97-8.23-7.55-14.09-12.47 c-0.55-0.16-1.14-0.25-1.74-0.25c-3.31,0-6,2.69-6,6c0,0.7,0.12,1.37,0.34,2L296.17,393.49z");
	sharps.push("M296.17,393.49c6.41,5.62,19.11,17.69,33,26.35 c0.43,0.11,0.87,0.16,1.33,0.16c3.04,0,5.5-2.46,5.5-5.5c0-1.42-0.53-2.71-1.41-3.69c-6.64-4.42-13.91-10.13-18.76-14.09 c-5.66-5.07-15.99-14.84-27.7-22.96l-0.29,0.36c-1.01-1.29-2.58-2.12-4.34-2.12c-3.04,0-5.5,2.46-5.5,5.5 c0,1.02,0.28,1.98,0.77,2.81C285.03,384.58,291.65,389.8,296.17,393.49z");
	sharps.push("M296.17,393.49c11.89,10.43,45.41,43.01,67.99,34.93 c1.64-0.59,3.17-1.23,4.61-1.93l-0.2-0.74c1.99-0.66,3.43-2.54,3.43-4.75c0-2.76-2.24-5-5-5c-0.48,0-0.95,0.07-1.39,0.19 c-7.34,3.05-16.2,2.63-22.53-0.38c-7.92-3.77-20.16-13.31-27.25-19.09c-12.06-10.8-45.41-43.01-67.99-34.93 c-1.24,0.44-2.42,0.92-3.54,1.43l-0.06,0.84c-2.4,0.36-4.24,2.43-4.24,4.94c0,2.76,2.24,5,5,5c1.26,0,2.41-0.47,3.29-1.24l0.39,0.44 c6.84-2.1,14.55-1.51,20.24,1.2C276.84,378.17,289.08,387.7,296.17,393.49z");
	sharps.push("M247.84,361.79c-19.7,7.05-25.11,22.44-24.83,35.03h0.03 l-0.03,0.22c0.02,0.49,0.04,0.98,0.07,1.46c0.43,2.56,2.47,4.5,4.92,4.5c2.51,0,4.59-2.04,4.94-4.69c-0.07-0.96-0.11-1.97-0.11-3.02 c0-22.33,23.23-27.02,36.09-20.89c7.92,3.77,20.16,13.3,27.25,19.09c11.89,10.43,45.41,43.01,67.99,34.93 c18.04-6.46,24.1-19.92,24.77-31.81c-0.38-2.62-2.44-4.61-4.93-4.61c-2.34,0-4.31,1.77-4.85,4.16 c-0.84,21.26-23.45,25.66-36.07,19.65c-7.92-3.77-20.16-13.31-27.25-19.09C303.77,385.92,270.42,353.71,247.84,361.79z");
	sharps.push("M296.17,393.49c11.89,10.43,45.41,43.01,67.99,34.93 c27.17-9.73,27.17-35.3,22.52-47.55c-3.38-8.9-13.37-17.43-24.76-19.76c-2.24,0.5-3.92,2.5-3.92,4.89c0,2.11,1.3,3.91,3.15,4.65 L361,371l-0.15,0.75c8.22,1.41,18.32,6.7,18.32,23.17c0,22.33-23.23,27.01-36.09,20.89c-7.92-3.77-20.16-13.31-27.25-19.09 c-12.06-10.8-45.41-43.01-67.99-34.93c-27.17,9.73-27.17,35.3-22.52,47.54c2.89,7.61,10.61,14.95,19.9,18.37l0.16-0.44 c0.76,0.47,1.66,0.74,2.62,0.74c2.76,0,5-2.24,5-5c0-2.5-1.83-4.57-4.23-4.94l0.04-0.11c-7.67-1.98-15.98-7.73-15.98-22.66 c0-22.33,23.23-27.02,36.09-20.89C276.84,378.17,289.08,387.7,296.17,393.49z");
	sharps.push("M296.17,393.49c11.89,10.43,45.41,43.01,67.99,34.93 c27.17-9.73,27.17-35.3,22.52-47.55c-4.65-12.24-21.8-23.77-37.88-19.45c-9.64,2.59-20.56,9.97-27.77,15.47l0.19,0.15 c-0.76,0.95-1.22,2.15-1.22,3.46c0,3.04,2.46,5.5,5.5,5.5c0.68,0,1.32-0.12,1.92-0.35c7.04-5.52,17.93-13.23,24.95-14.14 c6.39-0.83,26.8,0,26.8,23.41c0,22.33-23.23,27.01-36.09,20.89c-7.92-3.77-20.16-13.31-27.25-19.09 c-12.06-10.8-45.41-43.01-67.99-34.93c-27.17,9.73-27.17,35.3-22.52,47.54c4.65,12.25,21.8,23.77,37.88,19.45 c10.2-2.74,21.84-10.84,28.98-16.4c0.52-0.83,0.82-1.82,0.82-2.88c0-3.04-2.46-5.5-5.5-5.5c-1.01,0-1.96,0.27-2.77,0.74l-0.11-0.22 c-7.04,5.53-17.96,13.26-24.99,14.18c-6.39,0.83-26.8,0-26.8-23.41c0-22.33,23.23-27.02,36.09-20.89 C276.84,378.17,289.08,387.7,296.17,393.49z");
	sharps.push("M296.17,393.49l1.22,1.07L291,399l-0.24,0.47 c-3.65,3.15-21.24,17.94-31.13,19.23c-6.39,0.83-26.8,0-26.8-23.41c0-22.33,23.23-27.02,36.09-20.89 C276.84,378.17,289.08,387.7,296.17,393.49z M305.75,402c15.4,13.43,40.4,32.87,58.41,26.42c27.17-9.73,27.17-35.3,22.52-47.55 c-4.65-12.24-21.8-23.77-37.88-19.45c-16.08,4.33-35.74,21.97-35.74,21.97l0.15,0.16l-6.79,4.73 c-15.42-13.53-40.47-32.97-58.58-26.49c-27.17,9.73-27.17,35.3-22.52,47.54c4.65,12.25,21.8,23.77,37.88,19.45 c14.98-4.02,33.07-19.62,35.47-21.73L299,407L305.75,402z M320.42,391.17l0.14,0.15c0,0,20.73-18.37,31.81-19.81 c6.39-0.83,26.8,0,26.8,23.41c0,22.33-23.23,27.01-36.09,20.89c-7.92-3.77-20.16-13.31-27.25-19.09l-1.32-1.19L320.42,391.17z");
	sharps.push("M274,440.5c0,3.04,2.46,5.5,5.5,5.5s5.5-2.46,5.5-5.5 s-2.46-5.5-5.5-5.5S274,437.46,274,440.5z M328,351.5c0,3.04,2.46,5.5,5.5,5.5s5.5-2.46,5.5-5.5s-2.46-5.5-5.5-5.5 S328,348.46,328,351.5z M296.17,393.49c11.89,10.43,45.41,43.01,67.99,34.93c27.17-9.73,27.17-35.3,22.52-47.55 c-4.65-12.24-21.8-23.77-37.88-19.45c-16.08,4.33-35.74,21.97-35.74,21.97l7.5,7.93c0,0,20.73-18.37,31.81-19.81 c6.39-0.83,26.8,0,26.8,23.41c0,22.33-23.23,27.01-36.09,20.89c-7.92-3.77-20.16-13.31-27.25-19.09 c-12.06-10.8-45.41-43.01-67.99-34.93c-27.17,9.73-27.17,35.3-22.52,47.54c4.65,12.25,21.8,23.77,37.88,19.45 c16.08-4.32,35.74-21.97,35.74-21.97l-7.5-7.92c0,0-20.73,18.37-31.81,19.81c-6.39,0.83-26.8,0-26.8-23.41 c0-22.33,23.23-27.02,36.09-20.89C276.84,378.17,289.08,387.7,296.17,393.49z");
	sharps.push("M296.17,393.49c11.89,10.43,45.41,43.01,67.99,34.93 c27.17-9.73,27.17-35.3,22.52-47.55c-4.65-12.24-21.8-23.77-37.88-19.45c-6.85,1.85-14.35,6.11-20.7,10.39l6.76,8.33 c5.99-4.15,12.67-8,17.51-8.63c6.39-0.83,26.8,0,26.8,23.41c0,22.33-23.23,27.01-36.09,20.89c-7.92-3.77-20.16-13.31-27.25-19.09 c-12.06-10.8-45.41-43.01-67.99-34.93c-27.17,9.73-27.17,35.3-22.52,47.54c4.65,12.25,21.8,23.77,37.88,19.45 c7.15-1.92,15.01-6.47,21.52-10.93l-7.01-8.18c-6.13,4.29-13.09,8.38-18.08,9.03c-6.39,0.83-26.8,0-26.8-23.41 c0-22.33,23.23-27.02,36.09-20.89C276.84,378.17,289.08,387.7,296.17,393.49z M290.1,460.35c-2.38-4.42-4.15-10.9-4.58-20.41 c-0.34-3.6-2.44-5.4-5.52-5.4c-3.21,0.18-5.54,2.66-5.54,5.94v0.18c0,0-1.16,15.48,6.1,27.26c0.98,0.68,2.16,1.08,3.44,1.08 c3.31,0,6-2.69,6-6c0-0.84-0.18-1.65-0.49-2.38L290.1,460.35z M329,326c-3.22,0-5.84,2.53-6,5.7c2.47,4.4,4.28,10.86,4.71,20.36 c0,3.42,3,5.4,6.08,5.4c3.03-0.36,4.97-2.66,4.97-5.94v-0.18c0,0,0.86-11.96-4.27-22.86l-0.44,0.28C332.98,327.1,331.12,326,329,326 z");
	sharps.push("M296.17,393.49c11.89,10.43,45.41,43.01,67.99,34.93 c27.17-9.73,27.17-35.3,22.52-47.55c-4.65-12.24-21.8-23.77-37.88-19.45c-11.58,3.11-25,13.13-31.62,18.5l8.01,7.51 c6.76-5.47,19.37-14.91,27.18-15.92c6.39-0.83,26.8,0,26.8,23.41c0,22.33-23.23,27.01-36.09,20.89 c-7.92-3.77-20.16-13.31-27.25-19.09c-12.06-10.8-45.41-43.01-67.99-34.93c-27.17,9.73-27.17,35.3-22.52,47.54 c4.65,12.25,21.8,23.77,37.88,19.45c11.07-2.97,23.83-12.26,30.72-17.76l-7.06-8.3c-6.74,5.47-19.4,14.96-27.23,15.98 c-6.39,0.83-26.8,0-26.8-23.41c0-22.33,23.23-27.02,36.09-20.89C276.84,378.17,289.08,387.7,296.17,393.49z M308.02,322.41 c7.19,0.44,18.51,3.83,19.69,29.65c0,3.42,3,5.4,6.08,5.4c3.03-0.36,4.97-2.66,4.97-5.94v-0.18c0,0,2.44-34.07-25.59-39.59 l-0.48,0.7c-0.67-0.29-1.41-0.45-2.19-0.45c-3.04,0-5.5,2.46-5.5,5.5C305,319.65,306.23,321.5,308.02,322.41z M303.56,469.61 c-6.22-0.46-16.89-4.33-18.04-29.67c-0.34-3.6-2.44-5.4-5.52-5.4c-3.21,0.18-5.54,2.66-5.54,5.94v0.18c0,0-2.58,34.31,23.93,39.64 l0.89-0.44c0.39,0.09,0.8,0.14,1.22,0.14c3.04,0,5.5-2.46,5.5-5.5c0-1.94-1-3.64-2.51-4.62L303.56,469.61z");
	sharps.push("M296.17,393.49c11.89,10.43,45.41,43.01,67.99,34.93 c27.17-9.73,27.17-35.3,22.52-47.55c-4.65-12.24-21.8-23.77-37.88-19.45c-16.08,4.33-35.74,21.97-35.74,21.97l7.5,7.93 c0,0,20.73-18.37,31.81-19.81c6.39-0.83,26.8,0,26.8,23.41c0,22.33-23.23,27.01-36.09,20.89c-7.92-3.77-20.16-13.31-27.25-19.09 c-12.06-10.8-45.41-43.01-67.99-34.93c-27.17,9.73-27.17,35.3-22.52,47.54c4.65,12.25,21.8,23.77,37.88,19.45 c16.08-4.32,35.74-21.97,35.74-21.97l-7.5-7.92c0,0-20.73,18.37-31.81,19.81c-6.39,0.83-26.8,0-26.8-23.41 c0-22.33,23.23-27.02,36.09-20.89C276.84,378.17,289.08,387.7,296.17,393.49z M305.02,311c-19.39,0-26.85,12.88-29.68,24.09 l0.18,0.07c-0.33,0.71-0.52,1.5-0.52,2.34c0,3.04,2.46,5.5,5.5,5.5c2.46,0,4.54-1.61,5.24-3.84l0.74,0.29 c4.19-16.87,14.6-17.25,18.9-17.1c6.61,0,20.99,0.42,22.33,29.71c0,3.42,3,5.4,6.08,5.4c3.03-0.36,4.97-2.66,4.97-5.94v-0.18 C338.76,351.34,341.65,311,305.02,311z M305.73,481c16.41,0,24.89-8.09,29.26-17.03l-0.1-0.15c0.7-0.93,1.11-2.08,1.11-3.32 c0-3.04-2.46-5.5-5.5-5.5c-2.37,0-4.39,1.5-5.17,3.6l-0.72-0.05c-5.06,10.89-13.78,11.1-18.52,11.1 c-5.18,0.18-19.24-0.42-20.57-29.71c-0.34-3.6-2.44-5.4-5.52-5.4c-3.21,0.18-5.54,2.66-5.54,5.94v0.18 C274.46,440.66,271.42,481,305.73,481z");
	sharps.push("M296.17,393.49c11.89,10.43,45.41,43.01,67.99,34.93 c27.17-9.73,27.17-35.3,22.52-47.55c-4.65-12.24-21.8-23.77-37.88-19.45c-16.08,4.33-35.74,21.97-35.74,21.97l7.5,7.93 c0,0,20.73-18.37,31.81-19.81c6.39-0.83,26.8,0,26.8,23.41c0,22.33-23.23,27.01-36.09,20.89c-7.92-3.77-20.16-13.31-27.25-19.09 c-12.06-10.8-45.41-43.01-67.99-34.93c-27.17,9.73-27.17,35.3-22.52,47.54c4.65,12.25,21.8,23.77,37.88,19.45 c16.08-4.32,35.74-21.97,35.74-21.97l-7.5-7.92c0,0-20.73,18.37-31.81,19.81c-6.39,0.83-26.8,0-26.8-23.41 c0-22.33,23.23-27.02,36.09-20.89C276.84,378.17,289.08,387.7,296.17,393.49z M305.02,311c-34.31,0-31.27,40.34-31.27,40.34v0.18 c0,3.28,2.32,5.76,5.54,5.94c3.07,0,5.18-1.8,5.51-5.4c1.34-29.29,15.39-29.89,20.58-29.71c6.61,0,20.99,0.42,22.33,29.71 c0,3.42,3,5.4,6.08,5.4c3.03-0.36,4.97-2.66,4.97-5.94v-0.18C338.76,351.34,341.65,311,305.02,311z M305.73,481 c36.63,0,33.75-40.34,33.75-40.34v-0.18c0-3.28-1.94-5.58-4.98-5.94c-3.07,0-6.07,1.98-6.08,5.4 c-1.33,29.29-15.72,29.71-22.33,29.71c-5.18,0.18-19.24-0.42-20.57-29.71c-0.34-3.6-2.44-5.4-5.52-5.4 c-3.21,0.18-5.54,2.66-5.54,5.94v0.18C274.46,440.66,271.42,481,305.73,481z");

	document.querySelector('.loading-wrap').classList.remove('hide');

	var i = 0, loopCount = 0;
	var raf = new DelayRAF();
	setTimeout(function anim() {
		if(i >= sharps.length) i = 0;
		svg.setAttribute('d', sharps[i]);

		i+=1;
		if(i == sharps.length) {
			if((imgCount == 0 && window.userState != null) || (window.userState < 0) || loopCount >= 15) { //图片已加载完+jsonp都已回调，或者jsonp回包错误码，或者循环了15次，直接切换场景
				toggleScene()
			} else {  //最后一帧svg，停个2秒
				loopCount++;
				raf.timeout(anim, 2000);
			}
		} else {
			raf.timeout(anim, 65);
		}
	}, 0)
}

function DelayRAF(){
	this.lastTime = 0;
}
DelayRAF.prototype.timeout = function(callback, interval){
	var that = this;
	loadingTimer = requestAnimationFrame(function anim(){
		var time = parseInt(Date.now());
		if(time - that.lastTime > interval){
			callback();
			that.lastTime = time;
		} else {
			setTimeout(anim, 30)  //调整速度，还是用setTimeout吧
		}
	});
};

function toggleNotice(state, info){
	var notice = document.querySelector('.notice');
	if(info) {
		notice.innerHTML = info;
	}
	var func = state ? 'add' : 'remove';
	notice.classList[func]('into')
}

function errorHandle(info){
	processBar.parentNode.removeChild(processBar);
	document.querySelector('#loading-tip').innerHTML = info
}

function toggleScene() {
	window.userState = 1;
	if(window.userState !=0 && window.userState !=1) {  //异常处理
		switch (window.userState){
			case null:
			case -1:
				errorHandle('请求异常，请使用OA登记的手Q号码访问');
				break;
			case -2:
				errorHandle('请使用手Q访问');
				break;
		}

		return;
	} else if(window.userState ==1){
		toggleNotice(null, '你已经签到成功咯')
	}

	processBar.style.width = '100%';
	cancelAnimationFrame(loadingTimer);
	loadingTimer = null;
	drawCanvas();
	var loading = document.querySelector('.loading-all');
	setTimeout(function(){
		loading.classList.add('fade');
		setTimeout(function(){
			loading.parentNode.removeChild(loading);
		}, 1000);
	}, 50);

}

function loadImgs() {
	var process = 0;
	imgList.forEach(function load(url){
		var img = new Image();
		img.onload = function(){
			imgCount -= 1;
			process += 6.7;
			processBar.style.width = process + '%'
		};
		img.onerror = function(){
			load(url)
		};
		img.src = url;
		imgCache[url] = img;
	})
}

function drawCanvas(){
	var c = document.querySelector("canvas");
	var cacheCanvas = document.createElement("canvas");

	var c_width = c.width,
		c_height = c.height;

	cacheCanvas.width = c_width;
	cacheCanvas.height = c_height;
	var context = c.getContext("2d");
	var ctx = cacheCanvas.getContext("2d");
	var ratio = window.innerHeight / 700;
	c.style.transform = 'scale(' + ratio + ',' + ratio +')';

	var tranX = 0, tranY = 0;
	var tranXCount = 0, tranYCount = 0;
	var tranCount = 0;
	var speed = 0.01;
	var topBuildings = [1,2,8,3,6,5,4,2].map(function(i){return 'cimg/b'+i+'.png'}),
		bottomBuildings = [7,5,6,4,1,2,3,6,8].map(function(i){return 'cimg/b'+i+'.png'});

	var timer = setTimeout(function draw(isEnd){
		ctx.clearRect(0, 0, c_width, c_height);

		ctx.translate(tranX, tranY);

		if(tranX != 0){
			tranXCount += Math.abs(tranX);
			tranYCount += Math.abs(tranY);
		}

		tranX = tranX - speed;
		tranY = tranY + speed * (Math.tan(Math.PI/6)).toFixed(2);

		tranCount += 1;

		if(tranX<-4.95) {
			speed = -0.0112
		}
		if(tranCount > 920) {
			tranX = tranY = speed=0;
		}

		//console.log(tranXCount);
		// console.log(tranCount);

		//底色
		drawBg(ctx);
		//道路
		drawRoad(ctx, -56, 542);
		//斑马线
		drawLine(ctx, -18, 516);
		//
		drawHotel(ctx, 0, -444, 2440, isEnd);

		//上方的建筑
		drawBuilding(ctx, topBuildings, {x:-193, y:-250}, 180, function(){
			//车
			drawCar(ctx, 15+tranXCount, 415-tranYCount, function(){
				//下方的建筑
				drawBuilding(ctx, bottomBuildings, {x:-62, y:176}, 180, function(){
					timer = requestAnimationFrame(function(){
						context.clearRect(0, 0, c_width, c_height);
						context.drawImage(cacheCanvas, 0, 0, c_width, c_height);   //双缓存策略
						//console.log(tranCount);
						if(tranCount<1000){ // 小车行驶
							draw();
							if(tranCount>900 && !cacheCanvas.isEnd){
								cacheCanvas.isEnd = true;
								toggleNotice(true);
								setTimeout(toggleNotice, 6000);
							}
						} else {  //小车到点
							draw(true);
						}
					})
				});

			});
		});
	}, 0);
}

function drawHotel(ctx, initX, initY, len, isCarEnd){
	var img = getImgObj('cimg/hotel.png');
	var x = initX + Math.cos(Math.PI/6) * len;
	var y = initY - Math.sin(Math.PI/6) * len;
	ctx.drawImage(img, x, y, 726, 961);
	isCarEnd && drawStaff(ctx, x, y)
}


var drawStaff = (function(){
	var lastTime = 0, now;
	var index = 0;
	var draw = function(ctx, x, y){
		//TODO - draw the pic of staff promo
		var img = getImgObj( 'cimg/staff'+index+'.png' );
		ctx.drawImage(img, x+308, y+390, 160, 136);
	};

	return function(ctx, x, y){
		draw(ctx, x, y);
		now = Date.now();
		if(lastTime == 0) lastTime = now;
		if(now - lastTime > 5000){
			++index;
			if(index>3) index = 0;
			lastTime = now;
		}
	}
})();


function drawBuilding(ctx, imgList, initAxis, span, callback){
	var budingWidth = 469;
	var index = imgList.length;
	var draw = function(){
		--index;
		var url = imgList[index];
		var img = getImgObj(url);
		budingWidth = img.width || budingWidth;
		var x = initAxis.x + index * budingWidth - index * span;
		var y = initAxis.y - Math.tan(Math.PI/6)*(x - initAxis.x);
		ctx.drawImage(img, x, y, 469, 631);
		if(index > 0){
			draw()
		} else {
			callback && callback()
		}
	};
	draw()
}

function drawCar(ctx, initX, initY, callback){
	var img = getImgObj('cimg/car.png');
	ctx.drawImage(img, initX, initY, 100, 92);
	callback && callback();
}

function drawLine(ctx, initX, initY, span){
	var width = 80, height = 10;
	span = span || 50;
	var widthX = Math.cos(Math.PI/6) * width;
	var widthY = Math.sin(Math.PI/6) * width;
	var heightX = Math.cos(Math.PI/6) * height;
	var heightY = Math.sin(Math.PI/6) * height;
	ctx.fillStyle = "white";

	for(var i=0; i< 19; i++){
		ctx.lineWidth = 11;
		ctx.beginPath();

		ctx.moveTo(initX, initY);
		ctx.lineTo(initX + widthX, initY - widthY);
		ctx.lineTo(initX + widthX + heightX, initY - (widthY - heightY));
		ctx.lineTo(initX + heightX, initY + heightY);
		ctx.closePath();

		ctx.fill();

		initX = initX + widthX + heightX + span;
		initY = initY - (widthX + heightX + span) * Math.tan(Math.PI/6);
	}
}

function drawBg(ctx){
	ctx.beginPath();
	ctx.fillStyle = "#01A356";
	ctx.fillRect(0,-5000,5000,7000);
}

function drawRoad(ctx, initX, initY, len) {
	len = len || 3500;
	ctx.lineWidth = 122;
	ctx.beginPath();
	ctx.moveTo(initX, initY);
	ctx.lineTo( len * Math.cos(Math.PI/6) + initX, initY - len * Math.sin(Math.PI/6));
	ctx.strokeStyle="#EEE";
	ctx.stroke();


	ctx.lineWidth = 68;
	ctx.beginPath();
	ctx.moveTo(initX, initY);
	ctx.lineTo( len * Math.cos(Math.PI/6) + initX, initY - len * Math.sin(Math.PI/6));
	ctx.strokeStyle="#555555";
	ctx.stroke();
}



setTimeout(function(){  //延迟一点启动svg动画，避免卡顿
	startLoading();
}, 150);

setTimeout(function(){ //延迟一点加载图片，避免卡顿
	loadImgs();
}, 500);
