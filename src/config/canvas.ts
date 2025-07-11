export const canvasFun = {
	/**
	 * canvas文本换行，没有省略号
	 * */
	fillTextLineBreak: (
		ctx: any,
		text: string,
		x: number,
		y: number,
		lw: number,
		lh: number
	) => {
		let i = 0;
		let n = 0;
		let r = -1;
		while (i < text.length) {
			while (
				ctx.measureText(text.substring(n, i)).width < lw &&
				i < text.length
			) {
				i++;
			}
			r++;
			ctx.fillText(text.substring(n, i), x, y + lh * r);
			n = i;
		}
		return lh * r;
	},
	/**
	 * 绘制文字自动换行,出现省略号
	 * @param array arr2 海报素材
	 * @param Number x , y 绘制的坐标
	 * @param Number maxWigth 绘制文字的宽度
	 * @param Number lineHeight 行高
	 * @param Number maxRowNum 最大行数
	 */
	canvasWraptitleText: (
		canvas: any,
		text: string,
		x: number,
		y: number,
		maxWidth: number,
		lineHeight: number,
		maxRowNum: number = 1
	) => {
		// canvas.font = '20px Bold PingFang SC'; //绘制文字的字号和大小
		// 字符分隔为数组
		var arrText = text.split("");
		var line = "";
		var rowNum = 1;
		for (var n = 0; n < arrText.length; n++) {
			var testLine = line + arrText[n];
			var metrics = canvas.measureText(testLine);
			var testWidth = metrics.width;
			if (testWidth > maxWidth && n > 0) {
				if (rowNum >= maxRowNum) {
					var arrLine = testLine.split("");
					// arrLine.splice(-9)
					var newTestLine = arrLine.join("");
					newTestLine += "...";
					canvas.fillText(newTestLine, x, y);
					//如果需要在省略号后面添加其他的东西，就在这个位置写（列如添加扫码查看详情字样）
					//canvas.fillStyle = '#2259CA';
					//canvas.fillText('扫码查看详情',x + maxWidth-90, y);
					return;
				}
				canvas.fillText(line, x, y);
				line = arrText[n];
				y += lineHeight;
				rowNum += 1;
			} else {
				line = testLine;
			}
		}
		canvas.fillText(line, x, y);
	},
	/**
	 * @description 图片转成圆形
	 * @param ctx ctx原生元素
	 * @param image 图片
	 * @param imgUrl 图片线上地址
	 * @param x 横坐标位置
	 * @param y 纵坐标位置
	 * @param r 圆角
	 * */
	drawAvatar: (
		ctx: any,
		image: any,
		imgUrl: string,
		x: number,
		y: number,
		r: number
	) => {
		return new Promise((resolve, reject) => {
			const d = r * 2;
			image.src = imgUrl;
			image.onload = () => {
				const cx = x + r;
				const cy = y + r;
				ctx.beginPath();
				ctx.arc(cx, cy, r, 0, 2 * Math.PI);
				ctx.strokeStyle = "#fa3534"; // 设置绘制圆形边框的颜色
				ctx.stroke(); // 绘制出圆形，默认为黑色，可通过 ctx.strokeStyle = '#FFFFFF'， 设置想要的颜色
				ctx.clip();

				ctx.drawImage(image.src, x, y, d, d);
				ctx.restore();
				resolve("成功");
			};
		});
	},
	/**
	 * @description: 方块圆角
	 * @param ctx ctx原生元素
	 * @param x x：x轴坐标
	 * @param y y：y轴坐标
	 * @param width width：矩阵的宽度
	 * @param height height：矩阵的高度
	 * @param radius radius：圆角角度
	 * @param color color：颜色
	 * @return {*}
	 * */
	drawRoundRect: (
		ctx: any,
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number,
		color?: string
	) => {
		ctx.lineWidth = 1;
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(x, y + radius);
		ctx.lineTo(x, y + height - radius);
		ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
		ctx.lineTo(x + width - radius, y + height);
		ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
		ctx.lineTo(x + width, y + radius);
		ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
		ctx.lineTo(x + radius, y);
		ctx.quadraticCurveTo(x, y, x, y + radius);
		ctx.stroke();
	},
	/**
	 * @description: aa
	 * @param ctx ctx元素：
	 * @param x x轴坐标
	 * @param y y轴坐标
	 * @param width 矩阵的宽度
	 * @param height 矩阵的高度
	 * @param radius 圆角角度
	 * @param color 颜色
	 * @return {*}
	 */
	fillRoundRect(
		ctx: any,
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number,
		color: string
	) {
		ctx.save();
		ctx.translate(x, y);
		ctx.fillStyle = color || "#000"; //若是给定了值就用给定的值否则给予默认值
		ctx.fill();
		ctx.restore();
	},
	/**
	 * @description 图片绘画
	 * @param ctx ctx元素
	 * @param image 图片存储容器
	 * @param url base64图片
	 * @param x 横坐标
	 * @param y 纵坐标
	 * @param width 宽度
	 * @param height 高度
	 * @param radius 圆角
	 * */
	drawImage(
		ctx: any,
		image: any,
		url: string,
		x: number,
		y: number,
		width: number,
		height: number,
		radius?: number
	) {
		return new Promise((resolve) => {
			image.crossOrigin = "Anonymous";
			image.src = url;
			image.onload = () => {
				if (radius) {
					canvasFun.drawRoundRect(ctx, x, y, width, height, radius);
					// 画布裁切
					ctx.clip();
				}

				ctx.drawImage(
					image.src,
					x,
					y,
					width,
					image.height * (width / image.width)
				);
				resolve(12);
			};
		});
	},
	/**
	 * @description: 底部内容变成弧形
	 * @param ctx ctx：
	 * @param x x：x轴坐标
	 * @param y y：y轴坐标
	 * @param width width：矩阵的宽度
	 * @param height height：矩阵的高度
	 * @param radian radius：弧度
	 * @param color color：颜色
	 * @return {*}
	 */
	bottomBoxToArc(
		ctx: any,
		x: number,
		y: number,
		width: number,
		height: number,
		radian: number,
		color: string
	) {
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x, y + height);
		ctx.lineTo(x + width, y + height);
		ctx.lineTo(x + width, y);
		ctx.quadraticCurveTo(x + width / 2, radian + y, x, y);
		ctx.stroke();
		ctx.fillStyle = color;
		ctx.fill();
	},
	/**
	 *  @description 文本竖向排列
	 *  @param ctx ctx实例
	 *  @param text 内容
	 *  @param x 横坐标
	 *  @param y 纵坐标
	 *  @param fillStyle 字体颜色
	 *  @param font 字体大小、字体样式、粗细 例：45px myFont
	 */
	drawTextVertical(
		ctx: any,
		text: string,
		x: number,
		y: number,
		fillStyle: string,
		font: string
	) {
		let letterSpacing = 2; // 设置字间距

		ctx.fillStyle = fillStyle;
		ctx.font = font;
		for (let i = 0; i < text.length; i++) {
			const str = text.slice(i, i + 1).toString();

			if (str.match(/[A-Za-z0-9]/) && y < 576) {
				// 非汉字 旋转

				ctx.save();

				ctx.translate(x, y);

				ctx.rotate((Math.PI / 180) * 90);

				ctx.textBaseline = "bottom";

				ctx.fillText(str, 0, 0);

				ctx.restore();

				y += ctx.measureText(str).width + letterSpacing; // 计算文字宽度
			} else if (str.match(/[\u4E00-\u9FA5]/) && y < 576) {
				ctx.save();

				ctx.textBaseline = "top";

				ctx.fillText(str, x, y);

				ctx.restore();

				y += ctx.measureText(str).width + letterSpacing; // 计算文字宽度
			}
		}
	},
	drawLine(
		ctx: any,
		startX: number,
		startY: number,
		endX: number,
		endY: number,
		lineWidth: number = 1,
		color: string = "#FFFFFF"
	) {
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke();
	},
};
